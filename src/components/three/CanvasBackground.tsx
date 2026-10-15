"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Test WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion ? 25 : isMobile ? 40 : 70;
    const maxDistance = isMobile ? 60 : 75;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 220;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Geometry & Positions for Network Nodes
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    const spreadX = isMobile ? 220 : 340;
    const spreadY = isMobile ? 240 : 320;
    const spreadZ = 160;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * spreadX;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      const speedFactor = prefersReducedMotion ? 0.04 : 0.22;
      particleVelocities.push({
        x: (Math.random() - 0.5) * speedFactor,
        y: (Math.random() - 0.5) * speedFactor,
        z: (Math.random() - 0.5) * speedFactor,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Dynamic particle point texture / shader
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f5d4,
      size: isMobile ? 2.8 : 3.5,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Connecting Network Lines
    const maxLineSegments = particleCount * 6;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Subtle 3D Ambient Ring / Orbital Wireframe
    const ringGeometry = new THREE.TorusGeometry(120, 0.4, 8, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const orbitalRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitalRing.rotation.x = Math.PI / 3;
    orbitalRing.position.z = -30;
    scene.add(orbitalRing);

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let scrollY = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = mouseX * 24;
      targetCameraY = mouseY * 20;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Soft camera damping towards cursor
      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;

      // Scroll-driven camera depth and rotation
      const scrollProgress = scrollY * 0.04;
      camera.position.z = 220 + Math.sin(scrollY * 0.001) * 20;
      orbitalRing.rotation.z += 0.0015;
      orbitalRing.rotation.y = scrollY * 0.0006;

      const positions = particleGeometry.attributes.position
        .array as Float32Array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i].x;
        positions[i3 + 1] += particleVelocities[i].y;
        positions[i3 + 2] += particleVelocities[i].z;

        // Bounce bounds
        if (Math.abs(positions[i3]) > spreadX / 2)
          particleVelocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > spreadY / 2)
          particleVelocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > spreadZ / 2)
          particleVelocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Dynamic Network Lines between nearby particles (optimized squared distance check)
      let lineVertexIndex = 0;
      let colorVertexIndex = 0;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const piX = positions[i3];
        const piY = positions[i3 + 1];
        const piZ = positions[i3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = piX - positions[j3];
          const dy = piY - positions[j3 + 1];
          const dz = piZ - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistanceSq && lineVertexIndex < maxLineSegments * 6 - 6) {
            const dist = Math.sqrt(distSq);
            // Point A
            linePositions[lineVertexIndex++] = piX;
            linePositions[lineVertexIndex++] = piY;
            linePositions[lineVertexIndex++] = piZ;

            // Point B
            linePositions[lineVertexIndex++] = positions[j3];
            linePositions[lineVertexIndex++] = positions[j3 + 1];
            linePositions[lineVertexIndex++] = positions[j3 + 2];

            const alpha = 1.0 - dist / maxDistance;
            // Cyan-tinted lines
            lineColors[colorVertexIndex++] = 0.0;
            lineColors[colorVertexIndex++] = 0.96 * alpha;
            lineColors[colorVertexIndex++] = 0.83 * alpha;

            lineColors[colorVertexIndex++] = 0.22 * alpha;
            lineColors[colorVertexIndex++] = 0.74 * alpha;
            lineColors[colorVertexIndex++] = 0.97 * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      camera.lookAt(0, -scrollY * 0.015, 0);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle ambient lighting vignette overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#08090c]/40 to-[#08090c]/90 pointer-events-none" />
      {!webGLSupported && (
        <div className="absolute inset-0 bg-[radial-gradient(#00f5d4_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      )}
    </div>
  );
}

