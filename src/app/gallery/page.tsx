import VideoSlideshow from "../components/VideoSlideshow";
import { Play } from "lucide-react";

export default function Gallery() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <h1 className="section-title text-center">
            <span className="text-foreground">Our </span>
            <span className="text-msh-red">Gallery</span>
          </h1>
          <p className="section-subtitle text-center mx-auto mb-10 sm:mb-16">
            Watch videos of our car audio installations and sound testing
          </p>

          <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="card p-3 sm:p-6 md:p-8">
              <VideoSlideshow />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card p-4 group cursor-pointer">
                <div className="aspect-video bg-surface-hover rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Play className="w-12 h-12 text-foreground-muted group-hover:text-msh-red group-hover:scale-110 transition-all" />
                  <div className="absolute inset-0 bg-msh-red/0 group-hover:bg-msh-red/10 transition-colors" />
                </div>
                <p className="text-foreground-muted text-center mt-4 text-sm">Project {item}</p>
              </div>
            ))}
          </div>

          <p className="text-foreground-muted text-center mt-8 text-sm">
            More videos coming soon! Contact us to see our previous work.
          </p>
        </div>
      </section>
    </div>
  );
}
