"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCcw, Sparkles, Move3d } from "lucide-react";

export function DeveloperBoy3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const resetCameraRef = useRef<() => void>(() => {});
  const triggerSpinRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // OrbitControls for 360-degree interactive rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep framing tight
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.minPolarAngle = Math.PI * 0.25; // prevent going below ground
    controls.maxPolarAngle = Math.PI * 0.65;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => {
      setTimeout(() => setIsInteracting(false), 2000);
    });

    resetCameraRef.current = () => {
      camera.position.set(0, 1.2, 8.2);
      controls.target.set(0, 0.2, 0);
      controls.update();
    };

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    // Cyan glowing laptop / face light
    const laptopLight = new THREE.PointLight(0x00f5d4, 3.5, 6);
    laptopLight.position.set(0, 0.5, 1.2);
    scene.add(laptopLight);

    // Violet rim light from behind
    const rimLight = new THREE.PointLight(0xa855f7, 2.5, 8);
    rimLight.position.set(-3.5, 2.5, -3);
    scene.add(rimLight);

    // --- CHARACTER ROOT GROUP ---
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d0b5,
      roughness: 0.6,
      metalness: 0.05,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f141f,
      roughness: 0.8,
      metalness: 0.2,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.7,
      metalness: 0.15,
    });

    const hoodieAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.35,
      roughness: 0.3,
    });

    const headphonePlastic = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.5,
    });

    const neonCyanEmissive = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 1.0,
      roughness: 0.2,
    });

    const laptopMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e2433,
      metalness: 0.8,
      roughness: 0.3,
    });

    // 1. HEAD GROUP
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.45, 0);

    // Head base
    const headGeo = new THREE.SphereGeometry(1.05, 32, 32);
    headGeo.scale(1, 1.08, 1);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(headMesh);

    // Stylized Hair
    const hairCapGeo = new THREE.SphereGeometry(1.12, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMaterial);
    hairCap.position.set(0, 0.1, 0.05);
    headGroup.add(hairCap);

    // Front swept hair fringe locks
    const fringeGeo = new THREE.ConeGeometry(0.35, 0.85, 5);
    const fringe1 = new THREE.Mesh(fringeGeo, hairMaterial);
    fringe1.rotation.set(-0.6, 0.3, -0.4);
    fringe1.position.set(-0.4, 0.75, 0.8);
    headGroup.add(fringe1);

    const fringe2 = new THREE.Mesh(fringeGeo, hairMaterial);
    fringe2.rotation.set(-0.55, -0.2, 0.3);
    fringe2.position.set(0.35, 0.8, 0.82);
    headGroup.add(fringe2);

    const fringe3 = new THREE.Mesh(fringeGeo, hairMaterial);
    fringe3.rotation.set(-0.65, 0.05, 0.05);
    fringe3.position.set(0.0, 0.85, 0.88);
    headGroup.add(fringe3);

    // Cyber Visor / Glasses
    const visorGeo = new THREE.CylinderGeometry(1.08, 1.08, 0.26, 32, 1, false, Math.PI * 0.2, Math.PI * 0.6);
    const visor = new THREE.Mesh(visorGeo, neonCyanEmissive);
    visor.rotation.y = Math.PI * 0.2;
    visor.position.set(0, 0.05, 0.02);
    headGroup.add(visor);

    // Cyber Headphones
    const headbandGeo = new THREE.TorusGeometry(1.22, 0.08, 16, 32, Math.PI);
    const headband = new THREE.Mesh(headbandGeo, headphonePlastic);
    headband.rotation.x = Math.PI / 2;
    headband.position.set(0, 0.15, 0);
    headGroup.add(headband);

    // Left Ear Cup
    const earcupGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 32);
    const leftEarcup = new THREE.Mesh(earcupGeo, headphonePlastic);
    leftEarcup.rotation.z = Math.PI / 2;
    leftEarcup.position.set(-1.18, 0.15, 0);
    headGroup.add(leftEarcup);

    const leftRing = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.035, 16, 32), neonCyanEmissive);
    leftRing.rotation.y = Math.PI / 2;
    leftRing.position.set(-1.32, 0.15, 0);
    headGroup.add(leftRing);

    // Right Ear Cup
    const rightEarcup = new THREE.Mesh(earcupGeo, headphonePlastic);
    rightEarcup.rotation.z = Math.PI / 2;
    rightEarcup.position.set(1.18, 0.15, 0);
    headGroup.add(rightEarcup);

    const rightRing = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.035, 16, 32), neonCyanEmissive);
    rightRing.rotation.y = Math.PI / 2;
    rightRing.position.set(1.32, 0.15, 0);
    headGroup.add(rightRing);

    characterGroup.add(headGroup);

    // 2. TORSO & HOODIE
    const torsoGroup = new THREE.Group();

    // Hoodie Body
    const torsoGeo = new THREE.CylinderGeometry(1.15, 1.45, 2.2, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, hoodieMaterial);
    torsoMesh.position.set(0, -0.05, 0);
    torsoGroup.add(torsoMesh);

    // Hoodie Collar / Cowl
    const cowlGeo = new THREE.TorusGeometry(0.95, 0.28, 16, 32);
    const cowlMesh = new THREE.Mesh(cowlGeo, hoodieMaterial);
    cowlMesh.rotation.x = Math.PI / 2;
    cowlMesh.position.set(0, 0.95, 0);
    torsoGroup.add(cowlMesh);

    // Hoodie Accent Zipper / Piping
    const zipperGeo = new THREE.BoxGeometry(0.08, 1.8, 0.1);
    const zipper = new THREE.Mesh(zipperGeo, hoodieAccentMaterial);
    zipper.position.set(0, -0.1, 1.16);
    torsoGroup.add(zipper);

    // Left Arm (bent toward keyboard)
    const armGeo = new THREE.CylinderGeometry(0.32, 0.28, 1.6, 16);
    const leftArm = new THREE.Mesh(armGeo, hoodieMaterial);
    leftArm.position.set(-1.35, 0.25, 0.4);
    leftArm.rotation.set(0.65, 0.2, 0.45);
    torsoGroup.add(leftArm);

    // Right Arm (bent toward keyboard)
    const rightArm = new THREE.Mesh(armGeo, hoodieMaterial);
    rightArm.position.set(1.35, 0.25, 0.4);
    rightArm.rotation.set(0.65, -0.2, -0.45);
    torsoGroup.add(rightArm);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.85, -0.45, 1.15);
    torsoGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.85, -0.45, 1.15);
    torsoGroup.add(rightHand);

    characterGroup.add(torsoGroup);

    // 3. FUTURISTIC LAPTOP & WORKSPACE
    const workspaceGroup = new THREE.Group();
    workspaceGroup.position.set(0, -0.5, 1.35);

    // Laptop Base
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 1.55), laptopMaterial);
    workspaceGroup.add(laptopBase);

    // Glowing Keyboard
    const keyboardMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.02, 0.9), neonCyanEmissive);
    keyboardMesh.position.set(0, 0.045, -0.15);
    workspaceGroup.add(keyboardMesh);

    // Laptop Screen Lid (tilted back)
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.04, -0.75);
    screenGroup.rotation.x = -Math.PI * 0.38;

    const screenBack = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.45, 0.06), laptopMaterial);
    screenGroup.add(screenBack);

    // Emissive Code Display
    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(2.15, 1.3),
      new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.9,
      })
    );
    screenDisplay.position.set(0, 0, 0.035);
    screenGroup.add(screenDisplay);

    workspaceGroup.add(screenGroup);
    characterGroup.add(workspaceGroup);

    // 4. FLOATING HOLOGRAPHIC CODE PARTICLES
    const particleCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.2;
      particlePositions[i * 3 + 1] = Math.random() * 2.2 - 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5 + 1.2;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f5d4,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const floatingParticles = new THREE.Points(particleGeo, particleMat);
    characterGroup.add(floatingParticles);

    // 5. CYBERNETIC GROUND PEDESTAL & ROTATING ORBIT RING
    const pedestalGeo = new THREE.CylinderGeometry(2.4, 2.7, 0.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0b0f19,
      metalness: 0.8,
      roughness: 0.3,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, -1.3, 0.3);
    characterGroup.add(pedestal);

    // Glowing Pedestal Ring
    const pedestalRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.03, 16, 64),
      neonCyanEmissive
    );
    pedestalRing.rotation.x = Math.PI / 2;
    pedestalRing.position.set(0, -1.2, 0.3);
    characterGroup.add(pedestalRing);

    // Orbit wireframe ring
    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, wireframe: true })
    );
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.position.set(0, -0.6, 0.2);
    characterGroup.add(orbitRing);

    // Floating Holographic Tech Cubes
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.18),
      neonCyanEmissive
    );
    cube1.position.set(-1.25, 0.75, 1.1);
    characterGroup.add(cube1);

    const cube2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.0,
      roughness: 0.2,
    });
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 0.15),
      cube2Mat
    );
    cube2.position.set(1.25, 0.85, 1.0);
    characterGroup.add(cube2);

    // --- MOUSE TRACKING & INTERACTIVE KINEMATICS ---
    let mouse = { x: 0, y: 0 };
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;
    let spinVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetHeadRotY = mouse.x * 0.45;
      targetHeadRotX = -mouse.y * 0.3;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Trigger 360 Spin on Click
    triggerSpinRef.current = () => {
      spinVelocity = 0.35;
      setClickCount((c) => c + 1);
    };

    const handleCanvasClick = () => {
      triggerSpinRef.current();
    };

    container.addEventListener("click", handleCanvasClick);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Controls damping
      controls.update();

      // Idle vertical floating bobbing
      characterGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.12;

      // Orbit ring rotation
      orbitRing.rotation.z += 0.006;
      orbitRing.rotation.y += 0.004;

      // Floating holographic cubes rotation & bobbing
      cube1.rotation.x += 0.02;
      cube1.rotation.y += 0.03;
      cube1.position.y = 0.75 + Math.sin(elapsedTime * 2.6) * 0.12;

      cube2.rotation.x -= 0.025;
      cube2.rotation.y += 0.02;
      cube2.position.y = 0.85 + Math.cos(elapsedTime * 2.8) * 0.14;

      // Dynamic hand typing motion on keyboard
      leftHand.position.y = -0.45 + Math.sin(elapsedTime * 9.5) * 0.028;
      rightHand.position.y = -0.45 + Math.cos(elapsedTime * 9.0) * 0.028;

      // Head smoothly turns towards cursor
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Handle click spin burst
      if (spinVelocity > 0.005) {
        characterGroup.rotation.y += spinVelocity;
        spinVelocity *= 0.94; // friction decay
      }

      // Animate floating code particles
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += 0.012;
        if (pos[i * 3 + 1] > 2.2) {
          pos[i * 3 + 1] = -0.2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Pulse headphone & screen glow
      const pulse = Math.sin(elapsedTime * 3) * 0.3 + 1.0;
      leftRing.scale.setScalar(pulse * 0.05 + 0.95);
      rightRing.scale.setScalar(pulse * 0.05 + 0.95);
      laptopLight.intensity = 3.0 + Math.sin(elapsedTime * 6) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleCanvasClick);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[500px] flex items-center justify-center select-none group">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Click & Drag to rotate 3D character 360°"
      />

      {/* Cybernetic Aura Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.14)_0%,transparent_70%)] pointer-events-none blur-3xl rounded-full"
      />

      {/* Bottom Interactive HUD Overlay */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-auto z-20 font-mono text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-neutral-300">
          <Move3d className="w-3.5 h-3.5 text-[#00f5d4] animate-pulse" />
          <span>Drag to Rotate 360°</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSpinRef.current()}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-[#00f5d4]/20 border border-white/10 hover:border-[#00f5d4]/40 text-neutral-300 hover:text-white transition cursor-pointer"
            title="Trigger character 360 spin"
          >
            <Sparkles className="w-3 h-3 text-[#00f5d4]" />
            <span className="hidden sm:inline">Spin</span>
          </button>

          <button
            onClick={() => resetCameraRef.current()}
            type="button"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition cursor-pointer"
            title="Reset 3D view orientation"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
