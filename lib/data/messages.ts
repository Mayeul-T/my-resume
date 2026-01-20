import path from "path";
import { routing, Locale } from "@/lib/i18n/routing";
import { MessagesSchema, Messages } from "@/lib/schemas/messages";
import { parseYamlFile } from "@/lib/utils/yaml";

export async function getMessages(locale: Locale): Promise<Messages> {
  if (!routing.locales.includes(locale)) {
    throw new Error(`Invalid locale: "${locale}". Valid locales are: ${routing.locales.join(", ")}`);
  }

  const filePath = path.join(process.cwd(), "messages", `${locale}.yml`);
  return parseYamlFile(filePath, MessagesSchema);
}
