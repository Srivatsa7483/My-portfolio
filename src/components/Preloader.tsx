"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  progress: number;
  setProgress: (val: number) => void;
  onComplete: () => void;
}

const INITIAL_LOGS = [
  '<span class="text-neutral-500">// SYS INIT BOOT SEQUENCE V3.0</span>',
  '<span class="text-neutral-500">// CLONING DIGITAL ENVIRONMENT TREES...</span>',
  '<span class="text-[#E63946]">import</span><span> * </span><span class="text-[#E63946]">as</span><span> THREE </span><span class="text-[#E63946]">from</span><span> </span><span class="text-purple-400">"three"</span><span>;</span>',
  '<span class="text-[#E63946]">import</span><span> gsap </span><span class="text-[#E63946]">from</span><span> </span><span class="text-purple-400">"gsap"</span><span>;</span>',
  '<span class="text-[#E63946]">import</span><span> React, &#123; useEffect &#125; </span><span class="text-[#E63946]">from</span><span> </span><span class="text-purple-400">"react"</span><span>;</span>',
  '<span class="text-neutral-500">// Initializing WebGL Graphics Context</span>',
  '<span class="text-[#A855F7]">const</span><span> scene = </span><span class="text-[#E63946]">new</span><span> THREE.</span><span class="text-blue-400">Scene</span><span>();</span>',
  '<span class="text-[#A855F7]">const</span><span> camera = </span><span class="text-[#E63946]">new</span><span> THREE.</span><span class="text-blue-400">PerspectiveCamera</span><span>(60, w/h, 0.1, 1000);</span>',
  '<span>camera.position.set(0, 0, 32);</span>',
  '<span class="text-neutral-500">// Loading 3D Particle Coordinates...</span>',
  '<span class="text-[#A855F7]">const</span><span> particleCount = 14400;</span>',
  '<span class="text-[#A855F7]">const</span><span> geometry = </span><span class="text-[#E63946]">new</span><span> THREE.</span><span class="text-blue-400">BufferGeometry</span><span>();</span>',
  '<span class="text-[#A855F7]">const</span><span> positions = </span><span class="text-[#E63946]">new</span><span> </span><span class="text-blue-400">Float32Array</span><span>(14400 * 3);</span>',
  '<span class="text-[#E63946]">for</span><span> (</span><span class="text-[#A855F7]">let</span><span> i = 0; i &lt; particleCount; i++) &#123;</span>',
  '<span>  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);</span>',
  '<span>  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);</span>',
  '<span>  positions[i * 3 + 2] = r * Math.cos(phi);</span>',
  '<span>&#125;</span>',
  '<span class="text-neutral-500">// Compiling GLSL Fragment & Vertex Shaders...</span>',
  '<span class="text-blue-400">uniform</span><span> </span><span class="text-[#A855F7]">float</span><span> uTime;</span>',
  '<span class="text-blue-400">varying</span><span> </span><span class="text-[#A855F7]">vec3</span><span> vColor;</span>',
  '<span class="text-[#A855F7]">void</span><span> </span><span class="text-blue-400">main</span><span>() &#123;</span>',
  '<span>  vec3 pos = position;</span>',
  '<span>  pos.x += sin(uTime + pos.z) * 0.1;</span>',
  '<span>  gl_Position = projectionMatrix * vec4(pos, 1.0);</span>',
  '<span>&#125;</span>',
  '<span class="text-neutral-500">// Compiled Shader Program [HMR ACTIVE]</span>',
  '<span class="text-[#A855F7]">const</span><span> lenis = </span><span class="text-[#E63946]">new</span><span> </span><span class="text-blue-400">Lenis</span><span>(&#123; lerp: 0.1 &#125;);</span>',
  '<span>lenis.on(</span><span class="text-purple-400">"scroll"</span><span>, ScrollTrigger.update);</span>',
  '<span class="text-neutral-500">// Binding Bento Card mouse tracking glow</span>',
  '<span>card.style.setProperty(</span><span class="text-purple-400">"--mouse-x"</span><span>, `$&#123;x&#125;px`);</span>',
  '<span>card.style.setProperty(</span><span class="text-purple-400">"--mouse-y"</span><span>, `$&#123;y&#125;px`);</span>',
  '<span class="text-emerald-400">✔ SYSTEM READY: 14,400 WebGL nodes compiled.</span>',
  '<span class="text-purple-400">console</span><span>.log(</span><span class="text-purple-400">"Core Initialized. Welcome."</span><span>);</span>',
  '<span class="text-emerald-400 font-bold">✔ PORTFOLIO LAUNCHED SUCCESSFULLY [200 OK]</span>'
];

const EXTRA_DIAGNOSTICS = [
  "VITE // hmr update: src/app/page.tsx",
  "TS // checking type configurations...",
  "SHADER // re-linking dynamic gl_FragColor buffer",
  "MEM // garbage collection: released 2.4MB",
  "DOM // updating coordinate map boundings",
  "SYS // sync thread interactive state: 200 OK",
  "HMR // active client connection socket: alive",
  "DEV // watch trigger: src/components/Interactive3D.tsx",
  "SYS // parsing portfolioData.projects map structure",
  "TS // verification complete: zero type errors",
  "NPM // package install complete: three @types/three (3.2s)",
  "GIT // fetch branch origin/main: up to date",
  "DB // resolving vector index bindings... success",
  "SSL // socket session initialized on port 443",
  "CPU // rendering call graph optimized: 120 FPS"
];

const CODE_CHUNKS = [
  '<span>  <span class="text-[#E63946]">const</span> [progress, setProgress] = <span class="text-blue-400">useState</span>(<span class="text-amber-400">0</span>);</span>',
  '<span>  <span class="text-neutral-500">// Trigger screen slide-up transition</span></span>',
  '<span>  <span class="text-blue-400">gsap</span>.<span class="text-purple-400">to</span>(<span class="text-purple-400">".preloader-curtain"</span>, &#123; <span class="text-[#A855F7]">yPercent</span>: -<span class="text-amber-400">100</span>, <span class="text-[#A855F7]">duration</span>: <span class="text-amber-400">1.2</span> &#125;);</span>',
  '<span><span class="text-[#E63946]">function</span> <span class="text-blue-400">renderLoop</span>() &#123;</span>',
  '<span>  <span class="text-[#A855F7]">requestAnimationFrame</span>(renderLoop);</span>',
  '<span>  <span class="text-blue-400">renderer</span>.<span class="text-purple-400">render</span>(scene, camera);</span>',
  '<span>&#125;</span>'
];

export default function Preloader({ progress, setProgress, onComplete }: PreloaderProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const consoleContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Linear progression timer
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2400; // 2.4 seconds for cinematic build-up
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(1, elapsed / duration);
      
      const easePct = Math.sin((pct * Math.PI) / 2);
      const val = Math.floor(easePct * 100);
      setProgress(val);

      if (pct < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            onComplete();
          }
        });

        tl.to(".preloader-letter", {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out"
        });

        tl.to(".preloader-content, .preloader-top-meta, .preloader-pct, .preloader-widgets", {
          opacity: 0,
          y: -40,
          duration: 0.5,
          delay: 0.6,
          ease: "power3.in"
        });

        tl.to(".preloader-curtain", {
          yPercent: -100,
          duration: 1.0,
          ease: "power4.inOut"
        });
      }
    };

    requestAnimationFrame(updateCounter);
  }, [setProgress, onComplete]);

  // Handle continuous high-speed terminal stream
  useEffect(() => {
    let lineIdx = 0;
    
    const appendInterval = setInterval(() => {
      let nextLine = "";
      if (lineIdx < INITIAL_LOGS.length) {
        nextLine = INITIAL_LOGS[lineIdx];
        lineIdx++;
      } else {
        // Randomly pick diagnostics or code chunks to output
        if (Math.random() > 0.4) {
          const randLog = EXTRA_DIAGNOSTICS[Math.floor(Math.random() * EXTRA_DIAGNOSTICS.length)];
          nextLine = `<span class="text-neutral-600">// ${randLog}</span>`;
        } else {
          nextLine = CODE_CHUNKS[Math.floor(Math.random() * CODE_CHUNKS.length)];
        }
      }

      setTerminalLines((prev) => {
        const updated = [...prev, nextLine];
        // Limit terminal lines length to prevent React DOM overload
        if (updated.length > 70) {
          return updated.slice(updated.length - 70);
        }
        return updated;
      });
    }, 16); // 16ms tick speed for ultra-fast, fluid terminal scrolling

    return () => clearInterval(appendInterval);
  }, []);

  // Instant scroll-to-bottom implementation
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Cyber Background Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Constellation Network Nodes
    const numNodes = 45;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1,
      });
    }

    // 2. Data packets moving along connection links
    const packets: Array<{
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;
    }> = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Moving Perspective grid
      const vanishingX = width / 2;
      const vanishingY = height * 0.42;
      
      ctx.strokeStyle = "rgba(230, 57, 70, 0.045)"; // Soft ruby red lines
      ctx.lineWidth = 1;

      // Draw grid vertical perspective lines
      const numGridLines = 26;
      for (let j = 0; j <= numGridLines; j++) {
        const ratio = j / numGridLines;
        // Map ratio to angle from Math.PI/6 to 5*Math.PI/6
        const angle = Math.PI / 6 + ratio * (Math.PI * 2 / 3);
        const endX = vanishingX + Math.cos(angle) * width * 1.6;
        const endY = vanishingY + Math.sin(angle) * height * 1.6;

        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw grid horizontal perspective lines moving down
      const timeOffset = (Date.now() * 0.0006) % 1;
      const horizontalGridCount = 9;
      for (let k = 0; k < horizontalGridCount; k++) {
        const progress = (k + timeOffset) / horizontalGridCount;
        const y = vanishingY + Math.pow(progress, 2.5) * (height - vanishingY);
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // B. Rotating HUD Target Circle behind percentages
      const hudX = width > 1024 ? width * 0.75 : width / 2;
      const hudY = height / 2;
      const timeSec = Date.now() * 0.001;

      ctx.lineWidth = 1.2;

      // Inner ring
      ctx.strokeStyle = "rgba(168, 85, 247, 0.07)"; // Purple ring
      ctx.beginPath();
      ctx.arc(hudX, hudY, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Outer dashed rings rotating opposite directions
      ctx.strokeStyle = "rgba(230, 57, 70, 0.06)"; // Red ring
      ctx.save();
      ctx.translate(hudX, hudY);
      ctx.rotate(timeSec * 0.12);
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";
      ctx.save();
      ctx.translate(hudX, hudY);
      ctx.rotate(-timeSec * 0.07);
      ctx.setLineDash([4, 25, 12, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, 310, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // C. Render Node Constellations
      ctx.fillStyle = "rgba(230, 57, 70, 0.35)";
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Boundary collision bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect nodes that are close to each other
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.09;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Spawn data packets occasionally along connection lines
            if (Math.random() < 0.0003 && packets.length < 15) {
              packets.push({
                startX: n1.x,
                startY: n1.y,
                endX: n2.x,
                endY: n2.y,
                progress: 0,
                speed: 0.01 + Math.random() * 0.015,
              });
            }
          }
        }
      }

      // Draw dynamic packets moving along connection links
      ctx.fillStyle = "rgba(230, 57, 70, 0.85)";
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(p, 1);
        } else {
          const x = pkt.startX + (pkt.endX - pkt.startX) * pkt.progress;
          const y = pkt.startY + (pkt.endY - pkt.startY) * pkt.progress;
          ctx.beginPath();
          ctx.arc(x, y, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // D. Faint falling binary code streams (Matrix Rain style) on sides
      ctx.fillStyle = "rgba(168, 85, 247, 0.07)";
      ctx.font = "9px monospace";
      for (let s = 0; s < 12; s++) {
        // Place columns near left and right edges
        const isLeft = s < 6;
        const colX = isLeft 
          ? (s * 32 + 20) 
          : (width - (s - 6) * 32 - 200);
        
        const yOffset = (timeSec * 60 + s * 45) % (height + 100);
        const char1 = Math.random() > 0.5 ? "1" : "0";
        const char2 = Math.random() > 0.5 ? "0" : "1";
        ctx.fillText(char1, colX, yOffset - 20);
        ctx.fillText(char2, colX, yOffset);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="preloader-curtain fixed inset-0 bg-[#040404]/75 backdrop-blur-[16px] z-[9999] flex flex-col justify-between p-6 md:p-12 text-[#F5F5F7] scanline high-tech-grid">
      {/* 2D Cyber-HUD Animated canvas backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Retro CRT Grid Effect Overlay */}
      <div className="crt-grid-overlay" />

      {/* Top logo/bar */}
      <div className="preloader-top-meta flex justify-between items-center text-xs tracking-widest font-semibold uppercase text-neutral-500 z-10 relative">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span>System Boot V3.0</span>
        </div>
        <div className="font-mono text-neutral-600">[ STATUS: COMPILING_CORE ]</div>
      </div>

      {/* Main Grid: Left terminal, Right circular radar */}
      <div className="preloader-widgets grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center my-auto z-10 relative h-[50vh]">
        {/* Left Side: System Diagnostic Terminal */}
        <div className="border border-neutral-900 bg-[#050505]/85 backdrop-blur rounded-xl p-5 h-full flex flex-col font-mono text-[11px] leading-relaxed text-neutral-400 select-none overflow-hidden relative shadow-inner">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 mb-3 text-neutral-500 uppercase tracking-wider text-[10px]">
            <span>Code Compiler Console</span>
            <span className="text-red-500/80 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Running
            </span>
          </div>
          <div 
            ref={consoleContainerRef}
            className="flex-1 overflow-y-auto space-y-2.5 pr-2 scrollbar-none scroll-smooth"
          >
            {terminalLines.map((line, index) => (
              <div 
                key={index}
                className={`${
                  index === terminalLines.length - 1 
                    ? "text-[#F5F5F7] font-semibold" 
                    : "text-neutral-500"
                } transition-all duration-150`}
              >
                <span className="text-neutral-600 mr-2">{">"}</span>
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </div>
            ))}
            {/* Blinking CLI Cursor */}
            <div className="text-red-500 font-semibold animate-pulse">
              <span className="text-neutral-600 mr-2">{">"}</span>_
            </div>
            <div ref={consoleEndRef} />
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] text-neutral-700">
            LOC.COORD_IN_8874
          </div>
        </div>

        {/* Right Side: Concentric Radar & Percentage Loader */}
        <div className="flex flex-col items-center justify-center relative select-none">
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border border-neutral-900/60 flex items-center justify-center shadow-inner">
            {/* Spinning Radar Pointer */}
            <div className="absolute inset-0 rounded-full border border-dashed border-red-500/20 animate-radar-spin pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(230,57,70,1)]" />
            </div>
            {/* Middle decorative rings */}
            <div className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full border border-neutral-900 border-double opacity-80" />
            <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-dashed border-purple-500/15" />
            
            {/* Live Percentage */}
            <div className="preloader-pct text-6xl md:text-[5.5rem] font-bold leading-none tracking-tighter font-mono z-15 text-center flex flex-col items-center">
              <span>{progress}</span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase mt-2 font-sans font-semibold">Percent Loaded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center name reveal (reveals on exit trigger) */}
      <div 
        className="preloader-content absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-bold tracking-tight select-none pointer-events-none z-20 transition-opacity duration-300 ease-in-out"
        style={{ opacity: progress === 100 ? 1 : 0 }}
      >
        <div className="overflow-hidden flex">
          <span className="preloader-letter inline-block text-red-500 mr-2 font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>S</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>R</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>I</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>V</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>A</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>T</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>S</span>
          <span className="preloader-letter inline-block font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>A</span>
          <span className="preloader-letter inline-block text-red-500 font-display-heavy" style={{ opacity: 0, transform: "translateY(100%)" }}>.</span>
        </div>
      </div>

      {/* Bottom section: Widget data + Equalizer Visualizer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 z-10 relative pt-4 border-t border-neutral-900">
        <div className="text-left text-neutral-500 uppercase text-[9px] font-mono leading-relaxed hidden md:block max-w-xs">
          MATRIX_GRID_ENABLED<br />
          SHADERS_MORPH: [ ACTIVE_LERP ]<br />
          GPU_RENDER: WebGL_CORE_RENDERER
        </div>

        {/* Equalizer Frequency bars */}
        <div className="flex items-end justify-center space-x-1.5 h-10 px-6 border border-neutral-900 bg-[#050505]/40 rounded-xl py-2 shadow-inner">
          {Array.from({ length: 24 }).map((_, idx) => {
            const duration = 0.5 + ((idx * 7) % 10) * 0.08;
            const delay = -(((idx * 3) % 10) * 0.1);
            const isPurple = idx % 3 === 0;
            return (
              <div
                key={idx}
                className="w-[2.5px] md:w-[3.5px] rounded-t animate-equalizer-bar"
                style={{
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  backgroundImage: isPurple
                    ? "linear-gradient(to top, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.8))"
                    : "linear-gradient(to top, rgba(230, 57, 70, 0.15), rgba(230, 57, 70, 0.8))",
                }}
              />
            );
          })}
        </div>

        <div className="text-right text-neutral-500 uppercase text-[9px] font-mono leading-relaxed hidden md:block">
          BUILD_V3.0_PROD<br />
          PORTFOLIO_NODE_NODE<br />
          © 2026 SRIVAS
        </div>
      </div>
    </div>
  );
}
