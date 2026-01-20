import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

export function parseLocale(value: string): Locale | null {
  return routing.locales.includes(value as Locale) ? (value as Locale) : null;
}
