"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing, Locale } from "@/lib/i18n/routing";
import { useState } from "react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [activeLocale, setActiveLocale] = useState<Locale>(locale as Locale);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === activeLocale) return;
    setActiveLocale(newLocale);
  };

  const onSlideComplete = () => {
    if (activeLocale !== locale) {
      router.replace(pathname, { locale: activeLocale });
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-lg glass-blur p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`relative cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium uppercase transition-colors duration-300 ${
            activeLocale === loc
              ? "text-primary-foreground"
              : "text-muted-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:text-foreground"
          }`}
          aria-label={t("switch")}
          aria-current={activeLocale === loc ? "true" : undefined}
        >
          {activeLocale === loc && (
            <motion.span
              layoutId="locale-indicator"
              className="absolute inset-0 rounded-md bg-primary shadow-sm"
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              onLayoutAnimationComplete={onSlideComplete}
            />
          )}
          <span className="relative z-10">{loc}</span>
        </button>
      ))}
    </div>
  );
}
