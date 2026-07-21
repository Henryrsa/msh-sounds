import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import heicConvert from "heic-convert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "gallery pictures", "Final");
const OUT = path.join(ROOT, "public", "gallery");

const categoryMap = {
  Subwoofers: "subwoofers",
  Speakers: "speakers",
  Amplifers: "amplifiers",
  Toyota: "toyota",
  Vivo: "vivo",
  complete: "complete",
  Uncategorized: "uncategorized",
};

let converted = 0;
let copied = 0;
let skipped = 0;

async function convertHeic(inputPath, outputPath) {
  const inputBuffer = fs.readFileSync(inputPath);
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.85,
  });
  fs.writeFileSync(outputPath, outputBuffer);
}

function getOutputPath(category, filename) {
  const slug = categoryMap[category] || category.toLowerCase();
  const outDir = path.join(OUT, slug);
  fs.mkdirSync(outDir, { recursive: true });

  const baseName = path.parse(filename).name;
  const outName = `${slug}-${String(converted + copied + 1).padStart(3, "0")}.jpg`;
  return path.join(outDir, outName);
}

async function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    const category = path.basename(dirPath);

    if (ext === ".heic") {
      try {
        const outputPath = getOutputPath(category, entry.name);
        await convertHeic(fullPath, outputPath);
        converted++;
        if (converted % 5 === 0) console.log(`  converted ${converted} HEIC files...`);
      } catch (err) {
        console.error(`  FAILED: ${entry.name} — ${err.message}`);
        skipped++;
      }
    } else if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      try {
        const outputPath = getOutputPath(category, entry.name);
        fs.copyFileSync(fullPath, outputPath);
        copied++;
      } catch (err) {
        console.error(`  FAILED to copy: ${entry.name} — ${err.message}`);
        skipped++;
      }
    } else {
      skipped++;
    }
  }
}

async function main() {
  console.log("Converting gallery images...\n");
  console.log(`  Source: ${SRC}`);
  console.log(`  Output: ${OUT}\n`);

  if (!fs.existsSync(SRC)) {
    console.error("Source directory not found!");
    process.exit(1);
  }

  await processDir(SRC);

  console.log(`\nDone!`);
  console.log(`  Converted: ${converted} HEIC → JPG`);
  console.log(`  Copied:    ${copied} JPG/JPEG/PNG`);
  console.log(`  Skipped:   ${skipped} (video, unsupported)`);
}

main();
