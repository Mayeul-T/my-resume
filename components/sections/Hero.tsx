import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { IconButton, GithubIcon, LinkedinIcon, XIcon } from "@/components/ui";
import { Hero as HeroData } from "@/lib/schemas/resume";
import { Download, Mail, ChevronDown } from "lucide-react";

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
