"use client";

import { motion } from "framer-motion";
import { Skills as SkillsData } from "@/lib/schemas/resume";
import { CircularSkill } from "./CircularSkill";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface SkillCategoryProps {
  category: SkillsData["categories"][0];
  index: number;
}

export function SkillCategory({ category, index }: SkillCategoryProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <h3 className="mb-8 text-center text-xl font-bold text-foreground">
        {category.name}
      </h3>

      <motion.div
        className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-6 lg:gap-8"
        variants={stagger(0.08, index * 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {category.skills.map((skill) => (
          <CircularSkill
            key={skill.name}
            skill={skill}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
