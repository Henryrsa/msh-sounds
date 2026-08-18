import Image from "next/image";
import { User, Phone, Mail, MapPin, CheckCircle, MessageCircle } from "lucide-react";

const aboutPoints = [
  "Expert car audio installations with clean, professional wiring and premium finishes (including full rewiring from scratch when needed).",
  "Focus on high-quality sound — clear vocals, powerful bass, and sharp highs using trusted brands and components.",
  "Custom solutions tailored to your vehicle (Hilux, Polo, bakkies, and more), from basic upgrades to complete systems.",
  "Competitive pricing with a strong emphasis on value and beating market rates.",
  "Systems built to match your style and budget.",
  "Local Pretoria-based service (Mamelodi East, near MAMS Mall) with a hands-on, results-driven approach.",
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12">
      <section className="section py-8 sm:py-12">
        <div className="container">
          <h1 className="section-title text-center">
            <span className="text-foreground">About </span>
            <span className="text-msh-red">MSH Sounds And Projects</span>
          </h1>
          <p className="section-subtitle text-center mx-auto mb-10 sm:mb-16">
            Your trusted car audio professionals in Mamelodi, Gauteng
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="card p-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/msh_logo-transparent.png"
                  alt="MSH Sounds Logo"
                  fill
                  className="object-contain logo-glow"
                />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-center mb-6">
                What We Do
              </h2>
              <ul className="space-y-4">
                {aboutPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-msh-red mt-0.5 shrink-0" />
                    <span className="text-foreground-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-playfair text-xl font-bold text-msh-gold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Contact Person</p>
                      <p className="font-semibold">Sipho</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Phone</p>
                      <p className="font-semibold">071 639 1217</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">WhatsApp</p>
                      <a
                        href="https://wa.me/27670712048"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-msh-red transition-colors"
                      >
                        067 071 2048
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Email</p>
                      <p className="font-semibold">Mohlalasipho67@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-msh-red/10 flex items-center justify-center text-msh-red">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">Address</p>
                      <p className="font-semibold">33507 30 Motaung Street, Mahube Valley, Pretoria, 0122</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
