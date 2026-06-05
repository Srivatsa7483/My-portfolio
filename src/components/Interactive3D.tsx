"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Interactive3DProps {
  progress?: number;
  isLoaded?: boolean;
}

// Helper to create a glowing circular star texture on a 2D canvas context
const createGlowingParticleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.65, "rgba(255, 255, 255, 0.25)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default function Interactive3D({ progress = 1, isLoaded = true }: Interactive3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animStateRef = useRef({ progress: 0, isLoaded: false });

  // Update refs on prop changes to read them inside requestAnimationFrame
  useEffect(() => {
    animStateRef.current.progress = progress;
    animStateRef.current.isLoaded = isLoaded;
  }, [progress, isLoaded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();

    // Position camera overlooking the digital terrain landscape
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 13, 30);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Objects: Morphing Wave Terrain Particle System (120 x 120 = 14,400 points)
    const cols = 120;
    const rows = 120;
    const particleCount = cols * rows;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Coordinate arrays to interpolate from unformed nebula cloud to structured landscape grid
    const chaosCoords = new Float32Array(particleCount * 3);
    const gridCoords = new Float32Array(particleCount * 3);

    // Gradient colors
    const colorCore = new THREE.Color("#E63946");   // ruby red
    const colorMiddle = new THREE.Color("#A855F7"); // purple
    const colorOuter = new THREE.Color("#FFFFFF");  // white

    const spacing = 0.75;
    const startX = -((cols - 1) * spacing) / 2;
    const startZ = -((rows - 1) * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const i3 = i * 3;

        // Shape A: 3D Vortex / Wormhole coordinates (expanding double-helix tunnel)
        const tVortex = i / particleCount; // normalized ratio (0 to 1)
        const rVortex = 1.5 + tVortex * 30.0; // expand outwards
        const thetaVortex = tVortex * Math.PI * 36.0 + (i % 2 === 0 ? 0 : Math.PI); // double spiral arms
        const zVortex = -45.0 + tVortex * 90.0; // stretch along Z depth
        
        // Random dispersion around vortex path
        const randSpread = 1.8;
        chaosCoords[i3] = rVortex * Math.cos(thetaVortex) + (Math.random() - 0.5) * randSpread;
        chaosCoords[i3 + 1] = rVortex * Math.sin(thetaVortex) + (Math.random() - 0.5) * randSpread;
        chaosCoords[i3 + 2] = zVortex + (Math.random() - 0.5) * randSpread;

        // Shape B: Structured Landscape Grid coordinate plane
        const x = startX + c * spacing;
        const z = startZ + r * spacing;
        
        gridCoords[i3] = x;
        gridCoords[i3 + 1] = 0; // base flat plane, waves applied dynamically in loop
        gridCoords[i3 + 2] = z;

        // Initial default colors
        colors[i3] = colorMiddle.r;
        colors[i3 + 1] = colorMiddle.g;
        colors[i3 + 2] = colorMiddle.b;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createGlowingParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // 3. Mouse Interaction Variables
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 4. GSAP ScrollTrigger: Fly camera low over the terrain as user scrolls down
    gsap.registerPlugin(ScrollTrigger);

    const cameraFlight = gsap.to(camera.position, {
      z: 14,
      y: 6,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    const cameraAngle = gsap.to(camera.rotation, {
      x: -Math.PI * 0.04,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // 5. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const currentProgress = animStateRef.current.progress;
      const loaded = animStateRef.current.isLoaded;

      // Interpolation ratio (0 to 1) with ease-in-out curve
      const lerpRatio = currentProgress / 100;
      const easeRatio = Math.sin((lerpRatio * Math.PI) / 2);

      // Lerp mouse coordinates
      mouse.targetX += (mouse.x - mouse.targetX) * 0.05;
      mouse.targetY += (mouse.y - mouse.targetY) * 0.05;

      // Base rotation: slow orbital spin during load, very gentle when loaded
      const rotSpeed = loaded ? 0.02 : 0.2;
      particles.rotation.y = time * rotSpeed + mouse.targetX * 0.05;

      const positionAttr = geometry.getAttribute("position");
      const positionsArr = positionAttr.array as Float32Array;

      const colorAttr = geometry.getAttribute("color");
      const colorsArr = colorAttr.array as Float32Array;

      // Map mouse coordinates to 3D grid space dimensions
      const gravityWorldX = mouse.targetX * 35;
      const gravityWorldZ = -mouse.targetY * 35; // y-mouse deforms depth coordinate

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base coordinates lerped between chaotic swarm and terrain grid
        const chaosX = chaosCoords[i3];
        const chaosY = chaosCoords[i3 + 1];
        const chaosZ = chaosCoords[i3 + 2];

        const gridX = gridCoords[i3];
        const gridY = gridCoords[i3 + 1];
        const gridZ = gridCoords[i3 + 2];

        let x = THREE.MathUtils.lerp(chaosX, gridX, easeRatio);
        let z = THREE.MathUtils.lerp(chaosZ, gridZ, easeRatio);
        let baseYVal = THREE.MathUtils.lerp(chaosY, gridY, easeRatio);

        let y = baseYVal;

        // Apply dynamic sine wave terrain undulation once morphing is complete
        if (loaded) {
          // Complex sine wave height equation
          const wave1 = Math.sin(gridX * 0.12 - time * 1.5) * 1.8;
          const wave2 = Math.cos(gridZ * 0.15 - time * 1.2) * 1.4;
          const distFromCenter = Math.sqrt(gridX * gridX + gridZ * gridZ);
          const wave3 = Math.sin(distFromCenter * 0.08 - time * 2.0) * 1.2;

          y += wave1 + wave2 + wave3;

          // Localized mouse cursor hover warp (generates ripple deforms)
          const dx = gravityWorldX - gridX;
          const dz = gravityWorldZ - gridZ;
          const distMouse = Math.hypot(dx, dz);
          
          if (distMouse < 14) {
            const pull = (14 - distMouse) / 14;
            // Ripple offset
            y += Math.sin(time * 5.0 - distMouse * 0.4) * pull * 3.5;
          }
        } else {
          // Vortex rotation and warp during loading sequence
          const spinAngle = time * 0.9 + easeRatio * 1.5;
          const origX = x;
          const origY = y;
          x = origX * Math.cos(spinAngle) - origY * Math.sin(spinAngle);
          y = origX * Math.sin(spinAngle) + origY * Math.cos(spinAngle);
          
          // Stream forward along Z axis
          z += (time * 12.0) % 90.0;
          if (z > 45.0) z -= 90.0; // loop back to tunnel depth
          
          // Ripple pulse based on distance from center
          const dist = Math.sqrt(x * x + y * y);
          const pulse = 1.0 + Math.sin(time * 5.0 - dist * 0.15) * 0.06;
          x *= pulse;
          y *= pulse;
        }

        positionsArr[i3] = x;
        positionsArr[i3 + 1] = y;
        positionsArr[i3 + 2] = z;

        // Dynamic Color Shifting based on height or vortex depth
        const refHeight = loaded ? y : Math.sqrt(x * x + y * y);
        const normVal = loaded ? (refHeight + 4.5) / 9.0 : (refHeight / 26.0);
        const clampVal = Math.max(0, Math.min(1, normVal));
        
        const mixedColor = new THREE.Color();
        if (clampVal < 0.45) {
          // Inner core or valleys: purple/indigo to ruby red
          mixedColor.copy(colorMiddle).lerp(colorCore, clampVal / 0.45);
        } else {
          // Outer spiral or peaks: ruby red to glowing white
          mixedColor.copy(colorCore).lerp(colorOuter, (clampVal - 0.45) / 0.55);
        }
        
        colorsArr[i3] = mixedColor.r;
        colorsArr[i3 + 1] = mixedColor.g;
        colorsArr[i3 + 2] = mixedColor.b;
      }

      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      
      // Look at the landscape horizon center
      camera.lookAt(0, -3.5, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    animate();

    // Cleanup WebGL buffers & animations on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (cameraFlight.scrollTrigger) cameraFlight.scrollTrigger.kill();
      if (cameraAngle.scrollTrigger) cameraAngle.scrollTrigger.kill();
      cameraFlight.kill();
      cameraAngle.kill();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      pMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
