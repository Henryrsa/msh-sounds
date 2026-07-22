import Image from "next/image";
import { User, Phone, Mail, MapPin, CheckCircle, MessageCircle } from "lucide-react";

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
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/msh_logo-transparent.png"
                  alt="MSH Sounds Logo"
                  fill
                  className="object-contain logo-glow"
                />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-center mb-4">
                Our Story
              </h2>
              <p className="text-foreground-muted leading-relaxed text-center">
                MSH Sounds And Projects is a professional car audio fitment business based in Mamelodi, Gauteng. 
                We specialize in installing high-quality sound systems that transform your driving experience. 
                With years of experience, we take pride in delivering exceptional audio solutions tailored 
                to each customer's unique needs and preferences.
              </p>
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

              <div className="card p-6">
                <h3 className="font-playfair text-xl font-bold text-msh-red mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  {["Professional installation", "Quality products", "Competitive pricing", "Customer satisfaction"].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-msh-red" />
                      <span className="text-foreground-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
