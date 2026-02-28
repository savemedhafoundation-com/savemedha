/**
 * Compress & convert large PNG/JPG files in /public to WebP.
 *
 * Usage:
 *   npm install --save-dev sharp
 *   node scripts/compress-public-images.js
 *
 * Output: each image gets a matching .webp file alongside it.
 * Then update any <img src="/FILENAME.png"> to <img src="/FILENAME.webp">
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

async function processImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!SUPPORTED.has(ext)) return;

  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const inStat = await stat(filePath);
  const inKB = (inStat.size / 1024).toFixed(0);

  try {
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outPath);

    const outStat = await stat(outPath);
    const outKB = (outStat.size / 1024).toFixed(0);
    const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(0);
    console.log(
      `✓ ${basename(filePath).padEnd(40)} ${inKB.padStart(7)} KB → ${outKB.padStart(6)} KB  (${saving}% smaller)`
    );
  } catch (err) {
    console.error(`✗ ${basename(filePath)}: ${err.message}`);
  }
}

async function run() {
  const files = await readdir(PUBLIC_DIR);
  console.log(`\nCompressing ${files.length} files in /public...\n`);
  await Promise.all(files.map((f) => processImage(join(PUBLIC_DIR, f))));
  console.log("\nDone! Replace .png/.jpg references with .webp in your components.");
}

run();
