"use client";

import { useLocale } from "next-intl";
import { Badge } from "@/components/ui";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Experience as ExperienceData } from "@/lib/schemas/resume";
import { Check } from "lucide-react";

interface TimelineItemProps {
  item: ExperienceData["items"][0];
  index: number;
  present: string;
}

export function TimelineItem({ item, index, present }: TimelineItemProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const locale = useLocale();
  const isEven = index % 2 === 0;

  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    return month
      ? new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
          locale,
          { month: "short", year: "numeric" }
        )
      : year;
  };

  return (
    <div
      ref={ref}
      className={`relative grid gap-8 md:grid-cols-2 ${
        isEven ? "" : "md:direction-rtl"
      }`}
    >
      {/* Content */}
      <div
        className={`md:direction-ltr ${isEven ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
      >
        <div
          className={`animate-on-scroll ${isEven ? "from-left" : "from-right"} ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <div className="rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:border-primary/50 hover:shadow-xl">
            {/* Header */}
            <div className={`mb-4 ${isEven ? "md:text-right" : ""}`}>
              <h3 className="text-xl font-bold text-foreground">
                {item.position}
              </h3>
              <p className="font-medium text-primary">{item.company}</p>
              <p className="text-sm text-muted-foreground">
                {item.location} &bull; {formatDate(item.startDate)} -{" "}
                {item.endDate ? formatDate(item.endDate) : present}
              </p>
            </div>

            {/* Description */}
            <p className={`mb-4 text-muted-foreground ${isEven ? "md:text-right" : ""}`}>
              {item.description}
            </p>

            {/* Achievements */}
            <ul className={`mb-4 space-y-2 ${isEven ? "md:text-right" : ""}`}>
              {item.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 text-sm text-muted-foreground ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
              {item.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="absolute left-0 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-primary bg-background md:left-1/2 md:block" />
    </div>
  );
}
