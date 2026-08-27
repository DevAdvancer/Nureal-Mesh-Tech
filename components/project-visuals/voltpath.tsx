import { Frame, type VisualProps } from "./shared";

// Climate & energy — solar array under a sun, with a live production curve and battery state.
export default function VoltPath({ className }: VisualProps) {
  return (
    <div className={className}>
      <Frame label="VoltPath solar fleet monitoring">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          fleet / 4,000 sites live
        </text>
        {/* sun */}
        <circle cx="316" cy="86" r="20" fill="#FFB830" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={316 + Math.cos(r) * 26}
              y1={86 + Math.sin(r) * 26}
              x2={316 + Math.cos(r) * 34}
              y2={86 + Math.sin(r) * 34}
              stroke="#FFB830"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        {/* solar panels (tilted) */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${40 + i * 86}, 150)`}>
            <path d="M0 46 L54 46 L70 0 L16 0 Z" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.4)" />
            <line x1="19" y1="12" x2="61" y2="12" stroke="rgba(255,255,255,0.35)" />
            <line x1="14" y1="26" x2="58" y2="26" stroke="rgba(255,255,255,0.35)" />
            <line x1="34" y1="0" x2="27" y2="46" stroke="rgba(255,255,255,0.3)" />
            <line x1="52" y1="0" x2="43" y2="46" stroke="rgba(255,255,255,0.3)" />
            {/* pole */}
            <rect x="30" y="46" width="4" height="18" fill="rgba(255,255,255,0.35)" />
          </g>
        ))}
        {/* production curve panel */}
        <rect x="30" y="220" width="240" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
        <path d="M40 214 L80 206 L120 210 L160 196 L200 190 L240 178 L262 182" fill="none" stroke="#B8F2C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* battery */}
        <rect x="292" y="196" width="80" height="40" rx="8" fill="rgba(28,26,38,0.3)" stroke="rgba(255,255,255,0.3)" />
        <rect x="372" y="208" width="6" height="16" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="298" y="202" width="46" height="28" rx="4" fill="#B8F2C8" />
        <text x="332" y="222" fontSize="12" fontFamily="sans-serif" fontWeight="700" fill="#ffffff" textAnchor="middle">78%</text>
      </Frame>
    </div>
  );
}
