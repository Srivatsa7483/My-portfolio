"use client";

import { useState, useEffect, useCallback } from "react";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import Interactive3D from "./Interactive3D";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progressPercent = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setScrollProgress(Math.round(progressPercent));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Full-Page WebGL 3D Canvas Background (High visibility during loading and loaded states) */}
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isLoaded ? 0.68 : 0.85 }}
      >
        <Interactive3D progress={progress} isLoaded={isLoaded} />
      </div>

      {/* Dynamic Glowing Ambient Auroras / Cosmic Nebulas (Layered at base z-[-2]) */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden select-none">
        {/* Neon Ruby Red Aurora */}
        <div 
          className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full filter blur-[100px] md:blur-[160px] opacity-[0.24] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, rgba(230,57,70,0.85) 0%, rgba(230,57,70,0.1) 70%, transparent 100%)",
            animationDuration: "24s"
          }}
        />
        {/* Neon Purple/Indigo Aurora */}
        <div 
          className="absolute bottom-[-20%] right-[-15%] w-[75vw] h-[75vw] rounded-full filter blur-[120px] md:blur-[180px] opacity-[0.26] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.75) 0%, rgba(168,85,247,0.08) 75%, transparent 100%)",
            animationDuration: "36s",
            animationDelay: "-8s"
          }}
        />
      </div>

      {!isLoaded && (
        <Preloader 
          progress={progress} 
          setProgress={setProgress} 
          onComplete={handleComplete} 
        />
      )}
      
      <CustomCursor />
      
      <SmoothScroll>
        <div 
          className={`transition-opacity duration-[1000ms] ease-out ${
            isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {children}
        </div>
      </SmoothScroll>

      {/* Retro/Minimal Scroll Indicators */}
      {isLoaded && (
        <>
          {/* Scroll Percentage Indicator (Bottom Left) */}
          <div className="fixed bottom-6 left-6 z-40 hidden md:block select-none font-mono text-xs tracking-widest text-neutral-500 bg-[#080808]/80 px-2 py-1 border border-neutral-800 rounded">
            ({scrollProgress}%)
          </div>

          {/* Scroll Progress Line (Top Screen edge) */}
          <div className="fixed top-0 left-0 w-full h-[2px] bg-neutral-900 z-50 pointer-events-none">
            <div 
              className="h-full bg-red-500 transition-all duration-75 ease-out" 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </>
      )}
    </>
  );
}
