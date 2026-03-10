"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui";
import { Hero as HeroData } from "@/lib/schemas/resume";
import { Download, Mail, ChevronDown } from "lucide-react";
import { stagger, fadeUp } from "@/lib/motion";
import { LinkButton } from "@/components/ui/Button/LinkButton";

interface HeroClientProps {
  data: HeroData;
  downloadCvLabel: string;
}

// Split text into individual characters for staggered animation
function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      variants={stagger(0.03)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: 40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: "spring", stiffness: 150, damping: 20 },
            },
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function HeroClient({ data, downloadCvLabel }: HeroClientProps) {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-16">
      {/* Hero-specific background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/20 absolute top-[15%] left-[10%] h-125 w-125 rounded-full blur-[8.75em]" />
        <div className="bg-accent/20 absolute right-[10%] bottom-[20%] h-100 w-100 rounded-full blur-[7.5em]" />
      </div>

      {/* Main content with scroll fade-out */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={stagger(0.15)}
          initial="hidden"
          animate="visible"
          style={{ perspective: 800 }}
        >
          {/* Profile Image — spring scale with glow */}
          {data.profileImage && (
            <motion.div
              className="mx-auto mb-8"
              variants={{
                hidden: { opacity: 0, scale: 0.5, filter: "blur(1.25em)" },
                visible: {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0em)",
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                },
              }}
            >
              <div className="relative mx-auto w-fit">
                <Image
                  src={data.profileImage}
                  alt={data.name}
                  width={160}
                  height={160}
                  className="relative z-10 mx-auto rounded-full border-2 border-white/30 object-cover shadow-2xl"
                  priority
                />
                {/* Glow ring behind avatar */}
                <div className="from-primary/40 to-accent/40 absolute inset-0 scale-110 rounded-full bg-gradient-to-br blur-xl" />
              </div>
            </motion.div>
          )}

          {/* Name — character-by-character reveal */}
          <motion.h1
            className="mb-2 text-4xl font-bold tracking-tight md:mb-4 md:text-6xl"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.03, delayChildren: 0.1 },
              },
            }}
          >
            <AnimatedText text={data.name} className="text-gradient" />
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-muted-foreground mb-3 text-2xl font-semibold md:mb-6 md:text-3xl"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(0.625em)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0em)",
                transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {data.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted mx-auto mb-6 max-w-2xl text-lg md:mb-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            {data.description}
          </motion.p>

          {/* CTA Button — glass with gradient border on hover */}
          {data.cvUrl && (
            <motion.div variants={fadeUp}>
              <LinkButton
                href={data.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {downloadCvLabel}
                <Download className="h-4 w-4" strokeWidth={2} />
              </LinkButton>
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
            }}
          >
            {data.socials.github && (
              <motion.div variants={fadeUp}>
                <LinkButton
                  href={data.socials.github}
                  shape="square"
                  size="small"
                >
                  <GithubIcon className="h-5 w-5" />
                </LinkButton>
              </motion.div>
            )}
            {data.socials.linkedin && (
              <motion.div variants={fadeUp}>
                <LinkButton
                  href={data.socials.linkedin}
                  shape="square"
                  size="small"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </LinkButton>
              </motion.div>
            )}
            {data.socials.twitter && (
              <motion.div variants={fadeUp}>
                <LinkButton
                  href={data.socials.twitter}
                  shape="square"
                  size="small"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </LinkButton>
              </motion.div>
            )}
            {data.socials.email && (
              <motion.div variants={fadeUp}>
                <LinkButton
                  href={data.socials.email}
                  shape="square"
                  size="small"
                >
                  <Mail className="h-5 w-5" />
                </LinkButton>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="text-muted-foreground hover:text-foreground mb-12 flex justify-center transition-colors"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1} />
        </motion.div>
      </motion.a>
    </section>
  );
}
