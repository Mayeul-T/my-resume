import { getRequestConfig } from "next-intl/server";
import { routing, Locale } from "./routing";
import { getMessages } from "@/lib/data/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessages(locale as Locale),
  };
});
