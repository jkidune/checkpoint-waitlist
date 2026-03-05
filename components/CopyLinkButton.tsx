"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // If clipboard fails, you can optionally show an error state
      setCopied(false);
    }
  }

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {copied ? (
        <>
          <Check className="icon" />
          Link copied
        </>
      ) : (
        <>
          <Copy className="icon" />
          Copy link
        </>
      )}
    </button>
  );
}