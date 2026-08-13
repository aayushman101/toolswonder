"use client";

import { useEffect } from "react";

interface AdUnitProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdUnit({ slot, format = "auto", responsive = true, className = "" }: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      data-ad-client="ca-pub-4076619037767871"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}
