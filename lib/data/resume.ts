import fs from "fs/promises";
import path from "path";
import { routing, Locale } from "@/lib/i18n/routing";
import { ResumeSchema, Resume } from "@/lib/schemas/resume";
import { parseYamlFile } from "@/lib/utils/yaml";

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage";
const SUPPORTED_EXTENSIONS = [".yml", ".yaml"] as const;

export async function getResumeData(locale: Locale): Promise<Resume> {
  // Validate locale to prevent invalid file reads (e.g., favicon.ico)
  if (!routing.locales.includes(locale)) {
    throw new Error(`Invalid locale: "${locale}". Valid locales are: ${routing.locales.join(", ")}`);
  }

  // Find file with supported extension (priority: .yml > .yaml)
  let filePath: string | null = null;
  const basePath = path.join(process.cwd(), STORAGE_PATH, `resume.${locale}`);

  for (const ext of SUPPORTED_EXTENSIONS) {
    const testPath = `${basePath}${ext}`;
    try {
      await fs.access(testPath);
      filePath = testPath;
      break;
    } catch {
      // File doesn't exist, try next extension
    }
  }

  if (!filePath) {
    throw new Error(
      `No resume file found for locale "${locale}". ` +
      `Looked for: ${SUPPORTED_EXTENSIONS.map(ext => `resume.${locale}${ext}`).join(", ")} in ${STORAGE_PATH}`
    );
  }

  return parseYamlFile(filePath, ResumeSchema);
}
