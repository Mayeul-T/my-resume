"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IconButton, GithubIcon, LinkedinIcon, XIcon } from "@/components/ui";
import { Hero as HeroData } from "@/lib/schemas/resume";
import { Download, Mail, ChevronDown } from "lucide-react";
import { stagger, fadeUp, spring } from "@/lib/motion";

interface HeroClientProps {
  data: HeroData;
  downloadCvLabel: string;
}

// Split text into individual characters for staggered animation
function AnimatedText({ text, className }: { text: string; className?: string }) {
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
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden px-6 pt-16">
      {/* Hero-specific background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      {/* Main content with scroll fade-out */}
      <motion.div
        className="flex flex-1 items-center justify-center"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
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
                hidden: { opacity: 0, scale: 0.5, filter: "blur(20px)" },
                visible: {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
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
                  className="relative z-10 mx-auto rounded-full object-cover border-2 border-white/30 shadow-2xl"
                  priority
                />
                {/* Glow ring behind avatar */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl scale-110" />
              </div>
            </motion.div>
          )}

          {/* Name — character-by-character reveal */}
          <motion.h1
            className="mb-2 text-4xl font-bold tracking-tight md:mb-4 md:text-6xl"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
            }}
          >
            <AnimatedText text={data.name} className="text-gradient" />
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="mb-3 text-2xl font-semibold text-muted-foreground md:mb-6 md:text-3xl"
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {data.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mx-auto mb-6 max-w-2xl text-lg text-muted md:mb-10"
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
              <motion.a
                href={data.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass glass-hover px-7 py-3.5 font-semibold text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {downloadCvLabel}
                <Download className="h-4 w-4" strokeWidth={2} />
              </motion.a>
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
            }}
          >
            {data.socials.github && (
              <motion.div variants={fadeUp}>
                <IconButton href={data.socials.github} icon={<GithubIcon className="h-5 w-5" />} label="GitHub" />
              </motion.div>
            )}
            {data.socials.linkedin && (
              <motion.div variants={fadeUp}>
                <IconButton href={data.socials.linkedin} icon={<LinkedinIcon className="h-5 w-5" />} label="LinkedIn" />
              </motion.div>
            )}
            {data.socials.twitter && (
              <motion.div variants={fadeUp}>
                <IconButton href={data.socials.twitter} icon={<XIcon className="h-5 w-5" />} label="X" />
              </motion.div>
            )}
            {data.socials.email && (
              <motion.div variants={fadeUp}>
                <IconButton href={`mailto:${data.socials.email}`} icon={<Mail className="h-5 w-5" strokeWidth={2} />} label="Email" external={false} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="flex justify-center mb-12 text-muted-foreground transition-colors hover:text-foreground"
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
