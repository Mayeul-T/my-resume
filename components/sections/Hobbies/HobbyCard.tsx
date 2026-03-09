"use client";

import { motion } from "framer-motion";
import { Hobbies as HobbiesData } from "@/lib/schemas/resume";
import { Music, Mic, Clock } from "lucide-react";
import { blurIn } from "@/lib/motion";

const hobbyIcons: Record<string, React.ReactNode> = {
  "hobby-1": <Music className="h-5 w-5" />,
  "hobby-2": <Mic className="h-5 w-5" />,
};

interface HobbyCardProps {
  hobby: HobbiesData["items"][0];
  index: number;
}

export function HobbyCard({ hobby, index }: HobbyCardProps) {
  return (
    <motion.div variants={blurIn}>
      <div className="group relative h-full overflow-hidden rounded-2xl glass-frost glass-hover p-6">
        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition-all duration-300 group-hover:from-primary/25 group-hover:to-accent/25 group-hover:shadow-lg group-hover:shadow-primary/10">
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

          {hobby.organizations && hobby.organizations.length > 0 && (
            <ul className="space-y-1.5">
              {hobby.organizations.map((org, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  {org}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
