import Link from "next/link";
import { ArrowRight, Volume2 } from "lucide-react";

export default function Shop() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card p-8 sm:p-12">
              <div className="equalizer mx-auto mb-8">
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
              </div>

              <h1 className="section-title">
                <span className="text-foreground">Our </span>
                <span className="text-msh-red">Shop</span>
              </h1>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Volume2 className="w-5 h-5 text-msh-gold" />
                <p className="text-msh-gold font-semibold tracking-wide text-sm">
                  Coming Soon
                </p>
                <Volume2 className="w-5 h-5 text-msh-gold" />
              </div>

              <p className="text-foreground-muted mb-8 max-w-md mx-auto">
                MSH Sounds And Projects are tuning up something big. Our online
                store with premium car audio equipment is on its way. Stay tuned!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary gap-2">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
