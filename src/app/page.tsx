"use client";

import Link from "next/link";
import Image from "next/image";
import VideoSlideshow from "./components/VideoSlideshow";
import { ArrowRight, Music, Radio, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
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
            <p className="text-msh-gold text-sm sm:text-base md:text-lg tracking-widest mb-3">CAR AUDIO FITTMENT</p>
            <p className="text-foreground-muted text-xs sm:text-sm mb-6 max-w-lg mx-auto">
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

      {/* Video Section */}
      <section className="section bg-surface">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="text-foreground">Our </span>
              <span className="text-msh-red">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Watch short clips of our car audio installations and sound testing
            </p>
          </div>
          <VideoSlideshow />
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

      {/* CTA Section */}
      <section className="section bg-surface">
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
