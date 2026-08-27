import { Frame, type VisualProps } from "./shared";

// Real-time analytics API — an event stream flowing through pipeline nodes into a throughput chart.
export default function DataPulse({ className }: VisualProps) {
  return (
    <div className={className}>
      <Frame label="DataPulse real-time analytics pipeline">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          stream / 80k events per min
        </text>
        {/* incoming event dots */}
        {[86, 104, 122, 140, 158].map((y, i) => (
          <circle key={i} cx={40 + (i % 2) * 10} cy={y} r="4" fill="#FFB830" opacity={0.5 + (i % 3) * 0.2} />
        ))}
        {/* pipeline nodes */}
        <g>
          <rect x="70" y="92" width="70" height="42" rx="10" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.3)" />
          <text x="105" y="117" fontSize="11" fontFamily="monospace" fill="#ffffff" textAnchor="middle">Kafka</text>
          <path d="M144 113 h 26" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="2 5" />
          <rect x="172" y="92" width="82" height="42" rx="10" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.3)" />
          <text x="213" y="117" fontSize="11" fontFamily="monospace" fill="#ffffff" textAnchor="middle">ClickHouse</text>
        </g>
        {/* API bracket */}
        <text x="296" y="120" fontSize="30" fontFamily="monospace" fill="#B8F2C8">{"{ }"}</text>
        <text x="286" y="140" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.7)">REST API</text>
        {/* throughput chart */}
        <rect x="70" y="158" width="284" height="86" rx="12" fill="rgba(28,26,38,0.28)" stroke="rgba(255,255,255,0.2)" />
        <path d="M84 232 L124 224 L160 214 L196 200 L232 176 L268 168 L304 150 L340 146" fill="none" stroke="#B8F2C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M84 232 L124 224 L160 214 L196 200 L232 176 L268 168 L304 150 L340 146 L340 244 L84 244 Z" fill="#B8F2C8" opacity="0.14" />
        <text x="316" y="182" fontSize="14" fontFamily="sans-serif" fontWeight="700" fill="#ffffff">180ms</text>
      </Frame>
    </div>
  );
}
