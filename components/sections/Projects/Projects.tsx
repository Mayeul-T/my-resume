"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { Projects as ProjectsData } from "@/lib/schemas/resume";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  data: ProjectsData;
}

export function Projects({ data }: ProjectsProps) {
  const t = useTranslations("projects");

  return (
    <Section id="projects" title={t("title")} className="bg-card">
      <div className="grid gap-8 lg:grid-cols-2">
        {data.items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
