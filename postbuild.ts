import { copyFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { existsSync } from "node:fs";

const distDir = join(process.cwd(), "dist");
const src = join(distDir, "sitemap-index.xml");
const dest = join(distDir, "sitemap.xml");

async function main() {
  if (!existsSync(src)) {
    console.warn("⚠️ sitemap-index.xml not found. Skipping copy.");
  } else {
    try {
      await copyFile(src, dest, constants.COPYFILE_FICLONE);
      console.log(
        "✅ Copied sitemap-index.xml to sitemap.xml for compatibility.",
      );
    } catch (e) {
      console.error("❌ Failed to copy sitemap:", e);
      process.exit(1);
    }
  }

  // Handle favicon.ico
  const iconSrc = join(distDir, "icon.ico");
  const iconDest = join(distDir, "favicon.ico");
  if (existsSync(iconSrc)) {
    try {
      await copyFile(iconSrc, iconDest, constants.COPYFILE_FICLONE);
      console.log("✅ Copied icon.ico to favicon.ico for browser defaults.");
    } catch (e) {
      console.error("❌ Failed to copy favicon:", e);
    }
  }
}

main();
