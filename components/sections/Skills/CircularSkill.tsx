"use client";

import { Skills as SkillsData } from "@/lib/schemas/resume";

interface CircularSkillProps {
  skill: SkillsData["categories"][0]["skills"][0];
  isVisible: boolean;
  delay: number;
}

export function CircularSkill({ skill, isVisible, delay }: CircularSkillProps) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const level = skill.level || 0;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div
      className="group flex flex-col items-center gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="-rotate-90 transform"
        >
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
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            className="transition-all duration-1000 ease-out"
            style={{ transitionDelay: `${delay}ms` }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-bold text-foreground transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${delay + 300}ms`
            }}
          >
            {level}
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {skill.name}
      </span>
    </div>
  );
}
