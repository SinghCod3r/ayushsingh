"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function DeveloperAvatar3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 560;

    // 1. Scene, Camera, Transparent Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // completely transparent background
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // zero background color
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Interactive OrbitControls (360-degree rotation on drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep framing tight and clean
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.62;
    controls.target.set(0, 0, 0);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Cyan Rim Light (Signature Tech Cyber Glow)
    const cyanRim = new THREE.DirectionalLight(0x00f5d4, 2.2);
    cyanRim.position.set(-4, 2, -3);
    scene.add(cyanRim);

    // Violet Accent Rim
    const violetRim = new THREE.DirectionalLight(0xa855f7, 1.6);
    violetRim.position.set(4, 1.5, -2.5);
    scene.add(violetRim);

    // 4. Character Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Mouse coordinates tracking for subtle head/body tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 5. Load 3D GLB Character Model
    const loader = new GLTFLoader();
    let loadedScene: THREE.Group | null = null;

    loader.load(
      "/3d/avatar.glb",
      (gltf) => {
        loadedScene = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(loadedScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        loadedScene.position.x = -center.x;
        loadedScene.position.y = -center.y + 0.05;
        loadedScene.position.z = -center.z;

        // Scale to frame upper body / waist-up elegantly
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.45 / maxDim;
        loadedScene.scale.setScalar(scale);

        // Enhance materials
        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.35, mat.roughness || 0.5);
              mat.metalness = Math.min(0.25, mat.metalness || 0.1);
            }
          }
        });

        modelGroup.add(loadedScene);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading 3D avatar:", err);
      }
    );

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Subtle idle breathing float
      modelGroup.position.y = Math.sin(elapsedTime * 2.0) * 0.035;

      // Subtle tracking towards mouse cursor coordinates
      if (loadedScene) {
        loadedScene.rotation.y += (mouse.x * 0.25 - loadedScene.rotation.y) * 0.04;
        loadedScene.rotation.x += (-mouse.y * 0.12 - loadedScene.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 450;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px] flex items-center justify-center select-none">
      {/* 100% Transparent 3D Canvas (Zero background, zero boxes, zero buttons) */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="3D Developer Avatar - Drag to rotate 360°"
      />
    </div>
  );
}
