import fs from "fs";
import path from "path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/full-builds");
const FB_TOKEN = process.env.FACEBOOK_TOKEN || "";

const videos = [
  {
    slug: "tiktok-7671222789583473927",
    type: "tiktok",
    url: "https://www.tiktok.com/@msh_sound/video/7671222789583473927",
  },
  {
    slug: "tiktok-7669696619830463762",
    type: "tiktok",
    url: "https://www.tiktok.com/@msh_sound/video/7669696619830463762",
  },
  {
    slug: "tiktok-7648662952853179655",
    type: "tiktok",
    url: "https://www.tiktok.com/@msh_sound/video/7648662952853179655",
  },
  {
    slug: "fb-1075132578567518",
    type: "facebook",
    url: "https://www.facebook.com/reel/1075132578567518/",
  },
  {
    slug: "fb-1846502219649806",
    type: "facebook",
    url: "https://www.facebook.com/reel/1846502219649806/",
  },
  {
    slug: "fb-2196808137814124",
    type: "facebook",
    url: "https://www.facebook.com/reel/2196808137814124/",
  },
  {
    slug: "fb-788862933605298",
    type: "facebook",
    url: "https://www.facebook.com/reel/788862933605298/",
  },
  {
    slug: "fb-1078753601250464",
    type: "facebook",
    url: "https://www.facebook.com/reel/1078753601250464/",
  },
];

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithTimeout(url, options = {}, ms = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Fallback: scrape og:image straight from the video page. */
async function getOgImage(url) {
  // Crawler UAs get server-rendered HTML with OG tags; normal browser UAs
  // get a JS shell with no og:image (TikTok especially).
  const isTikTok = url.includes("tiktok");
  const uas = isTikTok
    ? ["facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)", BROWSER_UA]
    : [MOBILE_UA, BROWSER_UA];

  let lastError = "no attempt";
  for (const ua of uas) {
    try {
      const res = await fetchWithTimeout(url, {
        headers: {
          "User-Agent": ua,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      if (!res.ok) throw new Error(`page ${res.status}`);
      const html = await res.text();
      const match =
        html.match(/property="og:image"\s+content="([^"]+)"/i) ||
        html.match(/content="([^"]+)"\s+property="og:image"/i);
      if (!match) throw new Error("og:image not found");
      return decodeEntities(match[1]);
    } catch (err) {
      lastError = err.message;
    }
  }
  throw new Error(lastError);
}

async function getThumbnailUrl(video) {
  const encoded = encodeURIComponent(video.url);

  // 1. oEmbed (preferred — clean, stable URLs)
  const oembedUrl =
    video.type === "tiktok"
      ? `https://www.tiktok.com/oembed?url=${encoded}`
      : `https://graph.facebook.com/v26.0/oembed_video?url=${encoded}${FB_TOKEN ? `&access_token=${FB_TOKEN}` : ""}`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchWithTimeout(oembedUrl, {
        headers: { "User-Agent": "msh-sounds-thumbnail-fetch" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.thumbnail_url) return data.thumbnail_url;
      } else {
        console.warn(`  oEmbed ${res.status} for ${video.slug} (attempt ${attempt})`);
      }
    } catch (err) {
      console.warn(`  oEmbed error for ${video.slug} (attempt ${attempt}): ${err.message}`);
    }
    await sleep(1500);
  }

  // 2. og:image fallback from the video page itself
  try {
    console.warn(`  Falling back to og:image for ${video.slug}...`);
    return await getOgImage(video.url);
  } catch (err) {
    console.warn(`  og:image failed for ${video.slug}: ${err.message}`);
    return null;
  }
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Optional filter: `node scripts/fetch-thumbnails.mjs tiktok`
  const filter = (process.argv[2] || "").toLowerCase();
  const queue = filter ? videos.filter((v) => v.type.startsWith(filter)) : videos;
  if (queue.length === 0) {
    console.warn(`No videos match filter "${filter}".`);
    return;
  }

  for (const video of queue) {
    console.log(`Fetching thumbnail for ${video.slug}...`);
    const thumbUrl = await getThumbnailUrl(video);
    if (!thumbUrl) {
      console.warn(`  Skipped ${video.slug} (no thumbnail available).`);
      continue;
    }

    try {
      const res = await fetchWithTimeout(thumbUrl, {
        headers: {
          "User-Agent": BROWSER_UA,
          Referer: video.type === "tiktok" ? "https://www.tiktok.com/" : "https://www.facebook.com/",
        },
      });
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

    await sleep(800);
  }

  console.log("Done.");
}

run();
