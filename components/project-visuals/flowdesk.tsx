import { Frame, type VisualProps } from "./shared";

// Logistics ops dashboard — a live shipment board with status rows and a side gauge.
export default function FlowDesk({ className }: VisualProps) {
  const rows = [
    { y: 96, w: 150, dot: "#B8F2C8" },
    { y: 124, w: 120, dot: "#FFB830" },
    { y: 152, w: 168, dot: "#B8F2C8" },
    { y: 180, w: 104, dot: "#FF4D6D" },
    { y: 208, w: 140, dot: "#B8F2C8" },
  ];
  return (
    <div className={className}>
      <Frame label="FlowDesk logistics dispatch dashboard">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          dispatch / live board
        </text>
        {/* main table panel */}
        <rect x="24" y="72" width="248" height="176" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
        {rows.map((r, i) => (
          <g key={i}>
            <circle cx="44" cy={r.y} r="5" fill={r.dot} />
            <rect x="60" y={r.y - 5} width={r.w} height="10" rx="5" fill="rgba(255,255,255,0.55)" />
            <rect x={60 + r.w + 10} y={r.y - 5} width="30" height="10" rx="5" fill="rgba(255,255,255,0.22)" />
          </g>
        ))}
        {/* side stat panel with mini bar chart */}
        <rect x="288" y="72" width="88" height="176" rx="12" fill="rgba(28,26,38,0.28)" stroke="rgba(255,255,255,0.2)" />
        <text x="304" y="98" fontSize="10" fontFamily="monospace" fill="rgba(255,255,255,0.7)">
          today
        </text>
        <text x="304" y="128" fontSize="26" fontFamily="sans-serif" fontWeight="700" fill="#ffffff">
          9m
        </text>
        {[54, 40, 30, 20, 12].map((h, i) => (
          <rect key={i} x={302 + i * 15} y={228 - h} width="9" height={h} rx="3" fill="#B8F2C8" opacity={0.5 + i * 0.1} />
        ))}
      </Frame>
    </div>
  );
}
