import Link from "next/link";
import { Music, Radio, Volume2, Speaker, Shield, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Music,
    title: "Subwoofer Installation",
    description: "Premium subwoofer installation for deep, powerful bass. We install single, double, and custom subwoofer setups.",
    features: ["Single Subwoofer", "Dual Subwoofer", "Custom Enclosures", "Box Design"],
  },
  {
    icon: Radio,
    title: "Amplifier Installation",
    description: "Professional amplifier installation and tuning to power your entire sound system for optimal performance.",
    features: ["Mono Block Amps", "Multi-Channel Amps", "Capacitor Installation", "Wiring & Routing"],
  },
  {
    icon: Volume2,
    title: "Full System Installation",
    description: "Complete car audio system design and installation from head units to speakers, subs, and amps.",
    features: ["Head Unit Installation", "Speaker Upgrade", "Sound Deadening", "System Tuning"],
  },
  {
    icon: Speaker,
    title: "Speaker Upgrade",
    description: "Replace factory speakers with high-quality aftermarket options for clearer, more detailed sound.",
    features: ["Component Speakers", "Coaxial Speakers", "Door Speakers", "Rear Speakers"],
  },
  {
    icon: Shield,
    title: "Sound Deadening",
    description: "Reduce road noise and vibrations to improve your audio quality and driving comfort.",
    features: ["Door Panels", "Floor & Trunk", "Roof Lining", "Professional Grade Materials"],
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Repair and maintenance services for existing car audio systems.",
    features: ["System Diagnostics", "Wiring Repairs", "Component Replacement", "System Upgrades"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <h1 className="section-title text-center">
            <span className="text-foreground">Our </span>
            <span className="text-msh-gold">Services</span>
          </h1>
          <p className="section-subtitle text-center mx-auto mb-10 sm:mb-16">
            Professional car audio services tailored to your vehicle and budget
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="card p-6 hover:border-msh-red transition-all group"
              >
                <div className="icon-box mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8" />
                </div>
                <h2 className="font-playfair text-xl font-bold mb-3">
                  {service.title}
                </h2>
                <p className="text-foreground-muted text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground-muted text-sm">
                      <span className="w-1.5 h-1.5 bg-msh-red rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-foreground-muted mb-4">Ready to upgrade your car audio?</p>
            <Link href="/contact" className="btn-primary gap-2">
              Get a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
