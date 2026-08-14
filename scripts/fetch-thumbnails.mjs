import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/full-builds");
const FB_TOKEN = process.env.FACEBOOK_TOKEN || "";

const videos = [
  {
    slug: "fb-1386431092788476",
    type: "facebook",
    url: "https://www.facebook.com/reel/1386431092788476/",
  },
  {
    slug: "fb-1516225453324919",
    type: "facebook",
    url: "https://www.facebook.com/reel/1516225453324919/",
  },
  {
    slug: "fb-2003440407191477",
    type: "facebook",
    url: "https://www.facebook.com/reel/2003440407191477/",
  },
  {
    slug: "tiktok-7668004321245596935",
    type: "tiktok",
    url: "https://www.tiktok.com/@msh_sound/video/7668004321245596935",
  },
];

async function fetchWithTimeout(url, options = {}, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function getThumbnailUrl(video) {
  const encoded = encodeURIComponent(video.url);
  const oembedUrl =
    video.type === "tiktok"
      ? `https://www.tiktok.com/oembed?url=${encoded}`
      : `https://graph.facebook.com/v26.0/oembed_video?url=${encoded}${FB_TOKEN ? `&access_token=${FB_TOKEN}` : ""}`;

  const headers = { "User-Agent": "msh-sounds-thumbnail-fetch" };

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(oembedUrl, { headers });
      if (!res.ok) {
        console.warn(`  oEmbed ${res.status} for ${video.slug} (attempt ${attempt})`);
        continue;
      }
      const data = await res.json();
      if (data && data.thumbnail_url) return data.thumbnail_url;
      console.warn(`  No thumbnail_url in oEmbed response for ${video.slug}`);
    } catch (err) {
      console.warn(`  oEmbed error for ${video.slug} (attempt ${attempt}): ${err.message}`);
    }
  }
  return null;
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const video of videos) {
    console.log(`Fetching thumbnail for ${video.slug}...`);
    const thumbUrl = await getThumbnailUrl(video);
    if (!thumbUrl) {
      console.warn(`  Skipped ${video.slug} (no thumbnail available).`);
      continue;
    }

    try {
      const res = await fetchWithTimeout(thumbUrl);
      if (!res.ok) {
        console.warn(`  Thumbnail download ${res.status} for ${video.slug}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const resized = await sharp(buffer)
        .resize({ width: 400, withoutEnlargement: true, fit: "inside" })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      const dest = path.join(OUT_DIR, `${video.slug}.jpg`);
      fs.writeFileSync(dest, resized);
      console.log(`  Saved ${video.slug}.jpg (${(resized.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.warn(`  Thumbnail download error for ${video.slug}: ${err.message}`);
    }
  }

  console.log("Done.");
}

run();
