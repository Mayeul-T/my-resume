"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Education as EducationData } from "@/lib/schemas/resume";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

interface EducationCardProps {
  item: EducationData["items"][0];
  index: number;
}

export function EducationCard({ item, index }: EducationCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll from-left ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative flex gap-8">
        {/* Timeline dot */}
        <div className="relative z-10 hidden md:block">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-background bg-gradient-to-br from-primary to-accent shadow-lg transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"}`}
            style={{ transitionDelay: `${index * 150 + 200}ms` }}
          >
            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Content card */}
        <div className="group flex-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
          {/* Gradient accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="p-6 md:p-8">
            {/* Mobile icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent md:hidden">
              <GraduationCap className="h-6 w-6 text-white" strokeWidth={2} />
            </div>

            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                {item.degree}
              </h3>
              <p className="mt-1 text-lg font-semibold text-primary">
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
      </div>
    </div>
  );
}
