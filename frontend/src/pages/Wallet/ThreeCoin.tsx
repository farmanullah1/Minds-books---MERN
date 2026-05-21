import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCoin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights - Rich gold color highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directLight1 = new THREE.DirectionalLight(0xffdf7a, 1.5);
    directLight1.position.set(5, 5, 4);
    scene.add(directLight1);

    const directLight2 = new THREE.DirectionalLight(0xffb928, 1.0);
    directLight2.position.set(-5, -5, 2);
    scene.add(directLight2);

    const goldSpot = new THREE.SpotLight(0xf7b928, 8, 10, Math.PI / 4, 0.4, 1.2);
    goldSpot.position.set(0, 4, 3);
    scene.add(goldSpot);

    // 3. Create the Gold Coin Mesh Group
    const coinGroup = new THREE.Group();

    // 3a. Coin Base Geometry - Flat cylinder
    const coinGeometry = new THREE.CylinderGeometry(1.6, 1.6, 0.16, 64);
    // Rotate so face points towards camera
    coinGeometry.rotateX(Math.PI / 2);

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7b928,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });

    const coinBase = new THREE.Mesh(coinGeometry, goldMaterial);
    coinGroup.add(coinBase);

    // Helper to create beveled torus borders on both faces
    const borderGeometry = new THREE.TorusGeometry(1.5, 0.07, 16, 100);
    const frontBorder = new THREE.Mesh(borderGeometry, goldMaterial);
    frontBorder.position.z = 0.09;
    const backBorder = new THREE.Mesh(borderGeometry, goldMaterial);
    backBorder.position.z = -0.09;
    coinGroup.add(frontBorder);
    coinGroup.add(backBorder);

    // Helper to create beveled logo "M"
    const createLogoM = (isFront: boolean) => {
      const zPos = isFront ? 0.095 : -0.095;
      const mGroup = new THREE.Group();

      const stemMat = goldMaterial;

      // Left stem
      const leftGeom = new THREE.BoxGeometry(0.14, 1.0, 0.04);
      const leftStem = new THREE.Mesh(leftGeom, stemMat);
      leftStem.position.set(-0.45, 0, zPos);
      mGroup.add(leftStem);

      // Right stem
      const rightGeom = new THREE.BoxGeometry(0.14, 1.0, 0.04);
      const rightStem = new THREE.Mesh(rightGeom, stemMat);
      rightStem.position.set(0.45, 0, zPos);
      mGroup.add(rightStem);

      // Left diagonal
      const diagLeftGeom = new THREE.BoxGeometry(0.13, 0.65, 0.04);
      const diagLeft = new THREE.Mesh(diagLeftGeom, stemMat);
      diagLeft.position.set(-0.20, 0.12, zPos);
      diagLeft.rotation.z = -Math.PI / 6;
      mGroup.add(diagLeft);

      // Right diagonal
      const diagRightGeom = new THREE.BoxGeometry(0.13, 0.65, 0.04);
      const diagRight = new THREE.Mesh(diagRightGeom, stemMat);
      diagRight.position.set(0.20, 0.12, zPos);
      diagRight.rotation.z = Math.PI / 6;
      mGroup.add(diagRight);

      return mGroup;
    };

    const frontM = createLogoM(true);
    const backM = createLogoM(false);
    coinGroup.add(frontM);
    coinGroup.add(backM);

    // Add coin group to scene
    scene.add(coinGroup);

    // 4. Stardust floating particle ring around coin
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomRadii = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.4;
      const radius = 2.2 + Math.random() * 0.7; // Circle around the coin
      randomRadii[i] = radius;
      speeds[i] = 0.2 + Math.random() * 0.3;

      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = Math.sin(angle) * radius;
      positions[idx + 2] = (Math.random() - 0.5) * 0.8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture canvas
    const canvasParticle = document.createElement('canvas');
    canvasParticle.width = 16;
    canvasParticle.height = 16;
    const ctx = canvasParticle.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 223, 122, 1)');
      grad.addColorStop(0.5, 'rgba(247, 185, 40, 0.6)');
      grad.addColorStop(1, 'rgba(247, 185, 40, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvasParticle);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse Hover & Drag Panning Physics
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      targetX = ((x / rect.width) - 0.5) * 2.0;
      targetY = -((y / rect.height) - 0.5) * 2.0;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      // 6a. Spin coin continuously + react to mouse position
      coinGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
      coinGroup.rotation.y = elapsedTime * 0.8 + mouseX * 1.5;
      coinGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15 + mouseY * 0.8;
      coinGroup.rotation.z = Math.cos(elapsedTime * 0.7) * 0.08;

      // 6b. Animate floating gold particles in circular orbital rings
      const particlePos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Calculate current angle based on elapsed time and random speeds
        const initialAngle = (i / particleCount) * Math.PI * 2;
        const currentAngle = initialAngle + elapsedTime * speeds[i] * 0.3;
        const radius = randomRadii[i];

        particlePos[idx] = Math.cos(currentAngle) * radius;
        particlePos[idx + 1] = Math.sin(currentAngle) * radius;
        // Subtle ripple depth oscillation
        particlePos[idx + 2] += Math.sin(elapsedTime * 0.8 + initialAngle) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resizer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Unmount Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose webgl resources
      coinGeometry.dispose();
      goldMaterial.dispose();
      borderGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-coin-canvas" style={{ width: '100%', height: '100%' }} />;
};

export default ThreeCoin;
