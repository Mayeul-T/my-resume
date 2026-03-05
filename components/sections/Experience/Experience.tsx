"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Experience as ExperienceData } from "@/lib/schemas/resume";
import { TimelineItem } from "./TimelineItem";
import { viewportOnce } from "@/lib/motion";

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  const t = useTranslations("experience");

  return (
    <Section id="experience" title={t("title")}>
      <div className="relative">
        {/* Self-drawing timeline line */}
        <motion.div
          className="absolute left-0 top-0 hidden w-px origin-top md:left-1/2 md:block md:-translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, var(--primary), var(--accent))" }}
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={viewportOnce}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

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
