"use client";

import { motion } from "framer-motion";

export function BackgroundDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Large primary orb — top left */}
      <motion.div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/15 blur-[120px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Accent orb — top right */}
      <motion.div
        className="absolute -right-20 top-[15%] h-[500px] w-[500px] rounded-full bg-accent/12 blur-[120px]"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Primary orb — center left */}
      <motion.div
        className="absolute -left-20 top-[45%] h-[450px] w-[450px] rounded-full bg-primary/10 blur-[100px]"
        animate={{
          x: [0, 50, -10, 0],
          y: [0, -20, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Accent orb — bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 h-[550px] w-[550px] rounded-full bg-accent/12 blur-[120px]"
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Small bright accent — mid page */}
      <motion.div
        className="absolute left-[60%] top-[60%] h-[300px] w-[300px] rounded-full bg-primary/8 blur-[80px]"
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 20, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
