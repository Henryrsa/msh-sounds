#!/usr/bin/env node
/**
 * Generate src/app/favicon.ico + src/app/apple-icon.png from the MSH logo.
 *
 * - Trims the transparent padding off msh_logo-transparent.png, pads back to a
 *   square, then exports a multi-size ICO (16/32/48/256, PNG-compressed
 *   entries — supported by all modern browsers/Windows) and a 180x180
 *   opaque apple-touch-icon (iOS ignores icon transparency).
 *
 * Usage: node scripts/make-favicon.mjs
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "msh_logo-transparent.png");
const OUT_ICO = path.join(ROOT, "src", "app", "favicon.ico");
const OUT_APPLE = path.join(ROOT, "src", "app", "apple-icon.png");

const ICO_SIZES = [16, 32, 48, 256];
const APPLE_SIZE = 180;

/** Assemble a .ico from PNG-encoded image buffers. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = header.length + images.length * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // image data offset
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  // 1. Trim transparent borders, add ~6% breathing room, pad to a square.
  const trimmed = await sharp(SRC).trim({ threshold: 8 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const margin = Math.round(Math.max(meta.width, meta.height) * 0.06);
  const side = Math.max(meta.width, meta.height) + margin * 2;
  const padY = margin + Math.floor((side - margin * 2 - meta.height) / 2);
  const padX = margin + Math.floor((side - margin * 2 - meta.width) / 2);
  const square = await sharp(trimmed)
    .extend({
      top: padY,
      bottom: side - meta.height - padY,
      left: padX,
      right: side - meta.width - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // 2. Multi-size .ico.
  const images = [];
  for (const size of ICO_SIZES) {
    const data = await sharp(square)
      .resize(size, size, {
        fit: "contain",
        kernel: "lanczos3",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    images.push({ size, data });
  }
  await writeFile(OUT_ICO, buildIco(images));

  // 3. Opaque apple-touch-icon (iOS renders icon transparency as black).
  const apple = await sharp(square)
    .resize(APPLE_SIZE, APPLE_SIZE, {
      fit: "contain",
      kernel: "lanczos3",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();
  await writeFile(OUT_APPLE, apple);

  console.log(
    `favicon.ico: ${ICO_SIZES.join("/")} px (${(await readFile(OUT_ICO)).length} B)\n` +
      `apple-icon.png: ${APPLE_SIZE}x${APPLE_SIZE} (${apple.length} B)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
