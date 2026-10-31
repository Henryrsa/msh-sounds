import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import heicConvert from "heic-convert";
import sharp from "sharp";

// Usage: node scripts/import-photos.mjs <sourceDir> <galleryCategory>
// Converts HEIC -> JPG and resizes every image to 1200px max (quality 82),
// then writes the results into public/gallery/<galleryCategory>/.
// Originals in the source folder are left untouched.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const [sourceArg, categoryArg] = process.argv.slice(2);

if (!sourceArg || !categoryArg) {
  console.error("Usage: node scripts/import-photos.mjs <sourceDir> <galleryCategory>");
  process.exit(1);
}

const SRC = path.isAbsolute(sourceArg) ? sourceArg : path.join(ROOT, sourceArg);
const DEST = path.join(ROOT, "public", "gallery", categoryArg);

if (!fs.existsSync(SRC)) {
  console.error("Source directory not found:", SRC);
  process.exit(1);
}

fs.mkdirSync(DEST, { recursive: true });

const IMAGE_EXT = /\.(heic|jpg|jpeg|png|webp)$/i;
const files = fs.readdirSync(SRC).filter((f) => IMAGE_EXT.test(f));

if (files.length === 0) {
  console.log("No images found in", SRC);
  process.exit(0);
}

console.log(`Found ${files.length} image(s) in ${path.basename(SRC)}/ -> gallery/${categoryArg}/`);

let done = 0;
let skipped = 0;

for (const file of files) {
  const src = path.join(SRC, file);
  const base = file.replace(/\.[^.]+$/, "");
  const dest = path.join(DEST, `${base}.jpg`);

  if (fs.existsSync(dest)) {
    console.log(`  skipped ${file} (already exists as ${base}.jpg)`);
    skipped++;
    continue;
  }

  try {
    let input = fs.readFileSync(src);

    if (/\.heic$/i.test(file)) {
      input = await heicConvert({ buffer: input, format: "JPEG", quality: 0.9 });
    }

    const out = await sharp(input)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true, fit: "inside" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(dest, out);
    console.log(`  ${file} -> ${base}.jpg (${(out.length / 1024).toFixed(0)} KB)`);
    done++;
  } catch (err) {
    console.error(`  FAILED: ${file} — ${err.message}`);
    skipped++;
  }
}

console.log(`\nDone. Added: ${done}, Skipped: ${skipped}`);
