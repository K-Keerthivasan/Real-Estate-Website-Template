"use client";

import { useFavorites } from "@/lib/favorites";

type FavoriteButtonProps = {
  propertyId: string;
  className?: string;
};

export function FavoriteButton({ propertyId, className = "" }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavorites();
  const saved = isFavorite(propertyId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(propertyId);
      }}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
        saved
          ? "border-sky bg-sky text-white"
          : "border-white/70 bg-white/80 text-[#667085] hover:border-sky hover:text-sky"
      } backdrop-blur ${className}`}
    >
      <HeartIcon filled={saved} />
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
