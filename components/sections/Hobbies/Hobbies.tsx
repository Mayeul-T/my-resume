"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Hobbies as HobbiesData } from "@/lib/schemas/resume";
import { HobbyCard } from "./HobbyCard";

interface HobbiesProps {
  data: HobbiesData;
}

export function Hobbies({ data }: HobbiesProps) {
  const t = useTranslations("hobbies");

  return (
    <Section id="hobbies" title={t("title")} className="bg-card">
      <div className="grid gap-6 sm:grid-cols-2">
        {data.items.map((hobby, index) => (
          <HobbyCard key={hobby.id} hobby={hobby} index={index} />
        ))}
      </div>
    </Section>
  );
}
