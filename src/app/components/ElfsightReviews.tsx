"use client";

import { useEffect, useRef } from "react";

const WIDGET_ID = "elfsight-app-dbb9a8d6-a554-417b-8aa0-b79b929f45eb";
const SCRIPT_SRC = "https://elfsightcdn.com/platform.js";

export default function ElfsightReviews() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    scriptLoaded.current = true;
  }, []);

  return (
    <div
      className={WIDGET_ID}
      data-elfsight-app-lazy
    />
  );
}
