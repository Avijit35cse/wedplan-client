
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ALLOWED_IMAGE_HOSTS = [
  "images.unsplash.com",
  "i.ibb.co",
  "ibb.co",
];

function isValidImageUrl(src?: string | null): boolean {
  if (!src) return false;

  try {
    const url = new URL(src);

    return (
      url.protocol === "https:" &&
      ALLOWED_IMAGE_HOSTS.includes(url.hostname)
    );
  } catch {
    return false;
  }
}

export default function ServiceImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const validImage = isValidImageUrl(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-champagne/40",
        className
      )}
    >
      {validImage && !failed ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gold/50">
          <ImageIcon
            aria-hidden
            className="size-8"
            strokeWidth={1.25}
          />
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
