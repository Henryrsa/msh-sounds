"use client";

import Link from "next/link";
import Image from "next/image";
import ShowcaseSlideshow from "./components/ShowcaseSlideshow";
import ElfsightReviews from "./components/ElfsightReviews";
import { ArrowRight, Music, Radio, Wrench, ShoppingBag, Speaker, Headphones, Star, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <Image
          src="/hero_image.jpg"
          alt="MSH Sounds Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Glass Card Content */}
        <div className="relative z-20 container px-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 max-w-xl sm:max-w-2xl mx-auto text-center mt-16 sm:mt-20">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6">
              <Image
                src="/msh_logo-transparent.png"
                alt="MSH Sounds Logo"
                fill
                className="object-contain logo-glow"
                priority
              />
            </div>
            
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              <span className="text-msh-red">MSH</span>{" "}
              <span className="text-foreground">Sounds</span>
            </h1>
            <p className="text-msh-gold text-sm sm:text-base md:text-lg tracking-widest mb-3">CAR AUDIO FITMENT</p>
            <p className="text-white text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              Professional car audio installation and sound system services. 
              Transform your driving experience with premium sound quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/gallery" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-foreground">Our </span>
              <span className="text-msh-red">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">
              See our installations in action — sound tests, speaker setups, and more
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <ShowcaseSlideshow />
          </div>

          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-secondary gap-2">
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-foreground">Our </span>
              <span className="text-msh-gold">Services</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Professional car audio services tailored to your needs
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Music, 
                title: "Subwoofer Install", 
                desc: "Premium subwoofer installation for deep, powerful bass" 
              },
              { 
                icon: Radio, 
                title: "Amplifier Setup", 
                desc: "Professional amplifier installation and tuning" 
              },
              { 
                icon: Wrench, 
                title: "Full System", 
                desc: "Complete car audio system design and installation" 
              },
            ].map((service, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="icon-box mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-foreground-muted">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-foreground">Visit Our </span>
              <span className="text-msh-red">Shop</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Browse our range of premium car audio equipment
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Speaker,
                title: "Subwoofers",
                desc: "Deep, powerful bass for your ride",
              },
              {
                icon: Headphones,
                title: "Amplifiers",
                desc: "Power your entire sound system",
              },
              {
                icon: Music,
                title: "Speakers",
                desc: "Crystal clear audio upgrades",
              },
            ].map((product, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="icon-box mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <product.icon className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-foreground-muted">{product.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-primary gap-2">
              <ShoppingBag className="w-5 h-5" />
              Visit Our Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-foreground">Customer </span>
              <span className="text-msh-gold">Reviews</span>
            </h2>
            <p className="section-subtitle mx-auto">
              See what our customers are saying about us on Google
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="card p-4 sm:p-6">
              <ElfsightReviews />
              <div className="text-center mt-6">
                <a
                  href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x1e95593f7c529d13:0xaf03e5d2945876ec!12e1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary gap-2"
                >
                  Leave Us a Review on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">
            <span className="text-foreground">Ready to </span>
            <span className="text-msh-red">Upgrade?</span>
          </h2>
          <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
            Contact us today for a free quote on your car audio needs
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
