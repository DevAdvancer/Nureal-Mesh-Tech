import { Frame, type VisualProps } from "./shared";

// AI document intelligence — a source document with extracted fields and confidence scores.
export default function ParseFlow({ className }: VisualProps) {
  const lines = [96, 110, 124, 138, 152, 166, 180, 194];
  const fields = [
    { y: 104, w: 46, conf: 62, good: true },
    { y: 138, w: 40, conf: 56, good: true },
    { y: 172, w: 44, conf: 30, good: false },
  ];
  return (
    <div className={className}>
      <Frame label="ParseFlow document intelligence workspace">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          extract / review queue
        </text>
        {/* document */}
        <rect x="28" y="72" width="150" height="176" rx="8" fill="rgba(255,255,255,0.9)" />
        {lines.map((y, i) => (
          <rect key={i} x="44" y={y} width={i % 3 === 0 ? 118 : 96} height="6" rx="3" fill="rgba(28,26,38,0.18)" />
        ))}
        {/* highlighted source fields */}
        {fields.map((f, i) => (
          <rect key={i} x="44" y={f.y - 2} width="70" height="12" rx="3" fill={f.good ? "rgba(184,242,200,0.7)" : "rgba(255,77,109,0.5)"} />
        ))}
        {/* extraction panel */}
        <rect x="200" y="72" width="176" height="176" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.24)" />
        {fields.map((f, i) => {
          const y = 96 + i * 46;
          return (
            <g key={i}>
              {/* connector from document to field */}
              <path d={`M114 ${f.y + 4} C 160 ${f.y + 4}, 170 ${y}, 216 ${y}`} fill="none" stroke={f.good ? "#B8F2C8" : "#FF4D6D"} strokeWidth="1.5" strokeDasharray="2 3" />
              <rect x="216" y={y - 12} width="90" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
              {/* confidence bar */}
              <rect x="216" y={y + 2} width="120" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
              <rect x="216" y={y + 2} width={f.conf * 1.9} height="6" rx="3" fill={f.good ? "#B8F2C8" : "#FF4D6D"} />
              <text x="344" y={y + 8} fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
                {f.conf + 37}%
              </text>
            </g>
          );
        })}
        {/* neural node cluster */}
        <g opacity="0.9">
          {[[220, 224], [252, 210], [252, 238], [286, 224]].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="#7B2FFF" />
          ))}
          <path d="M220 224 L252 210 M220 224 L252 238 M252 210 L286 224 M252 238 L286 224" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        </g>
        <text x="326" y="228" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.75)">model</text>
      </Frame>
    </div>
  );
}
