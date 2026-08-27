import { Frame, type VisualProps } from "./shared";

// Fintech reconciliation — two ledgers with match lines and an auto-match donut.
export default function LedgerLink({ className }: VisualProps) {
  const left = [92, 120, 148, 176, 204];
  const right = [100, 128, 156, 184, 212];
  const matches = [0, 1, 2, 4]; // last-but-one is the unmatched exception
  return (
    <div className={className}>
      <Frame label="LedgerLink payment reconciliation engine">
        <text x="76" y="28" fontSize="11" fontFamily="monospace" fill="rgba(255,255,255,0.8)">
          reconcile / 2M per day
        </text>
        {/* left ledger */}
        <rect x="28" y="72" width="96" height="164" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
        {left.map((y, i) => (
          <rect key={i} x="40" y={y - 6} width="72" height="12" rx="4" fill="rgba(255,255,255,0.5)" />
        ))}
        {/* right ledger */}
        <rect x="276" y="72" width="96" height="164" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
        {right.map((y, i) => (
          <rect key={i} x="288" y={y - 6} width="72" height="12" rx="4" fill="rgba(255,255,255,0.5)" />
        ))}
        {/* match lines */}
        {left.map((y, i) => {
          const matched = matches.includes(i);
          return (
            <g key={i}>
              <path
                d={`M124 ${y} C 170 ${y}, 230 ${right[i]}, 276 ${right[i]}`}
                fill="none"
                stroke={matched ? "#B8F2C8" : "#FF4D6D"}
                strokeWidth="2"
                strokeDasharray={matched ? "0" : "3 4"}
              />
            </g>
          );
        })}
        {/* auto-match donut */}
        <circle cx="200" cy="150" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
        <circle
          cx="200"
          cy="150"
          r="30"
          fill="none"
          stroke="#B8F2C8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="187"
          strokeDashoffset="1.1"
          transform="rotate(-90 200 150)"
        />
        <text x="200" y="146" fontSize="15" fontFamily="sans-serif" fontWeight="800" fill="#ffffff" textAnchor="middle">99.4%</text>
        <text x="200" y="162" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.75)" textAnchor="middle">auto-match</text>
      </Frame>
    </div>
  );
}
