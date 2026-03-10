"use client";

import { motion } from "framer-motion";
import { Education as EducationData } from "@/lib/schemas/resume";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { blurIn, scalePop, viewportOnce } from "@/lib/motion";

interface EducationCardProps {
  item: EducationData["items"][0];
  index: number;
}

export function EducationCard({ item, index }: EducationCardProps) {
  return (
    <motion.div
      variants={blurIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="relative flex gap-8">
        {/* Timeline icon */}
        <div className="relative z-10 hidden md:block">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25"
            variants={scalePop}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Content card — clean glass, no border-top */}
        <div className="group flex-1 rounded-2xl glass-blur glass-hover p-6 md:p-8">
          {/* Mobile icon */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20 md:hidden">
            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2} />
          </div>

          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground md:text-2xl">
              {item.degree}
            </h3>
            <p className="mt-1 text-lg font-semibold text-gradient">
              {item.field}
            </p>
          </div>

          {/* Institution */}
          <p className="mb-4 text-base font-medium text-foreground/80">
            {item.institution}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{item.startDate ? `${item.startDate} - ${item.endDate || "Present"}` : item.endDate}</span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
