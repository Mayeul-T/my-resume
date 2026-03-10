"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { About as AboutData } from "@/lib/schemas/resume";
import { Check } from "lucide-react";
import { blurIn, fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const t = useTranslations("about");

  return (
    <Section id="about" title={t("title")}>
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Description */}
        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="space-y-4">
            {data.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="space-y-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {data.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex items-start gap-4 rounded-xl glass-blur glass-hover p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <p className="text-foreground">{highlight}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
