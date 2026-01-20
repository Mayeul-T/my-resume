"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Experience as ExperienceData } from "@/lib/schemas/resume";
import { TimelineItem } from "./TimelineItem";

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  const t = useTranslations("experience");

  return (
    <Section id="experience" title={t("title")}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-1/2" />

        {/* Timeline items */}
        <div className="space-y-12">
          {data.items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              present={t("present")}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
