import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-playfair text-8xl font-bold text-msh-red mb-4">404</h1>
          <h2 className="font-playfair text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-foreground-muted mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link href="/contact" className="btn-secondary gap-2">
              <ArrowLeft className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
