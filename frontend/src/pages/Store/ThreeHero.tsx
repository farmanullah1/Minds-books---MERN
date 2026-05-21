import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, and Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const yellowSpotLight = new THREE.SpotLight(0xf7b928, 5, 12, Math.PI / 4, 0.5, 1);
    yellowSpotLight.position.set(0, 4, 2);
    scene.add(yellowSpotLight);

    // 3. Create the Shopping Bag Group
    const bagGroup = new THREE.Group();

    // 3a. Bag Body - Glassmorphic / Translucent yellow
    const bodyGeometry = new THREE.BoxGeometry(1.8, 2.2, 0.9);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7b928,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
      transmission: 0.7,
      thickness: 0.8,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const bagBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bagGroup.add(bagBody);

    // 3b. Bag Handles - Metallic Gold
    const handleGeometry = new THREE.TorusGeometry(0.35, 0.06, 16, 100, Math.PI);
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.08,
      metalness: 0.9,
    });

    const frontHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    frontHandle.position.set(0, 1.1, 0.25);
    frontHandle.rotation.x = Math.PI / 12;

    const backHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    backHandle.position.set(0, 1.1, -0.25);
    backHandle.rotation.x = -Math.PI / 12;

    bagGroup.add(frontHandle);
    bagGroup.add(backHandle);

    // Add bag to scene
    scene.add(bagGroup);

    // 4. Stardust Floating Particles (Background)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const randomOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Scattered coordinates
      positions[i] = (Math.random() - 0.5) * 8;     // X
      positions[i + 1] = (Math.random() - 0.5) * 6; // Y
      positions[i + 2] = (Math.random() - 0.5) * 4; // Z
      randomOffsets[i / 3] = Math.random() * Math.PI * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture - elegant yellow circular dots
    const canvasParticle = document.createElement('canvas');
    canvasParticle.width = 16;
    canvasParticle.height = 16;
    const ctx = canvasParticle.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(247, 185, 40, 1)');
      grad.addColorStop(1, 'rgba(247, 185, 40, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvasParticle);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Mouse Interaction Variables
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalized coordinates from -1 to 1
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      targetX = ((x / rect.width) - 0.5) * 2.0;
      targetY = -((y / rect.height) - 0.5) * 2.0;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for ultra smooth dragging interaction
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      // 6a. Animate Shopping Bag (Float + Spin + React to Mouse)
      bagGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.18;
      bagGroup.rotation.y = elapsedTime * 0.4 + mouseX * 1.2;
      bagGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.1 + mouseY * 0.8;
      bagGroup.rotation.z = Math.cos(elapsedTime * 0.6) * 0.05;

      // 6b. Animate background particles (Slow upward drift + subtle wave)
      const particlePos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Drift Y upwards
        particlePos[idx + 1] += 0.004;
        // Add slight wave motion based on offsets
        particlePos[idx] += Math.sin(elapsedTime + randomOffsets[i]) * 0.002;

        // Reset if particles go off top bounds
        if (particlePos[idx + 1] > 3) {
          particlePos[idx + 1] = -3;
          particlePos[idx] = (Math.random() - 0.5) * 8;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose materials & geometries
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      handleGeometry.dispose();
      handleMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-bag-canvas" style={{ width: '100%', height: '100%' }} />;
};

export default ThreeHero;
