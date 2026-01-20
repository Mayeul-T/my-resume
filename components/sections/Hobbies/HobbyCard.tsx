"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Hobbies as HobbiesData } from "@/lib/schemas/resume";
import { Music, Mic, Clock } from "lucide-react";

const hobbyIcons: Record<string, React.ReactNode> = {
  "hobby-1": <Music className="h-5 w-5" />,
  "hobby-2": <Mic className="h-5 w-5" />,
};

interface HobbyCardProps {
  hobby: HobbiesData["items"][0];
  index: number;
}

export function HobbyCard({ hobby, index }: HobbyCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        {/* Subtle gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10">
          {/* Header with icon */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:from-primary/20 group-hover:to-accent/20">
              {hobbyIcons[hobby.id] || <Music className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{hobby.name}</h3>
              {hobby.duration && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{hobby.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Organizations */}
          {hobby.organizations && hobby.organizations.length > 0 && (
            <ul className="space-y-1.5">
              {hobby.organizations.map((org, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground/80"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  {org}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
