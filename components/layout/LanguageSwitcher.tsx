"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing, Locale } from "@/lib/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-lg glass p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium uppercase transition-all duration-300 ${
            locale === loc
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:text-foreground"
          }`}
          aria-label={t("switch")}
          aria-current={locale === loc ? "true" : undefined}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
