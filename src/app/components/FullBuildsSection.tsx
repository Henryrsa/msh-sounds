"use client";

interface Video {
  embedUrl: string;
  title: string;
}

interface FullBuildsSectionProps {
  videos: Video[];
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
            <div className="relative w-full" style={{ aspectRatio: "267/476" }}>
              <iframe
                src={video.embedUrl}
                className="absolute inset-0 w-full h-full border-none"
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
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
