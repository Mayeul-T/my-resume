"use client";

import { motion } from "framer-motion";
import { blurIn, stagger, viewportOnce } from "@/lib/motion";

interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, title, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-20 px-6 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {title && (
          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-14"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>
        )}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
