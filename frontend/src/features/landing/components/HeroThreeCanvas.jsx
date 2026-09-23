import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context';

export default function HeroThreeCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Three.js Scene: Silky Smooth Undulating Market Wave
    const scene = new THREE.Scene();
    
    // Theme-adaptive background: Deep midnight cosmic slate in dark mode, warm off-white in light mode
    const bgColor = isDark ? 0x090d16 : 0xfaf9f6;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 18, 48);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 6, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Theme-tuned Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x1e293b : 0xffffff,
      isDark ? 1.0 : 1.2
    );
    scene.add(ambientLight);

    const softBlueLight = new THREE.DirectionalLight(0x3b82f6, isDark ? 1.4 : 1.0);
    softBlueLight.position.set(10, 20, 10);
    scene.add(softBlueLight);

    // Smooth Undulating Financial Wave Surface
    const planeWidth = 72;
    const planeHeight = 44;
    const segmentsX = 46;
    const segmentsY = 30;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsX, segmentsY);

    const waveMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x3b82f6 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.32 : 0.16,
      roughness: 0.4,
    });

    const waveMesh = new THREE.Mesh(geometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 2.3;
    waveMesh.position.set(0, -5.5, -2);
    scene.add(waveMesh);

    // Gentle floating nodes on top of the wave
    const pointsMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x60a5fa : 0x0284c7,
      size: isDark ? 0.26 : 0.22,
      transparent: true,
      opacity: isDark ? 0.65 : 0.4,
    });
    const wavePoints = new THREE.Points(geometry, pointsMaterial);
    wavePoints.rotation.x = -Math.PI / 2.3;
    wavePoints.position.set(0, -5.5, -2);
    scene.add(wavePoints);

    // Subtle mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop: Organic sine-wave undulation
    let animationFrameId;
    const clock = new THREE.Clock();
    const pos = geometry.attributes.position;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime() * 0.75;

      // Damped camera motion
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;
      camera.position.x = targetX * 6;
      camera.position.y = 6 - targetY * 4;
      camera.lookAt(0, -1, 0);

      // Silky wave displacement
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const wave = Math.sin(x * 0.16 + t) * Math.cos(y * 0.18 + t * 0.8) * 1.5;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      waveMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'opacity 0.25s ease',
      }}
    />
  );
}
