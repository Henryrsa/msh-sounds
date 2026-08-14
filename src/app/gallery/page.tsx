import fs from "fs";
import path from "path";
import { ExternalLink } from "lucide-react";
import FullBuildsSection from "../components/FullBuildsSection";
import ElfsightReviews from "../components/ElfsightReviews";
import GalleryGrid from "../components/GalleryGrid";

const videos = [
  {
    url: "https://www.facebook.com/reel/1386431092788476/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1386431092788476%2F&show_text=false&width=267&t=0",
    title: "Full System Build",
    thumbnail: "/full-builds/fb-1386431092788476.jpg",
    type: "facebook" as const,
  },
  {
    url: "https://www.facebook.com/reel/1516225453324919/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1516225453324919%2F&show_text=false&width=267&t=0",
    title: "Full Build",
    thumbnail: "/full-builds/fb-1516225453324919.jpg",
    type: "facebook" as const,
  },
  {
    url: "https://www.facebook.com/reel/2003440407191477/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2003440407191477%2F&show_text=true&width=267&t=0",
    title: "Full Build",
    thumbnail: "/full-builds/fb-2003440407191477.jpg",
    type: "facebook" as const,
  },
  {
    url: "https://www.tiktok.com/@msh_sound/video/7668004321245596935",
    embedUrl: "https://www.tiktok.com/embed/v2/7668004321245596935",
    title: "Full Build",
    thumbnail: "/full-builds/tiktok-7668004321245596935.jpg",
    type: "tiktok" as const,
  },
];

function getGalleryImages() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const images: { src: string; alt: string; category: string }[] = [];

  if (!fs.existsSync(galleryDir)) return { images, categories: [] };

  const categories = fs
    .readdirSync(galleryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const category of categories) {
    const catDir = path.join(galleryDir, category);
    const files = fs.readdirSync(catDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

    for (const file of files) {
      images.push({
        src: `/gallery/${category}/${file}`,
        alt: `${category} installation by MSH Sounds`,
        category,
      });
    }
  }

  const sorted = categories.filter((c) => c !== "gallery" && c !== "More");
  const reordered = [...images.slice(11), ...images.slice(0, 11)];
  return { images: reordered, categories: ["gallery", ...sorted, "More", "all"] };
}

export const metadata = {
  title: "Gallery | MSH Sounds And Projects",
  description:
    "Browse our car audio installations — subwoofers, speakers, amplifiers, and full system setups.",
};

export default function Gallery() {
  const { images, categories } = getGalleryImages();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <h1 className="section-title text-center">
            <span className="text-foreground">Our </span>
            <span className="text-msh-red">Gallery</span>
          </h1>
          <p className="section-subtitle text-center mx-auto mb-10 sm:mb-16">
            Browse our car audio installations and see our work
          </p>

          <div className="max-w-6xl mx-auto mb-12">
            <GalleryGrid images={images} categories={categories} />
          </div>

          <FullBuildsSection videos={videos} />

          <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
            <div className="card p-4 sm:p-6">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4">
                <span className="text-foreground">Customer </span>
                <span className="text-msh-gold">Reviews</span>
              </h2>
              <p className="text-foreground-muted text-sm mb-6">
                See what our customers are saying about us on Google
              </p>
              <ElfsightReviews />
              <div className="text-center mt-6">
                <a
                  href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x1e95593f7c529d13:0xaf03e5d2945876ec!12e1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary gap-2"
                >
                  Leave Us a Review on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
