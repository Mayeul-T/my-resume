"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { AnimatedElement } from "@/components/ui/AnimatedElement";
import { About as AboutData } from "@/lib/schemas/resume";
import { Check } from "lucide-react";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const t = useTranslations("about");

  return (
    <Section id="about" title={t("title")} className="bg-card">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Description */}
        <AnimatedElement animation="fade-left">
          <div className="space-y-4">
            {data.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedElement>

        {/* Highlights */}
        <AnimatedElement animation="fade-right" delay={200}>
          <div className="space-y-4">
            {data.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border border-border bg-background p-4 transition-all duration-normal hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-5 w-5" strokeWidth={2} />
                </div>
                <p className="text-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </Section>
  );
}
