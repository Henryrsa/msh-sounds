import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/27670712048",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1FS3eWuMfV/",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@msh_sound?_r=1&_t=ZS-94l3Ku84gMh",
    icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container py-6 sm:py-8">
        <div className="grid sm:grid-cols-3 gap-6 items-start">
          <div className="text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0 mb-3">
              <Image
                src="/msh_logo-transparent.png"
                alt="MSH Sounds Logo"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-playfair text-base sm:text-lg font-bold">
              <span className="text-msh-red">MSH</span>{" "}
              <span className="text-msh-gold">Sounds And Projects</span>
            </h3>
            <p className="text-foreground-muted text-xs sm:text-sm mt-1">Professional Car Audio Fitment</p>
            <p className="text-foreground-muted text-xs mt-3">
              33507 30 M-Motaung Street<br />
              Mamelodi, Gauteng
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-16 h-16 rounded-full bg-surface-hover border border-border mx-auto mb-3 overflow-hidden">
              <Image
                src="/msh_logo-transparent.png"
                alt="Mohlala Sipho Hlabishi"
                fill
                className="object-contain p-1"
              />
            </div>
            <h4 className="font-playfair text-sm font-bold">Mohlala Sipho Hlabishi</h4>
            <p className="text-msh-gold text-xs tracking-wide mt-1">Founder & CEO</p>
          </div>

          <div className="text-center sm:text-center">
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <div className="flex flex-col gap-1">
              {["Home", "About", "Services", "Shop", "Gallery", "Contact"].map((link) => (
                <Link 
                  key={link} 
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-foreground-muted hover:text-msh-red transition-colors text-xs"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center mt-6 pt-6 border-t border-border">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={social.name}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>

        <div className="border-t border-border mt-6 pt-4 sm:pt-6 text-center">
          <p className="text-foreground-muted text-xs">
            &copy; {new Date().getFullYear()} MSH Sounds And Projects. All rights reserved.
          </p>
          <p className="text-foreground-muted text-xs mt-1">
            Registration No: K2026036547
          </p>
        </div>
      </div>
    </footer>
  );
}
