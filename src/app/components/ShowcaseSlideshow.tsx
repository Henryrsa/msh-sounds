"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface Slide {
  type: "video" | "image" | "facebook" | "tiktok";
  src?: string;
  url?: string;
  alt: string;
  title: string;
}

const slides: Slide[] = [
  {
    type: "video",
    src: "/Sound Test.mp4",
    alt: "MSH Sounds sound test",
    title: "Sound Test",
  },
  {
    type: "image",
    src: "/SP1.jpg",
    alt: "Speakers and subwoofers installation by MSH Sounds",
    title: "Speakers & Subwoofers",
  },
  {
    type: "image",
    src: "/SP2.jpg",
    alt: "Head unit installation by MSH Sounds",
    title: "Head Unit Installation",
  },
  {
    type: "facebook",
    url: "https://www.facebook.com/reel/1516225453324919/",
    alt: "MSH Sounds installation showcase",
    title: "MSH Sounds Installation",
  },
];

const SOCIAL_TYPES = new Set(["facebook", "tiktok"]);

export default function ShowcaseSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSocialSlide = SOCIAL_TYPES.has(slides[currentIndex].type);

  useEffect(() => {
    if (isPaused || isSocialSlide) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, isSocialSlide]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, currentIndex]);

  useEffect(() => {
    if (videoRef.current) {
      if (currentIndex === 0 && slides[0].type === "video") {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsMuted(true);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsMuted(true);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsMuted(true);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const slide = slides[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-border">
        {slide.type === "video" && (
          <video
            ref={videoRef}
            src={slide.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {slide.type === "image" && (
          <Image
            src={slide.src!}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        )}

        {slide.type === "facebook" && (
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(slide.url!)}&show_text=false&width=560`}
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <p className="text-white font-semibold text-lg drop-shadow-lg">
            {slide.title}
          </p>
          {slide.type === "video" && (
            <button
              onClick={toggleMute}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/30 text-white transition-colors"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 text-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 text-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-8 h-1 rounded-full transition-all ${
              index === currentIndex
                ? "bg-msh-red"
                : "bg-border hover:bg-foreground-muted"
            }`}
            aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
