import { Frame, type VisualProps } from "./shared";

// Startup MVP — a browser window with an onboarding checklist and a first-revenue badge.
export default function LaunchKit({ className }: VisualProps) {
  const steps = [
    { y: 104, done: true, w: 120 },
    { y: 134, done: true, w: 150 },
    { y: 164, done: true, w: 96 },
    { y: 194, done: false, w: 132 },
  ];
  return (
    <div className={className}>
      <Frame label="LaunchKit startup MVP onboarding">
        {/* browser window */}
        <rect x="24" y="44" width="352" height="204" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
        {/* url bar */}
        <rect x="76" y="16" width="220" height="16" rx="8" fill="rgba(255,255,255,0.2)" />
        {/* checklist */}
        {steps.map((s, i) => (
          <g key={i}>
            <circle cx="60" cy={s.y} r="11" fill={s.done ? "#B8F2C8" : "rgba(255,255,255,0.18)"} stroke={s.done ? "none" : "rgba(255,255,255,0.4)"} />
            {s.done && (
              <path d={`M55 ${s.y} l4 4 l7 -8`} fill="none" stroke="#1C1A26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <rect x="82" y={s.y - 5} width={s.w} height="10" rx="5" fill={s.done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.3)"} />
          </g>
        ))}
        {/* first revenue badge */}
        <circle cx="312" cy="150" r="40" fill="rgba(28,26,38,0.3)" stroke="rgba(255,255,255,0.25)" />
        <text x="312" y="146" fontSize="30" fontFamily="sans-serif" fontWeight="800" fill="#B8F2C8" textAnchor="middle">$</text>
        <text x="312" y="168" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.8)" textAnchor="middle">day 42</text>
        {/* progress bar */}
        <rect x="60" y="222" width="252" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
        <rect x="60" y="222" width="140" height="8" rx="4" fill="#FFB830" />
      </Frame>
    </div>
  );
}
