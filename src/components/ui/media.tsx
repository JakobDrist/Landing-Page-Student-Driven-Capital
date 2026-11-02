import Image from "next/image";
import type { Media as MediaSource } from "@/content/types";
export function Media({
  image,
  className = "",
  preload = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  image: MediaSource;
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}
