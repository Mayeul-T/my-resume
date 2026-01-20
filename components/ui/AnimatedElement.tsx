"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
  delay?: number;
  as?: React.ElementType;
}

export function AnimatedElement({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  as: Component = "div",
}: AnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const animationClass = {
    "fade-up": "",
    "fade-left": "from-left",
    "fade-right": "from-right",
    scale: "scale",
  }[animation];

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`animate-on-scroll ${animationClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Component>
  );
}
