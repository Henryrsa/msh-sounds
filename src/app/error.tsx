"use client";

import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-playfair text-6xl font-bold text-msh-red mb-4">Oops!</h1>
          <h2 className="font-playfair text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-foreground-muted mb-8">
            We're sorry, but something unexpected happened. Please try again or contact us if the problem persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={reset} className="btn-primary gap-2">
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link href="/" className="btn-secondary gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
