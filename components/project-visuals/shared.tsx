import type { ComponentType } from "react";

/**
 * Bespoke, hand-authored SVG scene for each project. Every scene shares a
 * 0 0 400 300 viewBox and renders on top of the project's gradient, so it
 * leans on translucent-white structure with a few brand-color accents.
 */
export interface VisualProps {
  className?: string;
}

type VisualComponent = ComponentType<VisualProps>;

// Shared frame — the soft "screen" every scene sits inside.
export function Frame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* window chrome dots */}
      <circle cx="26" cy="24" r="4" fill="rgba(255,255,255,0.45)" />
      <circle cx="40" cy="24" r="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="54" cy="24" r="4" fill="rgba(255,255,255,0.3)" />
      {children}
    </svg>
  );
}
