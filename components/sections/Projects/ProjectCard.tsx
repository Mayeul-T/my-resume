"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Projects as ProjectsData } from "@/lib/schemas/resume";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: ProjectsData["items"][0];
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const t = useTranslations("projects");

  return (
    <div
      ref={ref}
      className={`animate-on-scroll scale ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
        {/* Image at top with gradient fading to content */}
        <div className="relative overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10" />
          )}

          {/* Gradient from bottom (white/background) to transparent */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content below image */}
        <div className="p-6 md:p-8 pt-2 md:pt-4">
          <h3 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mb-4 max-w-xl text-base text-muted-foreground">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="outline">+{project.technologies.length - 5}</Badge>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                <ExternalLink className="h-4 w-4" />
                {t("viewProject")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-background"
              >
                <Github className="h-4 w-4" />
                {t("viewCode")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
