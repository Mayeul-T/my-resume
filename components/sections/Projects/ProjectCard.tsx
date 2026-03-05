"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard";
import { Projects as ProjectsData } from "@/lib/schemas/resume";
import { ExternalLink, Github } from "lucide-react";
import { blurScale, viewportOnce } from "@/lib/motion";

interface ProjectCardProps {
  project: ProjectsData["items"][0];
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <motion.div
      variants={blurScale}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <TiltCard className="group flex h-full flex-col overflow-hidden">
        {/* Image */}
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
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 pt-2 md:pt-4">
          <h3 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            {project.title}
          </h3>
          <p className="mb-4 max-w-xl text-base text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className="h-4 w-4" />
                {t("viewProject")}
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="h-4 w-4" />
                {t("viewCode")}
              </motion.a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
