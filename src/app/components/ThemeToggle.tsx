"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="fixed bottom-4 left-4 md:bottom-auto md:top-24 z-[100] p-3 rounded-full bg-gray-800 shadow-lg"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 bg-gray-600 rounded-full" />
      </button>
    );
  }

  // Get the current effective theme - resolvedTheme handles system preference
  const currentTheme = resolvedTheme || systemTheme || "dark";

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 left-4 md:bottom-auto md:top-24 z-[100] p-3 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 transition-all shadow-lg border border-white/20"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      {currentTheme === "dark" ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-black" />
      )}
    </button>
  );
}
