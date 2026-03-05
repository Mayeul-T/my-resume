"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  className?: string;
}

export function AnimatedCounter({ target, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
    return unsubscribe;
  }, [springVal]);

  return <motion.span ref={ref} className={className}>0</motion.span>;
}
