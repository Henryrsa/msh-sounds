import fs from "fs";
import path from "path";
import FullBuildsSection from "../components/FullBuildsSection";
import GalleryGrid from "../components/GalleryGrid";

const videos = [
  {
    url: "https://www.facebook.com/reel/1386431092788476/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1386431092788476%2F&show_text=false&width=267",
    title: "Full System Build",
  },
  {
    url: "https://www.facebook.com/reel/1516225453324919/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1516225453324919%2F&show_text=false&width=267",
    title: "Full Build",
  },
  {
    url: "https://www.facebook.com/reel/2003440407191477/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2003440407191477%2F&show_text=false&width=267",
    title: "Full Build",
  },
  {
    url: "https://www.facebook.com/reel/788862933605298/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F788862933605298%2F&show_text=false&width=267",
    title: "Full Build",
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

  const sorted = categories.filter((c) => c !== "gallery");
  const reordered = [...images.slice(11), ...images.slice(0, 11)];
  return { images: reordered, categories: ["gallery", ...sorted, "all"] };
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

          <div className="max-w-6xl mx-auto">
            <GalleryGrid images={images} categories={categories} />
          </div>

          <FullBuildsSection videos={videos} />
        </div>
      </section>
    </div>
  );
}
