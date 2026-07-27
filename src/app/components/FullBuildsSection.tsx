"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

interface Video {
  type: "facebook" | "tiktok";
  url: string;
  videoId?: string;
  title: string;
}

interface FullBuildsSectionProps {
  videos: Video[];
}

declare global {
  interface Window {
    FB?: { XFBML: { parse: (element?: HTMLElement) => void } };
    fbAsyncInit?: () => void;
  }
}

function loadFacebookSDK() {
  if (document.getElementById("facebook-jssdk")) return;
  // @ts-expect-error - FB SDK global
  window.fbAsyncInit = function () {
    window.FB?.XFBML.parse();
  };
  const script = document.createElement("script");
  script.id = "facebook-jssdk";
  script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
  script.async = true;
  script.defer = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

function FacebookEmbed({ videoId }: { videoId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFacebookSDK();
    // Give the SDK a moment to load, then parse
    const timer = setTimeout(() => {
      window.FB?.XFBML.parse(containerRef.current ?? undefined);
    }, 1000);
    return () => clearTimeout(timer);
  }, [videoId]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="fb-video"
        data-href={`https://www.facebook.com/reel/${videoId}/`}
        data-show-text="false"
        data-width=""
      />
    </div>
  );
}

export default function FullBuildsSection({ videos }: FullBuildsSectionProps) {
  if (videos.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
      <h2 className="font-playfair text-2xl font-bold text-center mb-6">
        <span className="text-foreground">Full </span>
        <span className="text-msh-red">Builds</span>
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {videos.map((video, index) => (
          <div
            key={index}
            className="shrink-0 w-[280px] sm:w-[320px] card overflow-hidden"
          >
            {video.type === "facebook" && video.videoId ? (
              <FacebookEmbed videoId={video.videoId} />
            ) : (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="aspect-[9/16] bg-surface flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-msh-red/90 flex items-center justify-center group-hover:bg-msh-red transition-colors">
                    <svg
                      className="w-7 h-7 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-white/70 text-xs">
                      Watch on {video.type === "tiktok" ? "TikTok" : "Facebook"}
                    </span>
                  </div>
                </div>
              </a>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-foreground truncate">
                {video.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
