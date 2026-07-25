import fs from "fs";
import path from "path";
import sharp from "sharp";

const galleryDir = path.resolve("public/gallery/gallery");
const files = fs.readdirSync(galleryDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

let count = 0;
for (const file of files) {
  const filePath = path.join(galleryDir, file);
  try {
    const meta = await sharp(filePath).metadata();
    const width = meta.width || 0;
    const height = meta.height || 0;
    const maxDim = Math.max(width, height);

    if (maxDim <= 1200) {
      count++;
      continue;
    }

    const resizeWidth = width >= height ? 1200 : undefined;
    const resizeHeight = height > width ? 1200 : undefined;

    await sharp(filePath)
      .resize(resizeWidth, resizeHeight, { fit: "inside" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(filePath + ".tmp");

    fs.renameSync(filePath + ".tmp", filePath);
    count++;
    console.log(`Resized: ${file} (${width}x${height} -> 1200 max)`);
  } catch (err) {
    console.error(`Failed: ${file} — ${err.message}`);
  }
}

console.log(`\nDone. ${count} images processed.`);
