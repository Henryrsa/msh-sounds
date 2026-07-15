import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container py-6 sm:py-8">
        <div className="grid sm:grid-cols-2 gap-6 items-start">
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
              <span className="text-msh-gold">Sounds</span>
            </h3>
            <p className="text-foreground-muted text-xs sm:text-sm mt-1">Professional Car Audio Fitment</p>
            <p className="text-foreground-muted text-xs mt-3">
              33507 30 M-Motaung Street<br />
              Mamelodi, Gauteng
            </p>
          </div>

          <div className="text-center sm:text-right">
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

        <div className="border-t border-border mt-6 pt-4 sm:pt-6 text-center">
          <p className="text-foreground-muted text-xs">
            &copy; {new Date().getFullYear()} MSH Sounds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
