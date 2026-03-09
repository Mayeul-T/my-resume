"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard";
import { Projects as ProjectsData } from "@/lib/schemas/resume";
import { ExternalLink, Github } from "lucide-react";
import { blurScale, viewportOnce, spring } from "@/lib/motion";

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
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="from-primary/20 via-accent/20 to-primary/10 aspect-video w-full bg-linear-to-br" />
          )}
          <div className="from-background/60 absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 pt-2 md:p-8 md:pt-4">
          <h3 className="text-foreground mb-2 text-2xl font-bold md:text-3xl">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-xl text-base">
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
                className="from-primary to-accent shadow-primary/20 hover:shadow-primary/30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
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
                className="glass text-foreground inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
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
