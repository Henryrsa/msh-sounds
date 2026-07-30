"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Video {
  url: string;
  embedUrl: string;
  title: string;
}

interface FullBuildsSectionProps {
  videos: Video[];
}

export default function FullBuildsSection({ videos }: FullBuildsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      if (hovering || !scrollRef.current) return;

      const card = scrollRef.current.querySelector(".shrink-0") as HTMLElement | null;
      if (!card) return;

      const cardWidth = card.offsetWidth + 16;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      if (scrollRef.current.scrollLeft >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videos, hovering]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".shrink-0") as HTMLElement | null;
    if (!card) return;
    const distance = card.offsetWidth + 16;
    el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  };

  if (videos.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
      <h2 className="font-playfair text-2xl font-bold text-center mb-6">
        <span className="text-foreground">Full </span>
        <span className="text-msh-red">Builds</span>
      </h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scrollBy("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-msh-red/80 hover:bg-msh-red text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className="shrink-0 w-[280px] sm:w-[320px] card overflow-hidden"
            >
              <div className="relative w-full" style={{ aspectRatio: "267/476" }}>
                <iframe
                  src={video.embedUrl}
                  className="absolute inset-0 w-full h-full border-none"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {video.title}
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-xs text-msh-red hover:underline"
                >
                  Watch on Facebook
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-msh-red/80 hover:bg-msh-red text-white flex items-center justify-center transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
