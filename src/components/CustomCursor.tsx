"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    if (!cursorOuter || !cursorInner) return;

    // Set initial position out of screen
    gsap.set(cursorOuter, { x: -100, y: -100, xPercent: -50, yPercent: -50 });
    gsap.set(cursorInner, { x: -100, y: -100, xPercent: -50, yPercent: -50 });

    const xOuterTo = gsap.quickTo(cursorOuter, "x", { duration: 0.4, ease: "power3.out" });
    const yOuterTo = gsap.quickTo(cursorOuter, "y", { duration: 0.4, ease: "power3.out" });

    const xInnerTo = gsap.quickTo(cursorInner, "x", { duration: 0.1, ease: "power3.out" });
    const yInnerTo = gsap.quickTo(cursorInner, "y", { duration: 0.1, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xOuterTo(e.clientX);
      yOuterTo(e.clientY);
      xInnerTo(e.clientX);
      yInnerTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .proj-item, .skills-contact");
      
      if (interactiveEl) {
        if (interactiveEl.classList.contains("proj-item")) {
          setCursorText("VIEW");
          gsap.to(cursorOuter, {
            width: 70,
            height: 70,
            backgroundColor: "rgba(230, 57, 70, 0.15)",
            borderColor: "rgba(230, 57, 70, 0.8)",
            duration: 0.3,
          });
          gsap.to(cursorInner, { scale: 0, duration: 0.3 });
        } else {
          gsap.to(cursorOuter, {
            scale: 1.5,
            borderColor: "rgba(255, 255, 255, 0.8)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            duration: 0.3,
          });
          gsap.to(cursorInner, { scale: 1.5, duration: 0.3 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], .proj-item, .skills-contact");
      
      if (interactiveEl) {
        setCursorText("");
        gsap.to(cursorOuter, {
          width: 32,
          height: 32,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.3,
        });
        gsap.to(cursorInner, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <div
          ref={cursorOuterRef}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-50 flex items-center justify-center text-[10px] tracking-widest text-neutral-100 font-bold overflow-hidden"
          style={{ mixBlendMode: cursorText ? "normal" : "difference" }}
        >
          {cursorText && <span className="animate-fade-in">{cursorText}</span>}
        </div>
        <div
          ref={cursorInnerRef}
          className="fixed top-0 left-0 w-2 h-2 bg-red-500 rounded-full pointer-events-none z-50"
          style={{ mixBlendMode: "difference" }}
        />
      </div>
    </>
  );
}
