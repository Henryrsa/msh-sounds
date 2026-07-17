"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setTimeout(() => menuButtonRef.current?.focus(), 100);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border py-2 sm:py-3" 
          : "bg-black/50 backdrop-blur-sm py-3 sm:py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
            <Image
              src="/msh_logo-transparent.png"
              alt="MSH Sounds Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-playfair text-base sm:text-lg font-bold leading-tight">
              <span className="text-msh-red">SOUNDS</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-msh-gold tracking-widest">CAR AUDIO</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${
                pathname === link.href ? "active" : ""
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:hidden">
          <button
            ref={menuButtonRef}
            className="p-2 rounded-lg hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-msh-red relative z-[70]"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-foreground transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`h-0.5 w-full bg-foreground transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-full bg-foreground transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 top-0 bg-black/50 z-[55]"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-[65]"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-msh-red bg-msh-red/10 font-semibold"
                      : "hover:bg-surface"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
