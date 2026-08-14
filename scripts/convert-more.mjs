import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "gallery", "More");

const files = fs
  .readdirSync(dir)
  .filter((f) => f.toLowerCase().endsWith(".heic"));

if (files.length === 0) {
  console.log("No .heic files found in", dir);
  process.exit(0);
}

console.log(`Found ${files.length} HEIC file(s) in More/`);

for (const file of files) {
  const src = path.join(dir, file);
  const base = file.replace(/\.heic$/i, "");
  const dest = path.join(dir, `${base}.jpg`);

  const input = fs.readFileSync(src);
  console.log(`Converting ${file} ...`);

  const jpgBuffer = await heicConvert({
    buffer: input,
    format: "JPEG",
    quality: 0.9,
  });

  const resized = await sharp(jpgBuffer)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true, fit: "inside" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(dest, resized);
  console.log(`  -> ${base}.jpg (${(resized.length / 1024).toFixed(0)} KB)`);

  fs.unlinkSync(src);
  console.log(`  deleted original ${file}`);
}

console.log("Done.");
