import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Crawls the static export in /out and verifies every internal link and
// asset reference resolves to a real file. Run after `npm run build`:
//   node scripts/check-links.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "out");

if (!fs.existsSync(OUT)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const pages = fs.readdirSync(OUT).filter((f) => f.endsWith(".html"));
const missing = [];
let checked = 0;

/** Map an internal URL to a file path inside out/, the way Apache would
 *  resolve it (with the .htaccess pretty-URL rules). */
function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (p.endsWith("/")) p += "index.html";
  const direct = path.join(OUT, p);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  if (fs.existsSync(direct + ".html")) return direct + ".html"; // /about -> about.html
  if (fs.existsSync(path.join(direct, "index.html"))) return path.join(direct, "index.html");
  return null;
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(OUT, page), "utf8");
  const refs = [...html.matchAll(/(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1]);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(ref)) continue;
    if (ref.startsWith("/")) {
      checked++;
      if (!resolveFile(ref)) missing.push(`${page} -> ${ref}`);
    }
  }
}

console.log(`Checked ${checked} internal references across ${pages.length} pages.`);
if (missing.length) {
  console.log(`\nMISSING (${missing.length}):`);
  for (const m of [...new Set(missing)]) console.log("  " + m);
  process.exit(1);
}
console.log("All internal links and assets resolve. ✓");
