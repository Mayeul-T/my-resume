import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { IconButton } from "@/components/ui";
import { Hero as HeroData } from "@/lib/schemas/resume";
import { Download, Mail, ChevronDown } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

interface HeroProps {
  data: HeroData;
}

export async function Hero({ data }: HeroProps) {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden px-6 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-4xl text-center">
          {/* Profile Image */}
          {data.profileImage && (
            <div className="animate-hero-1 mx-auto mb-8">
              <Image
                src={data.profileImage}
                alt={data.name}
                width={160}
                height={160}
                className="mx-auto rounded-full object-cover border-4 border-primary/20 shadow-xl"
                priority
              />
            </div>
          )}

          {/* Name */}
          <h1 className="animate-hero-2 mb-2 text-4xl font-bold tracking-tight text-foreground md:mb-4 md:text-5xl">
            {data.name}
          </h1>

          {/* Title */}
          <h2 className="animate-hero-3 mb-3 text-2xl font-semibold text-muted-foreground md:mb-6 md:text-3xl">
            {data.title}
          </h2>

          {/* Description */}
          <p className="animate-hero-4 mx-auto mb-6 max-w-2xl text-lg text-muted md:mb-10">
            {data.description}
          </p>

          {/* CTA Button */}
          <div className="animate-hero-5">
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-all duration-normal hover:bg-secondary hover:scale-105"
            >
              {t("downloadCv")}
              <Download className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>

          {/* Social Links */}
          <div className="animate-hero-6 mt-12 flex items-center justify-center gap-4">
            {data.socials.github && (
              <IconButton
                href={data.socials.github}
                icon={<GithubIcon className="h-5 w-5" />}
                label="GitHub"
              />
            )}
            {data.socials.linkedin && (
              <IconButton
                href={data.socials.linkedin}
                icon={<LinkedinIcon className="h-5 w-5" />}
                label="LinkedIn"
              />
            )}
            {data.socials.twitter && (
              <IconButton
                href={data.socials.twitter}
                icon={<XIcon className="h-5 w-5" />}
                label="X"
              />
            )}
            {data.socials.email && (
              <IconButton
                href={`mailto:${data.socials.email}`}
                icon={<Mail className="h-5 w-5" strokeWidth={2} />}
                label="Email"
                external={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="animate-hero-fade flex justify-center mb-12 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll down"
      >
        <ChevronDown
          className="h-10 w-10 animate-[bounce-subtle_3s_ease-in-out_infinite] md:h-12 md:w-12"
          strokeWidth={1}
        />
      </a>
    </section>
  );
}
