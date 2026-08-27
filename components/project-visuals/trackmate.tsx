import { Frame, type VisualProps } from "./shared";

// Field courier app — phone with a route map, delivery pins and a proof-of-delivery card.
export default function TrackMate({ className }: VisualProps) {
  return (
    <div className={className}>
      <Frame label="TrackMate delivery driver app">
        {/* phone body */}
        <rect x="146" y="46" width="108" height="212" rx="20" fill="rgba(28,26,38,0.35)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <rect x="184" y="54" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
        {/* map area */}
        <rect x="156" y="68" width="88" height="120" rx="10" fill="rgba(255,255,255,0.14)" />
        {/* route */}
        <path d="M170 176 C 176 140 214 150 200 116 C 190 92 220 84 232 82" fill="none" stroke="#FFB830" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
        <circle cx="170" cy="176" r="6" fill="#B8F2C8" />
        <circle cx="200" cy="116" r="5" fill="rgba(255,255,255,0.7)" />
        {/* destination pin */}
        <path d="M232 70 c 9 0 15 7 15 15 c 0 10 -15 21 -15 21 c 0 0 -15 -11 -15 -21 c 0 -8 6 -15 15 -15 z" fill="#FF4D6D" />
        <circle cx="232" cy="85" r="5" fill="#ffffff" />
        {/* proof-of-delivery card */}
        <rect x="156" y="198" width="88" height="48" rx="10" fill="rgba(255,255,255,0.9)" />
        <circle cx="176" cy="222" r="11" fill="#B8F2C8" />
        <path d="M171 222 l4 4 l7 -8" fill="none" stroke="#1C1A26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="194" y="214" width="40" height="6" rx="3" fill="rgba(28,26,38,0.55)" />
        <rect x="194" y="226" width="28" height="5" rx="2.5" fill="rgba(28,26,38,0.3)" />
        {/* offline badge */}
        <rect x="60" y="120" width="70" height="26" rx="13" fill="rgba(28,26,38,0.4)" stroke="rgba(255,255,255,0.25)" />
        <circle cx="78" cy="133" r="5" fill="#FFB830" />
        <text x="90" y="137" fontSize="10" fontFamily="monospace" fill="rgba(255,255,255,0.85)">
          offline
        </text>
      </Frame>
    </div>
  );
}
