"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Skills as SkillsData } from "@/lib/schemas/resume";
import { CircularSkill } from "./CircularSkill";

interface SkillCategoryProps {
  category: SkillsData["categories"][0];
  index: number;
}

export function SkillCategory({ category, index }: SkillCategoryProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="mb-8 text-center text-xl font-bold text-foreground">
        {category.name}
      </h3>

      <div className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-6 lg:gap-8">
        {category.skills.map((skill, skillIndex) => (
          <CircularSkill
            key={skill.name}
            skill={skill}
            isVisible={isVisible}
            delay={(index * 100) + (skillIndex * 80)}
          />
        ))}
      </div>
    </div>
  );
}
