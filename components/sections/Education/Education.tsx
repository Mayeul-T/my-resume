"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Education as EducationData } from "@/lib/schemas/resume";
import { EducationCard } from "./EducationCard";

interface EducationProps {
  data: EducationData;
}

export function Education({ data }: EducationProps) {
  const t = useTranslations("education");

  return (
    <Section id="education" title={t("title")}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:block" />

        <div className="space-y-12">
          {data.items.map((item, index) => (
            <EducationCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
