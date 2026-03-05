"use client";

import { motion } from "framer-motion";
import { Skills as SkillsData } from "@/lib/schemas/resume";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface CircularSkillProps {
  skill: SkillsData["categories"][0]["skills"][0];
}

export function CircularSkill({ skill }: CircularSkillProps) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const level = skill.level || 0;

  return (
    <motion.div
      className="group flex flex-col items-center gap-3"
      variants={fadeUp}
    >
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90 transform">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference - (level / 100) * circumference,
            }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Animated counter in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedCounter
            target={level}
            className="text-2xl font-bold text-foreground"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {skill.name}
      </span>
    </motion.div>
  );
}
