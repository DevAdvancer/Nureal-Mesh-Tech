"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
        {project && (
          <div className="rounded-xl overflow-hidden bg-white text-[#1C1A26] max-h-[90vh] overflow-y-auto">
            <div className="relative h-56 md:h-72" style={{ background: project.grad }}>
              <div className="absolute inset-x-8 top-8 bottom-8 rounded-lg bg-white/15 backdrop-blur-[2px] border border-white/20" />
              <div className="absolute bottom-5 left-6 right-6">
                <div className="eyebrow text-white/90 mb-1">{project.tag} · {project.year}</div>
                <DialogTitle className="font-display font-extrabold text-white text-[34px] leading-none">
                  {project.name}
                </DialogTitle>
              </div>
            </div>

            <div className="p-7 md:p-10 space-y-7">
              <DialogDescription asChild>
                <p className="font-display italic text-[20px] leading-snug text-[#1C1A26]">
                  {project.hero.headline}
                </p>
              </DialogDescription>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-[#1C1A26]/10">
                {[
                  { l: "Client", v: project.client },
                  { l: "Duration", v: project.duration },
                  { l: "Role", v: project.role },
                  { l: "Year", v: project.year },
                ].map((m) => (
                  <div key={m.l}>
                    <div className="eyebrow text-[#1C1A26]/55 mb-1">{m.l}</div>
                    <div className="font-display text-[14px]">{m.v}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="eyebrow text-coral mb-2">CHALLENGE</div>
                <p className="font-body text-[15px] leading-[1.7] text-[#1C1A26]/80">{project.challenge}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-lg bg-[#F5F1EA]">
                    <div className="font-display font-extrabold text-[22px] text-violet leading-none">{m.value}</div>
                    <div className="font-body text-[11px] text-[#1C1A26]/65 mt-1.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-[#1C1A26]/15 text-[#1C1A26]/70">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/work/${project.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="btn-violet"
                >
                  Read full case study →
                </Link>
                <button onClick={() => onOpenChange(false)} className="btn-coral-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
