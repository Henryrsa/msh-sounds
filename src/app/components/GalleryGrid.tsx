"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories: string[];
}

const categoryLabels: Record<string, string> = {
  all: "All",
  subwoofers: "Subwoofers",
  speakers: "Speakers",
  amplifiers: "Amplifiers",
  toyota: "Toyota",
  vivo: "Vivo",
  complete: "Complete",
  uncategorized: "Uncategorized",
};

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-msh-red text-white"
                : "bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-msh-red/50"
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      <p className="text-foreground-muted text-sm text-center mb-6">
        {filteredImages.length} {filteredImages.length === 1 ? "photo" : "photos"}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {filteredImages.map((img, index) => (
          <button
            key={img.src}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square bg-surface rounded-lg overflow-hidden border border-border hover:border-msh-red/50 transition-all cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <p className="text-foreground-muted text-center py-12">No photos in this category yet.</p>
      )}

      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
        }
      />
    </>
  );
}
