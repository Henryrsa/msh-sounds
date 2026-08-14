"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

interface Video {
  url: string;
  embedUrl: string;
  title: string;
  type: "facebook" | "tiktok";
  thumbnail?: string;
}

interface FullBuildsSectionProps {
  videos: Video[];
}

function withAutoplay(url: string): string {
  if (!url) return url;
  return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
}

export default function FullBuildsSection({ videos }: FullBuildsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(new Set());

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
      if (playingIndex !== null || hovering || !scrollRef.current) return;

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
  }, [videos, hovering, playingIndex]);

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
          {videos.map((video, index) => {
            const isPlaying = playingIndex === index;
            return (
            <div
              key={index}
              className="shrink-0 w-[280px] sm:w-[320px] card overflow-hidden"
            >
              <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                {isPlaying ? (
                  <>
                    <iframe
                      src={withAutoplay(video.embedUrl)}
                      className="absolute inset-0 w-full h-full border-none"
                      scrolling="no"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                      aria-label="Close video"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setPlayingIndex(index)}
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-background"
                    aria-label={`Play ${video.title}`}
                  >
                    {video.thumbnail && !failed.has(index) && (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                        onError={() =>
                          setFailed((prev) => new Set(prev).add(index))
                        }
                      />
                    )}
                    <span className="absolute inset-0 bg-black/40" />
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <span className="w-20 h-20 rounded-full bg-msh-red/20 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-msh-red/30 flex items-center justify-center">
                          <Play className="w-7 h-7 text-msh-red ml-1" />
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-white px-4 text-center drop-shadow">
                        {video.title}
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </div>
            );
          })}
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
