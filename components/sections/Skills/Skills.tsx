"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Skills as SkillsData } from "@/lib/schemas/resume";
import { SkillCategory } from "./SkillCategory";

interface SkillsProps {
  data: SkillsData;
}

export function Skills({ data }: SkillsProps) {
  const t = useTranslations("skills");

  return (
    <Section id="skills" title={t("title")} className="bg-card">
      <div className="space-y-16">
        {data.categories.map((category, categoryIndex) => (
          <SkillCategory
            key={category.name}
            category={category}
            index={categoryIndex}
          />
        ))}
      </div>
    </Section>
  );
}
