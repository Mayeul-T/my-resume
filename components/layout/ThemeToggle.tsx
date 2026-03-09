"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      shape="square"
      size="small"
      aria-label={isDark ? t("light") : t("dark")}
    >
      <Sun
        className={cn("h-5 w-5 transition-all duration-300", {
          "scale-0 rotate-90": isDark,
          "scale-100 rotate-0": !isDark,
        })}
        strokeWidth={2}
      />
      <Moon
        className={cn("absolute h-5 w-5 transition-all duration-300", {
          "scale-100 rotate-0": isDark,
          "scale-0 -rotate-90": !isDark,
        })}
        strokeWidth={2}
      />
    </Button>
  );
}
