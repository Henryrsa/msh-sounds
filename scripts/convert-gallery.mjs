import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";

const srcDir = path.resolve("gallery");
const outDir = path.resolve("public/gallery/gallery");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir);
let count = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const outPath = path.join(outDir, `${base}.jpg`);

  if (ext === ".jpg" || ext === ".jpeg") {
    fs.copyFileSync(path.join(srcDir, file), outPath);
    count++;
    console.log(`Copied: ${file}`);
  } else if (ext === ".heic" || ext === ".heif") {
    try {
      const inputBuffer = fs.readFileSync(path.join(srcDir, file));
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 0.92,
      });
      fs.writeFileSync(outPath, outputBuffer);
      count++;
      console.log(`Converted: ${file}`);
    } catch (err) {
      console.error(`Failed: ${file} — ${err.message}`);
    }
  } else {
    console.log(`Skipped (unsupported): ${file}`);
  }
}

console.log(`\nDone. ${count} images in public/gallery/gallery/`);
