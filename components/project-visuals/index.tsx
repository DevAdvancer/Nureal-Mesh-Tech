import type { ComponentType } from "react";
import type { VisualProps } from "./shared";
import { getProject } from "@/data/projects";
import FlowDesk from "./flowdesk";
import TrackMate from "./trackmate";
import DataPulse from "./datapulse";
import LaunchKit from "./launchkit";
import LegacyBridge from "./legacybridge";
import LedgerLink from "./ledgerlink";
import CareCast from "./carecast";
import VoltPath from "./voltpath";
import ParseFlow from "./parseflow";
import Keystone from "./keystone";

// slug → bespoke SVG scene. Add a project here when its visual is authored.
const VISUALS: Record<string, ComponentType<VisualProps>> = {
  flowdesk: FlowDesk,
  trackmate: TrackMate,
  datapulse: DataPulse,
  launchkit: LaunchKit,
  legacybridge: LegacyBridge,
  ledgerlink: LedgerLink,
  carecast: CareCast,
  voltpath: VoltPath,
  parseflow: ParseFlow,
  keystone: Keystone,
};

export function hasProjectVisual(slug: string): boolean {
  return slug in VISUALS;
}

/**
 * Renders the actual image for `slug` if it exists, otherwise renders the bespoke SVG for `slug`,
 * or nothing (letting the underlying gradient show through) when no scene has been authored yet.
 */
export function ProjectVisual({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const p = getProject(slug);
  
  if (p?.image) {
    return <img src={p.image} alt={p.name} className={`${className || ""} object-cover w-full h-full`} />;
  }

  const Scene = VISUALS[slug];
  if (!Scene) return null;
  return <Scene className={className} />;
}
