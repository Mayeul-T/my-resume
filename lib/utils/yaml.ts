import fs from "fs/promises";
import yaml from "js-yaml";
import { z } from "zod";

export class YamlParseError extends Error {
  constructor(filePath: string, cause: unknown) {
    const message = `Failed to parse YAML file "${filePath}":\n  ${cause instanceof Error ? cause.message : String(cause)}`;
    super(message);
    this.name = "YamlParseError";
  }
}

export class YamlValidationError extends Error {
  constructor(filePath: string, errors: z.ZodIssue[]) {
    const formattedErrors = errors
      .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
        return `  - ${path}: ${issue.message}`;
      })
      .join("\n");
    const message = `Invalid data in "${filePath}":\n${formattedErrors}`;
    super(message);
    this.name = "YamlValidationError";
  }
}

export class YamlFileNotFoundError extends Error {
  constructor(filePath: string) {
    super(`File not found: "${filePath}"`);
    this.name = "YamlFileNotFoundError";
  }
}

/**
 * Parse a YAML file and validate it against a Zod schema.
 * Also supports JSON content since JSON is valid YAML.
 *
 * @param filePath - Absolute path to the YAML file
 * @param schema - Zod schema to validate against
 * @returns Parsed and validated data
 * @throws {YamlFileNotFoundError} If the file doesn't exist
 * @throws {YamlParseError} If the file contains invalid YAML syntax
 * @throws {YamlValidationError} If the data doesn't match the schema
 */
export async function parseYamlFile<T extends z.ZodType>(
  filePath: string,
  schema: T
): Promise<z.infer<T>> {
  // Read file
  let fileContent: string;
  try {
    fileContent = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new YamlFileNotFoundError(filePath);
    }
    throw error;
  }

  // Parse YAML
  let data: unknown;
  try {
    data = yaml.load(fileContent);
  } catch (error) {
    throw new YamlParseError(filePath, error);
  }

  // Validate with Zod
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new YamlValidationError(filePath, result.error.issues);
  }

  return result.data;
}
