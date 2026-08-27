import { Frame, type VisualProps } from "./shared";

// Legacy modernization — old system routed through a strangler proxy into the new stack.
export default function LegacyBridge({ className }: VisualProps) {
  return (
    <div className={className}>
      <Frame label="LegacyBridge strangler-fig migration">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          migration / routing proxy
        </text>
        {/* old system */}
        <rect x="30" y="96" width="92" height="60" rx="10" fill="rgba(28,26,38,0.35)" stroke="rgba(255,255,255,0.25)" />
        <text x="76" y="122" fontSize="12" fontFamily="monospace" fill="rgba(255,255,255,0.7)" textAnchor="middle">PHP</text>
        <text x="76" y="140" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.45)" textAnchor="middle">legacy</text>
        {/* proxy node */}
        <path d="M200 118 l18 18 l-18 18 l-18 -18 z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" />
        <text x="200" y="140" fontSize="9" fontFamily="monospace" fill="#ffffff" textAnchor="middle">proxy</text>
        {/* new system */}
        <rect x="278" y="96" width="92" height="60" rx="10" fill="rgba(184,242,200,0.28)" stroke="#B8F2C8" />
        <text x="324" y="122" fontSize="12" fontFamily="monospace" fill="#ffffff" textAnchor="middle">Node</text>
        <text x="324" y="140" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.6)" textAnchor="middle">new</text>
        {/* connectors */}
        <path d="M122 130 H 178" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="2 5" />
        <path d="M222 130 H 278" stroke="#B8F2C8" strokeWidth="2.5" />
        {/* parity checklist */}
        <rect x="60" y="184" width="280" height="72" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.22)" />
        <text x="76" y="204" fontSize="10" fontFamily="monospace" fill="rgba(255,255,255,0.75)">
          parity tests
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(76, ${216 + i * 12})`}>
            <circle cx="4" cy="0" r="4" fill="#B8F2C8" />
            <path d="M1.6 0 l1.8 1.8 l3 -3.4" fill="none" stroke="#1C1A26" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="16" y="-3" width={190 - i * 30} height="6" rx="3" fill="rgba(255,255,255,0.4)" />
          </g>
        ))}
        <text x="300" y="230" fontSize="18" fontFamily="sans-serif" fontWeight="700" fill="#ffffff">12k+</text>
      </Frame>
    </div>
  );
}
