import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";
import sharp from "sharp";

const galleryDir = path.resolve("public/gallery");
const categories = fs
  .readdirSync(galleryDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let totalConverted = 0;
let totalResized = 0;
let totalFailed = 0;

for (const category of categories) {
  const catDir = path.join(galleryDir, category);
  const files = fs.readdirSync(catDir);
  console.log(`\n=== ${category} (${files.length} files) ===`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    const filePath = path.join(catDir, file);

    let jpgPath;

    if (ext === ".heic" || ext === ".heif") {
      jpgPath = path.join(catDir, `${base}.jpg`);
      try {
        const inputBuffer = fs.readFileSync(filePath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: "JPEG",
          quality: 0.92,
        });
        fs.writeFileSync(jpgPath, outputBuffer);
        fs.unlinkSync(filePath);
        totalConverted++;
        console.log(`  Converted: ${file}`);
      } catch (err) {
        totalFailed++;
        console.error(`  Failed: ${file} — ${err.message}`);
        continue;
      }
    } else if (ext === ".jpg" || ext === ".jpeg") {
      jpgPath = filePath;
    } else {
      console.log(`  Skipped: ${file}`);
      continue;
    }

    try {
      const meta = await sharp(jpgPath).metadata();
      const maxDim = Math.max(meta.width || 0, meta.height || 0);
      if (maxDim > 1200) {
        const w = (meta.width || 0) >= (meta.height || 0) ? 1200 : undefined;
        const h = (meta.height || 0) > (meta.width || 0) ? 1200 : undefined;
        await sharp(jpgPath)
          .resize(w, h, { fit: "inside" })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(jpgPath + ".tmp");
        fs.renameSync(jpgPath + ".tmp", jpgPath);
        totalResized++;
        console.log(`  Resized: ${path.basename(jpgPath)}`);
      }
    } catch (err) {
      console.error(`  Resize failed: ${path.basename(jpgPath)} — ${err.message}`);
    }
  }
}

console.log(`\nDone. Converted: ${totalConverted}, Resized: ${totalResized}, Failed: ${totalFailed}`);
