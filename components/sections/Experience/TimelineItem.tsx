"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Badge } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard";
import { Experience as ExperienceData } from "@/lib/schemas/resume";
import { Check } from "lucide-react";
import { blurIn, scalePop, viewportOnce } from "@/lib/motion";

interface TimelineItemProps {
  item: ExperienceData["items"][0];
  index: number;
  present: string;
}

export function TimelineItem({ item, index, present }: TimelineItemProps) {
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
      className={`relative grid gap-8 md:grid-cols-2 ${
        isEven ? "" : "md:direction-rtl"
      }`}
    >
      {/* Content */}
      <div
        className={`md:direction-ltr ${isEven ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}
      >
        <motion.div
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TiltCard className="group p-6">
            {/* Header */}
            <div className={`mb-4 ${isEven ? "md:text-right" : ""}`}>
              <h3 className="text-xl font-bold text-foreground">
                {item.position}
              </h3>
              <p className="font-medium text-gradient">{item.company}</p>
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
          </TiltCard>
        </motion.div>
      </div>

      {/* Timeline dot with glow */}
      <motion.div
        className="absolute left-0 top-6 hidden md:left-1/2 md:block"
        style={{ x: "-50%" }}
        variants={scalePop}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="relative">
          <div className="h-4 w-4 rounded-full border-4 border-primary bg-background" />
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-md" />
        </div>
      </motion.div>
    </div>
  );
}
