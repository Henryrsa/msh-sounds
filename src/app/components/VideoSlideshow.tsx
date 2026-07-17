"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videoPlaceholders = [
  { id: 1, title: "Subwoofer Install", duration: "0:15", desc: "Dual 12-inch sub setup" },
  { id: 2, title: "System Testing", duration: "0:12", desc: "Full system sound check" },
  { id: 3, title: "Speaker Upgrade", duration: "0:18", desc: "Component speaker install" },
];

export default function VideoSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoPlaceholders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videoPlaceholders.length) % videoPlaceholders.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videoPlaceholders.length);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative aspect-video bg-surface rounded-xl overflow-hidden border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-24 h-24 rounded-full bg-msh-red/10 flex items-center justify-center mx-auto mb-6">
              <div className="w-20 h-20 rounded-full bg-msh-red/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-msh-red ml-1" />
              </div>
            </div>
            <p className="text-foreground font-semibold text-lg">{videoPlaceholders[currentIndex].title}</p>
            <p className="text-foreground-muted text-sm mt-1">{videoPlaceholders[currentIndex].desc}</p>
            <p className="text-msh-red text-sm mt-1">{videoPlaceholders[currentIndex].duration}</p>
          </div>
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-msh-red hover:text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-msh-red hover:text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {videoPlaceholders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-8 h-1 rounded-full transition-all ${
              index === currentIndex
                ? "bg-msh-red"
                : "bg-border hover:bg-foreground-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
