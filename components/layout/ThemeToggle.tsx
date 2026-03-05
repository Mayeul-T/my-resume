"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg glass text-foreground transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={t("dark")}
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg glass text-foreground transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={resolvedTheme === "light" ? t("dark") : t("light")}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          resolvedTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
        strokeWidth={2}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          resolvedTheme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
