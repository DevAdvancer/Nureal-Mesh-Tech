import { Frame, type VisualProps } from "./shared";

// Proptech field app — a phone showing a listing, comp-map pins and a rising valuation trend.
export default function Keystone({ className }: VisualProps) {
  return (
    <div className={className}>
      <Frame label="Keystone real-estate agent app">
        {/* phone body */}
        <rect x="130" y="40" width="140" height="224" rx="22" fill="rgba(28,26,38,0.35)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <rect x="176" y="50" width="48" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
        {/* property hero with house glyph */}
        <rect x="142" y="64" width="116" height="72" rx="10" fill="rgba(255,255,255,0.16)" />
        <path d="M172 116 L172 96 L200 78 L228 96 L228 116 Z" fill="rgba(255,255,255,0.85)" />
        <rect x="192" y="100" width="16" height="16" fill="rgba(28,26,38,0.5)" />
        {/* price tag */}
        <rect x="150" y="120" width="60" height="20" rx="10" fill="#B8F2C8" />
        <text x="180" y="134" fontSize="11" fontFamily="sans-serif" fontWeight="700" fill="#1C1A26" textAnchor="middle">$540k</text>
        {/* comp map with pins */}
        <rect x="142" y="146" width="116" height="58" rx="10" fill="rgba(255,255,255,0.12)" />
        {[[164, 168], [196, 182], [228, 162], [212, 196], [176, 194]].map((p, i) => (
          <g key={i}>
            <path d={`M${p[0]} ${p[1] - 8} c 6 0 10 5 10 10 c 0 7 -10 14 -10 14 c 0 0 -10 -7 -10 -14 c 0 -5 4 -10 10 -10 z`} fill={i === 0 ? "#FF4D6D" : "rgba(255,255,255,0.6)"} />
            <circle cx={p[0]} cy={p[1] + 2} r="3" fill="#1C1A26" opacity={i === 0 ? 1 : 0.4} />
          </g>
        ))}
        {/* valuation trend */}
        <rect x="142" y="214" width="116" height="40" rx="10" fill="rgba(255,255,255,0.9)" />
        <path d="M152 244 L172 240 L192 234 L212 230 L232 222 L250 220" fill="none" stroke="#7B2FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="250" cy="220" r="3" fill="#7B2FFF" />
        <text x="152" y="230" fontSize="8" fontFamily="monospace" fill="rgba(28,26,38,0.55)">valuation</text>
        {/* offer badge */}
        <rect x="286" y="150" width="70" height="30" rx="15" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.3)" />
        <path d="M300 165 l4 4 l8 -9" fill="none" stroke="#B8F2C8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="322" y="169" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.85)">offer</text>
      </Frame>
    </div>
  );
}
