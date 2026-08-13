"use client";

import Script from "next/script";

export default function AdSenseScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4076619037767871"
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
