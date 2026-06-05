"use client";

import { useState, useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  autostart?: boolean;
  triggerOnHover?: boolean;
}

const GLITCH_CHARS = "X_/*?!01@#%&+-[~]\\$<>{}";

export default function TextScramble({
  text,
  className = "",
  autostart = false,
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = useRef(text);
  
  useEffect(() => {
    originalText.current = text;
    setDisplayText(text);
  }, [text]);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iteration = 0;
    const target = originalText.current;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return target[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2; // Transition step size (adjust for resolution speed)
    }, 20); // 50fps smooth frame interval
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText.current);
  };

  useEffect(() => {
    if (autostart) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autostart]);

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      onMouseLeave={triggerOnHover ? stopScramble : undefined}
    >
      {displayText}
    </span>
  );
}
