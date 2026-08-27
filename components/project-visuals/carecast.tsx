import { Frame, type VisualProps } from "./shared";

// Healthtech scheduling — a weekly calendar with appointment blocks and a telehealth tile.
export default function CareCast({ className }: VisualProps) {
  const cols = [28, 76, 124, 172, 220];
  const appts = [
    { c: 0, y: 108, h: 22, fill: "#B8F2C8" },
    { c: 1, y: 132, h: 30, fill: "rgba(255,255,255,0.6)" },
    { c: 2, y: 100, h: 26, fill: "#FFB830" },
    { c: 3, y: 150, h: 22, fill: "#B8F2C8" },
    { c: 4, y: 116, h: 34, fill: "rgba(255,255,255,0.6)" },
    { c: 1, y: 178, h: 20, fill: "#FF4D6D" },
    { c: 3, y: 184, h: 24, fill: "rgba(255,255,255,0.6)" },
  ];
  return (
    <div className={className}>
      <Frame label="CareCast clinic scheduling and telehealth">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          schedule / this week
        </text>
        {/* calendar panel */}
        <rect x="20" y="72" width="256" height="176" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.24)" />
        {cols.map((x, i) => (
          <rect key={i} x={x + 8} y="82" width="34" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
        ))}
        {appts.map((a, i) => (
          <rect key={i} x={cols[a.c] + 8} y={a.y} width="34" height={a.h} rx="5" fill={a.fill} />
        ))}
        {/* telehealth tile */}
        <rect x="292" y="72" width="88" height="80" rx="12" fill="rgba(28,26,38,0.32)" stroke="rgba(255,255,255,0.22)" />
        <circle cx="336" cy="100" r="9" fill="rgba(255,255,255,0.85)" />
        <path d="M320 128 q16 -18 32 0 z" fill="rgba(255,255,255,0.85)" />
        <circle cx="366" cy="80" r="5" fill="#FF4D6D" />
        <text x="336" y="145" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.8)" textAnchor="middle">live visit</text>
        {/* patient card */}
        <rect x="292" y="164" width="88" height="84" rx="12" fill="rgba(255,255,255,0.9)" />
        <circle cx="312" cy="188" r="12" fill="#B8F2C8" />
        <rect x="330" y="182" width="40" height="6" rx="3" fill="rgba(28,26,38,0.55)" />
        <rect x="330" y="194" width="28" height="5" rx="2.5" fill="rgba(28,26,38,0.3)" />
        <rect x="304" y="214" width="64" height="6" rx="3" fill="rgba(28,26,38,0.18)" />
        <rect x="304" y="228" width="48" height="6" rx="3" fill="rgba(28,26,38,0.18)" />
      </Frame>
    </div>
  );
}
