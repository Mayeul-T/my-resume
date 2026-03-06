import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, parseLocale } from "@/lib/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { getResumeData } from "@/lib/data/resume";
import { BackgroundDecorations } from "@/components/layout/BackgroundDecorations";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface GenerateMetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = parseLocale(localeParam);

  if (!locale) {
    return {};
  }

  const resume = await getResumeData(locale);

  return {
    title: resume.meta.title,
    description: resume.meta.description,
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = parseLocale(localeParam);

  if (!locale) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang />
      <div className="noise relative flex min-h-screen flex-col">
        <BackgroundDecorations />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
