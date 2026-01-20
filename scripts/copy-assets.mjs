import { cp, mkdir, access } from "fs/promises";
import { join } from "path";

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage";
const PUBLIC_PATH = "./public";

async function copyAssets() {
  const sourceDir = join(process.cwd(), STORAGE_PATH, "assets");
  const destDir = join(process.cwd(), PUBLIC_PATH, "assets");

  try {
    await access(sourceDir);
    await mkdir(destDir, { recursive: true });
    await cp(sourceDir, destDir, { recursive: true });
    console.log("✓ Assets copied from storage/assets to public/assets");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("⚠ No assets directory found in storage, skipping...");
    } else {
      console.error("✗ Error copying assets:", error.message);
      process.exit(1);
    }
  }
}

copyAssets();
