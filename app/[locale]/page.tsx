import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { parseLocale } from "@/lib/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";
import { getResumeData } from "@/lib/data/resume";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = parseLocale(localeParam);

  if (!locale) {
    notFound();
  }

  setRequestLocale(locale);

  const resume = await getResumeData(locale);

  return (
    <>
      <Hero data={resume.hero} />
      <About data={resume.about} />
      <Experience data={resume.experience} />
      <Skills data={resume.skills} />
      <Education data={resume.education} />
      <Projects data={resume.projects} />
      {resume.hobbies && <Hobbies data={resume.hobbies} />}
      <Contact />
    </>
  );
}
