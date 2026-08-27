import type { ReactNode } from "react";

/**
 * Reusable, hand-authored "screen" scenes for the case-study gallery tiles.
 * Same language as the per-project hero visuals: translucent-white structure
 * with a few brand-color accents, drawn straight onto the tile's gradient.
 * Each gallery item picks one by `kind`; scenes are pure (safe in RSC).
 */

const SAGE = "#B8F2C8";
const CORAL = "#FF4D6D";
const AMBER = "#FFB830";
const VIOLET = "#7B2FFF";
const INK = "#1C1A26";

const P = "rgba(255,255,255,0.12)"; // panel
const PS = "rgba(255,255,255,0.25)"; // panel stroke
const BAR = "rgba(255,255,255,0.55)"; // primary bar/text
const DIM = "rgba(255,255,255,0.28)"; // secondary
const DARK = "rgba(28,26,38,0.3)"; // dark inset
const GRID = "rgba(255,255,255,0.11)";
const MONO = "monospace";
const SANS = "sans-serif";

function GFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x="138" y="30" width="124" height="240" rx="22" fill="rgba(28,26,38,0.34)" stroke={PS} strokeWidth="1.5" />
      <rect x="180" y="41" width="40" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
      {children}
    </g>
  );
}

// A teardrop map pin at (x, y-ish) with its point at (x, y).
function Pin({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g>
      <path
        d={`M${x} ${y - 20} c7 0 11 5 11 11 c0 8 -11 18 -11 18 c0 0 -11 -10 -11 -18 c0 -6 4 -11 11 -11 z`}
        fill={fill}
      />
      <circle cx={x} cy={y - 9} r="4" fill={INK} opacity="0.5" />
    </g>
  );
}

const SCENES = {
  // Kanban / status board — three columns of cards with uneven heights.
  board: () => (
    <>
      {[28, 150, 272].map((x, c) => (
        <g key={c}>
          <rect x={x} y="48" width="100" height="206" rx="10" fill={P} stroke={PS} />
          <circle cx={x + 16} cy="66" r="4" fill={[SAGE, AMBER, CORAL][c]} />
          <rect x={x + 26} y="62" width="46" height="7" rx="3.5" fill={BAR} />
          {[84, 128, 172, 216].map((y, i) =>
            (i + c) % 4 === 3 ? null : (
              <g key={i}>
                <rect x={x + 12} y={y} width="76" height="32" rx="7" fill="rgba(255,255,255,0.16)" />
                <rect x={x + 20} y={y + 9} width="48" height="6" rx="3" fill={BAR} />
                <rect x={x + 20} y={y + 20} width="30" height="5" rx="2.5" fill={DIM} />
              </g>
            )
          )}
        </g>
      ))}
    </>
  ),

  // Triage / exceptions queue — flagged rows with status pills.
  queue: () => (
    <>
      <rect x="36" y="46" width="328" height="208" rx="12" fill={P} stroke={PS} />
      <rect x="52" y="62" width="86" height="8" rx="4" fill={BAR} />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 100 + i * 32;
        const c = [CORAL, AMBER, SAGE, CORAL, SAGE][i];
        return (
          <g key={i}>
            <rect x="52" y={y - 8} width="6" height="18" rx="3" fill={c} />
            <circle cx="76" cy={y} r="7" fill="rgba(255,255,255,0.2)" />
            <rect x="92" y={y - 9} width={150 - i * 12} height="8" rx="4" fill={BAR} />
            <rect x="92" y={y + 3} width={92 - i * 8} height="6" rx="3" fill={DIM} />
            <rect x="286" y={y - 8} width="62" height="16" rx="8" fill="rgba(255,255,255,0.14)" stroke={c} />
            <circle cx="299" cy={y} r="3" fill={c} />
            <rect x="308" y={y - 2} width="30" height="5" rx="2.5" fill={c} />
          </g>
        );
      })}
    </>
  ),

  // Bar report — grouped bars with one highlighted column.
  barReport: () => (
    <>
      <rect x="36" y="44" width="328" height="212" rx="12" fill={P} stroke={PS} />
      <rect x="54" y="62" width="76" height="8" rx="4" fill={BAR} />
      <rect x="300" y="58" width="48" height="14" rx="7" fill="rgba(255,255,255,0.16)" />
      {[60, 120, 180].map((v) => (
        <line key={v} x1="54" y1={230 - v} x2="346" y2={230 - v} stroke={GRID} />
      ))}
      {[70, 110, 86, 140, 116, 168, 132].map((h, i) => (
        <rect key={i} x={60 + i * 42} y={230 - h} width="26" height={h} rx="5" fill={i === 5 ? "#fff" : "rgba(255,255,255,0.42)"} />
      ))}
      <line x1="54" y1="230" x2="346" y2="230" stroke="rgba(255,255,255,0.3)" />
    </>
  ),

  // Area / line chart — trend rising to the right.
  areaChart: () => (
    <>
      <rect x="36" y="44" width="328" height="212" rx="12" fill={P} stroke={PS} />
      <rect x="54" y="62" width="70" height="8" rx="4" fill={BAR} />
      {[110, 160, 210].map((y) => (
        <line key={y} x1="54" y1={y} x2="346" y2={y} stroke={GRID} />
      ))}
      <path d="M54 206 L102 190 L150 200 L198 158 L246 172 L294 120 L346 100 L346 236 L54 236 Z" fill="rgba(255,255,255,0.18)" />
      <path d="M54 206 L102 190 L150 200 L198 158 L246 172 L294 120 L346 100" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[[54, 206], [150, 200], [246, 172], [346, 100]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#fff" />
      ))}
    </>
  ),

  // Mobile map with a route line and destination pin.
  mobileMap: () => (
    <Phone>
      <rect x="150" y="54" width="100" height="150" rx="8" fill="rgba(255,255,255,0.12)" />
      <path d="M150 118 H250 M196 54 V204 M150 168 L250 150" stroke="rgba(255,255,255,0.18)" strokeWidth="3" fill="none" />
      <path d="M166 190 L182 152 L210 140 L226 98 L240 74" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="166" cy="190" r="5" fill="#fff" />
      <Pin x={240} y={82} fill={CORAL} />
      <rect x="150" y="214" width="100" height="44" rx="8" fill="rgba(255,255,255,0.92)" />
      <text x="160" y="231" fontSize="9" fontFamily={MONO} fill="rgba(28,26,38,0.55)">ETA</text>
      <text x="160" y="250" fontSize="16" fontFamily={SANS} fontWeight="700" fill={INK}>12 min</text>
    </Phone>
  ),

  // Property comp map — neighbourhood grid with listing pins and a comps card.
  propertyMap: () => (
    <Phone>
      <rect x="150" y="54" width="100" height="150" rx="8" fill="rgba(255,255,255,0.12)" />
      <path d="M150 104 H250 M150 154 H250 M184 54 V204 M218 54 V204" stroke="rgba(255,255,255,0.16)" strokeWidth="2.5" fill="none" />
      <Pin x={176} y={102} fill={SAGE} />
      <Pin x={232} y={134} fill={AMBER} />
      <Pin x={198} y={184} fill={CORAL} />
      <rect x="150" y="214" width="100" height="44" rx="8" fill="rgba(255,255,255,0.92)" />
      <text x="160" y="231" fontSize="8.5" fontFamily={MONO} fill="rgba(28,26,38,0.55)">3 COMPS NEARBY</text>
      <text x="160" y="250" fontSize="15" fontFamily={SANS} fontWeight="700" fill={INK}>$598k avg</text>
    </Phone>
  ),

  // Signature / e-sign capture on a mobile document.
  signature: () => (
    <Phone>
      <rect x="150" y="56" width="100" height="116" rx="8" fill="rgba(255,255,255,0.92)" />
      {[70, 82, 94].map((y, i) => (
        <rect key={i} x="160" y={y} width={i === 2 ? 50 : 80} height="5" rx="2.5" fill="rgba(28,26,38,0.25)" />
      ))}
      <text x="160" y="122" fontSize="8" fontFamily={MONO} fill="rgba(28,26,38,0.4)">SIGN HERE</text>
      <path d="M162 150 c10 -16 18 6 26 -4 c6 -6 12 8 20 0 c5 -5 13 3 20 -5" fill="none" stroke={VIOLET} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="160" y1="160" x2="240" y2="160" stroke="rgba(28,26,38,0.3)" />
      <rect x="150" y="186" width="100" height="34" rx="17" fill={SAGE} />
      <path d="M186 203 l6 6 l11 -12" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="212" y="208" fontSize="10" fontFamily={SANS} fontWeight="700" fill={INK}>Signed</text>
    </Phone>
  ),

  // Mobile day summary — big metric, ring, mini bars, rows.
  mobileStats: () => (
    <Phone>
      <text x="150" y="72" fontSize="9" fontFamily={MONO} fill="rgba(255,255,255,0.7)">TODAY</text>
      <text x="150" y="102" fontSize="30" fontFamily={SANS} fontWeight="700" fill="#fff">47</text>
      <text x="196" y="102" fontSize="11" fontFamily={SANS} fill="rgba(255,255,255,0.7)">stops</text>
      <circle cx="228" cy="84" r="19" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
      <path d="M228 65 a19 19 0 1 1 -13 33" fill="none" stroke={SAGE} strokeWidth="5" strokeLinecap="round" />
      {[24, 40, 30, 52, 44, 60, 36].map((h, i) => (
        <rect key={i} x={152 + i * 14} y={172 - h} width="9" height={h} rx="3" fill="rgba(255,255,255,0.5)" />
      ))}
      <line x1="150" y1="174" x2="250" y2="174" stroke="rgba(255,255,255,0.25)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="150" y={188 + i * 22} width="100" height="16" rx="5" fill="rgba(255,255,255,0.14)" />
          <rect x="158" y={193 + i * 22} width="50" height="6" rx="3" fill={BAR} />
          <rect x="224" y={193 + i * 22} width="18" height="6" rx="3" fill={SAGE} />
        </g>
      ))}
    </Phone>
  ),

  // Data pipeline — nodes wired left to right with a branch.
  pipeline: () => (
    <>
      <path d="M124 150 H154 M240 150 H272 M272 150 V114 H298 M272 150 V186 H298" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" fill="none" />
      <path d="M158 150 l-9 -5 l0 10 z" fill="rgba(255,255,255,0.6)" />
      <path d="M298 114 l-9 -5 l0 10 z" fill="rgba(255,255,255,0.6)" />
      <path d="M298 186 l-9 -5 l0 10 z" fill="rgba(255,255,255,0.6)" />
      {[
        { x: 44, y: 120, w: 80, h: 60, dot: SAGE, big: true },
        { x: 160, y: 120, w: 80, h: 60, dot: AMBER, big: true },
        { x: 300, y: 90, w: 80, h: 48, dot: CORAL, big: false },
        { x: 300, y: 162, w: 80, h: 48, dot: SAGE, big: false },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="12" fill={P} stroke={PS} />
          <circle cx={n.x + 16} cy={n.y + 16} r="4" fill={n.dot} />
          <rect x={n.x + 26} y={n.y + 12} width={n.w - 40} height="7" rx="3.5" fill={BAR} />
          <rect x={n.x + 14} y={n.y + 28} width={n.w - 28} height="6" rx="3" fill={DIM} />
          {n.big && <rect x={n.x + 14} y={n.y + 42} width={n.w - 44} height="6" rx="3" fill={DIM} />}
        </g>
      ))}
    </>
  ),

  // API reference docs — nav, endpoint rows with method badges, code block.
  docs: () => (
    <>
      <rect x="36" y="44" width="328" height="212" rx="12" fill={P} stroke={PS} />
      <line x1="150" y1="44" x2="150" y2="256" stroke="rgba(255,255,255,0.2)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="52" y={70 + i * 30} width={78 - i * 6} height="8" rx="4" fill={i === 1 ? "#fff" : DIM} />
      ))}
      {([["GET", SAGE, 120], ["POST", AMBER, 90], ["GET", SAGE, 140]] as const).map(([m, c, w], i) => {
        const y = 74 + i * 30;
        return (
          <g key={i}>
            <rect x="170" y={y - 10} width="34" height="15" rx="4" fill={c} />
            <text x="187" y={y + 1} fontSize="8" fontFamily={MONO} fontWeight="700" fill={INK} textAnchor="middle">{m}</text>
            <rect x="212" y={y - 7} width={w} height="9" rx="4" fill={BAR} />
          </g>
        );
      })}
      <rect x="170" y="166" width="176" height="78" rx="8" fill={DARK} />
      {[[120, VIOLET], [90, null], [140, null], [70, SAGE]].map((r, i) => (
        <rect key={i} x="184" y={182 + i * 16} width={r[0] as number} height="6" rx="3" fill={(r[1] as string) ?? "rgba(255,255,255,0.35)"} />
      ))}
    </>
  ),

  // Onboarding wizard — stepper with an active step and a form card.
  steps: () => (
    <>
      {[0, 1, 2, 3].map((i) => {
        const x = 88 + i * 76;
        const done = i === 0;
        const active = i <= 1;
        return (
          <g key={i}>
            {i < 3 && <line x1={x + 15} y1="76" x2={x + 61} y2="76" stroke={i === 0 ? "#fff" : "rgba(255,255,255,0.25)"} strokeWidth="2.5" />}
            <circle cx={x} cy="76" r="15" fill={active ? "#fff" : "rgba(255,255,255,0.16)"} stroke={PS} />
            {done ? (
              <path d={`M${x - 6} 76 l4 4 l8 -9`} fill="none" stroke={SAGE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <text x={x} y="80" fontSize="13" fontFamily={SANS} fontWeight="700" fill={active ? INK : "rgba(255,255,255,0.7)"} textAnchor="middle">{i + 1}</text>
            )}
          </g>
        );
      })}
      <rect x="90" y="116" width="220" height="128" rx="12" fill={P} stroke={PS} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="110" y={136 + i * 32} width="60" height="7" rx="3.5" fill={BAR} />
          <rect x="110" y={148 + i * 32} width="180" height="14" rx="4" fill="rgba(255,255,255,0.14)" stroke={PS} />
        </g>
      ))}
      <rect x="236" y="216" width="54" height="18" rx="9" fill="#fff" />
    </>
  ),

  // App workspace / admin console — sidebar, stat cards, chart widget.
  dashboard: () => (
    <>
      <rect x="36" y="44" width="328" height="212" rx="12" fill={P} stroke={PS} />
      <path d="M46 44 h60 v212 h-60 a10 10 0 0 1 -10 -10 v-192 a10 10 0 0 1 10 -10 z" fill={DARK} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="52" y={72 + i * 28} width={i === 0 ? 40 : 32} height="8" rx="4" fill={i === 0 ? "#fff" : DIM} />
      ))}
      <rect x="120" y="60" width="90" height="10" rx="5" fill={BAR} />
      <circle cx="344" cy="66" r="9" fill="rgba(255,255,255,0.2)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={120 + i * 78} y="86" width="70" height="46" rx="8" fill="rgba(255,255,255,0.14)" />
          <rect x={130 + i * 78} y="98" width="30" height="12" rx="3" fill="#fff" />
          <rect x={130 + i * 78} y="116" width="44" height="6" rx="3" fill={DIM} />
        </g>
      ))}
      <rect x="120" y="144" width="226" height="98" rx="8" fill="rgba(255,255,255,0.1)" />
      <path d="M134 222 L166 202 L198 212 L230 178 L262 190 L294 156 L332 168" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // Billing / pricing — three plan cards with the middle one featured.
  billing: () => (
    <>
      {[0, 1, 2].map((i) => {
        const x = 48 + i * 106;
        const hot = i === 1;
        const top = hot ? 60 : 74;
        const price = [9, 29, 99][i];
        return (
          <g key={i}>
            <rect x={x} y={top} width="92" height={hot ? 180 : 152} rx="12" fill={hot ? "rgba(255,255,255,0.22)" : P} stroke={hot ? "#fff" : PS} strokeWidth={hot ? 1.5 : 1} />
            <rect x={x + 16} y={top + 18} width="40" height="7" rx="3.5" fill={BAR} />
            <text x={x + 16} y={top + 54} fontSize="20" fontFamily={SANS} fontWeight="700" fill="#fff">${price}</text>
            {[0, 1, 2, 3].map((k) => (
              <g key={k}>
                <circle cx={x + 20} cy={top + 80 + k * 20} r="4" fill={SAGE} />
                <rect x={x + 30} y={top + 76 + k * 20} width="46" height="6" rx="3" fill={DIM} />
              </g>
            ))}
            <rect x={x + 14} y={top + (hot ? 162 : 134)} width="64" height="16" rx="8" fill={hot ? "#fff" : "rgba(255,255,255,0.2)"} />
          </g>
        );
      })}
    </>
  ),

  // Parity/test dashboard — pass-rate ring plus pass/fail rows.
  checks: () => (
    <>
      <circle cx="96" cy="150" r="46" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
      <path d="M96 104 a46 46 0 1 1 -33 80" fill="none" stroke={SAGE} strokeWidth="9" strokeLinecap="round" />
      <text x="96" y="146" fontSize="22" fontFamily={SANS} fontWeight="700" fill="#fff" textAnchor="middle">98%</text>
      <text x="96" y="164" fontSize="9" fontFamily={MONO} fill="rgba(255,255,255,0.7)" textAnchor="middle">parity</text>
      {[SAGE, SAGE, CORAL, SAGE, SAGE].map((c, i) => {
        const y = 76 + i * 36;
        const pass = c === SAGE;
        return (
          <g key={i}>
            <rect x="176" y={y} width="176" height="26" rx="7" fill="rgba(255,255,255,0.12)" />
            <circle cx="192" cy={y + 13} r="8" fill={pass ? "rgba(184,242,200,0.3)" : "rgba(255,77,109,0.3)"} />
            {pass ? (
              <path d={`M188 ${y + 13} l3 3 l6 -7`} fill="none" stroke={SAGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M189 ${y + 9} l7 8 M196 ${y + 9} l-7 8`} stroke={CORAL} strokeWidth="2" strokeLinecap="round" />
            )}
            <rect x="210" y={y + 9} width={112 - i * 6} height="7" rx="3.5" fill={BAR} />
          </g>
        );
      })}
    </>
  ),

  // Reconciliation match — two columns joined by match lines and a check badge.
  matchFlow: () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="44" y={72 + i * 44} width="96" height="30" rx="7" fill={P} stroke={PS} />
          <circle cx="58" cy={87 + i * 44} r="4" fill={SAGE} />
          <rect x="70" y={83 + i * 44} width="56" height="7" rx="3.5" fill={BAR} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="260" y={72 + i * 44} width="96" height="30" rx="7" fill={P} stroke={PS} />
          <circle cx="274" cy={87 + i * 44} r="4" fill={AMBER} />
          <rect x="286" y={83 + i * 44} width="56" height="7" rx="3.5" fill={BAR} />
        </g>
      ))}
      {([[0, 0], [1, 1], [2, 3], [3, 2]] as const).map(([l, r], i) => {
        const y1 = 87 + l * 44;
        const y2 = 87 + r * 44;
        const bad = i === 2;
        return (
          <path key={i} d={`M140 ${y1} C190 ${y1}, 210 ${y2}, 260 ${y2}`} fill="none" stroke={bad ? CORAL : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeDasharray={bad ? "4 3" : undefined} />
        );
      })}
      <circle cx="200" cy="150" r="22" fill="rgba(255,255,255,0.92)" />
      <path d="M190 150 l6 7 l14 -16" fill="none" stroke={VIOLET} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // Schedule board — week header, grid, coloured event blocks.
  calendar: () => (
    <>
      <rect x="36" y="44" width="328" height="212" rx="12" fill={P} stroke={PS} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={64 + i * 60} y="58" width="30" height="7" rx="3.5" fill={i === 2 ? "#fff" : DIM} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="52" y1={88 + i * 40} x2="348" y2={88 + i * 40} stroke={GRID} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={52 + i * 60} y1="80" x2={52 + i * 60} y2="244" stroke="rgba(255,255,255,0.09)" />
      ))}
      <rect x="56" y="94" width="50" height="32" rx="5" fill={SAGE} opacity="0.8" />
      <rect x="176" y="128" width="50" height="48" rx="5" fill="rgba(255,255,255,0.85)" />
      <rect x="236" y="100" width="50" height="34" rx="5" fill={AMBER} opacity="0.8" />
      <rect x="116" y="182" width="50" height="42" rx="5" fill={CORAL} opacity="0.75" />
      <rect x="296" y="150" width="46" height="62" rx="5" fill="rgba(255,255,255,0.5)" />
    </>
  ),

  // Intake form — labelled fields and a submit button.
  form: () => (
    <>
      <rect x="90" y="44" width="220" height="212" rx="12" fill={P} stroke={PS} />
      <rect x="110" y="62" width="90" height="10" rx="5" fill="#fff" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="110" y={92 + i * 34} width="54" height="7" rx="3.5" fill={BAR} />
          <rect x="110" y={104 + i * 34} width="180" height="15" rx="5" fill="rgba(255,255,255,0.14)" stroke={PS} />
        </g>
      ))}
      <rect x="196" y="230" width="94" height="18" rx="9" fill="#fff" />
    </>
  ),

  // Telehealth room — video tile with a self-view and call controls.
  video: () => (
    <>
      <rect x="60" y="54" width="220" height="152" rx="12" fill={DARK} stroke={PS} />
      <circle cx="170" cy="118" r="26" fill="rgba(255,255,255,0.85)" />
      <path d="M132 176 c0 -26 76 -26 76 0 Z" fill="rgba(255,255,255,0.85)" />
      <rect x="212" y="150" width="60" height="48" rx="8" fill="rgba(28,26,38,0.55)" stroke={PS} />
      <circle cx="242" cy="170" r="9" fill="rgba(255,255,255,0.7)" />
      <path d="M229 192 c0 -12 26 -12 26 0 Z" fill="rgba(255,255,255,0.7)" />
      <circle cx="78" cy="72" r="5" fill={CORAL} />
      <rect x="88" y="68" width="30" height="7" rx="3.5" fill={BAR} />
      <rect x="120" y="222" width="100" height="26" rx="13" fill="rgba(255,255,255,0.16)" />
      <circle cx="140" cy="235" r="7" fill="rgba(255,255,255,0.7)" />
      <circle cx="170" cy="235" r="7" fill={CORAL} />
      <circle cx="200" cy="235" r="7" fill="rgba(255,255,255,0.7)" />
    </>
  ),

  // Desktop fleet map — road mesh, route, pins and a side list.
  map: () => (
    <>
      <rect x="36" y="44" width="230" height="212" rx="12" fill="rgba(255,255,255,0.1)" stroke={PS} />
      <path d="M36 120 H266 M120 44 V256 M60 202 L266 150 M198 44 L150 256" stroke="rgba(255,255,255,0.16)" strokeWidth="3" fill="none" />
      <path d="M70 220 L110 172 L150 150 L200 102 L236 78" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Pin x={110} y={180} fill={SAGE} />
      <Pin x={200} y={110} fill={AMBER} />
      <Pin x={236} y={86} fill={CORAL} />
      <rect x="278" y="44" width="86" height="212" rx="12" fill={P} stroke={PS} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="294" cy={74 + i * 42} r="5" fill={[SAGE, AMBER, CORAL, SAGE][i]} />
          <rect x="306" y={66 + i * 42} width="46" height="7" rx="3.5" fill={BAR} />
          <rect x="306" y={78 + i * 42} width="30" height="5" rx="2.5" fill={DIM} />
        </g>
      ))}
    </>
  ),

  // Site energy detail — output gauge, production curve, stat tiles.
  energy: () => (
    <>
      <path d="M60 170 A56 56 0 0 1 172 170" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="12" strokeLinecap="round" />
      <path d="M60 170 A56 56 0 0 1 163 140" fill="none" stroke={SAGE} strokeWidth="12" strokeLinecap="round" />
      <text x="116" y="160" fontSize="24" fontFamily={SANS} fontWeight="700" fill="#fff" textAnchor="middle">82%</text>
      <text x="116" y="180" fontSize="9" fontFamily={MONO} fill="rgba(255,255,255,0.7)" textAnchor="middle">output</text>
      <rect x="196" y="56" width="160" height="122" rx="10" fill={P} stroke={PS} />
      <path d="M210 150 Q240 92 270 120 T330 98 L344 108 L344 166 L210 166 Z" fill="rgba(255,255,255,0.18)" />
      <path d="M210 150 Q240 92 270 120 T330 98 L344 108" fill="none" stroke="#fff" strokeWidth="2.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={44 + i * 108} y="200" width="96" height="44" rx="10" fill="rgba(255,255,255,0.12)" />
          <rect x={56 + i * 108} y="212" width="34" height="12" rx="3" fill="#fff" />
          <rect x={56 + i * 108} y="230" width="60" height="6" rx="3" fill={DIM} />
          <circle cx={124 + i * 108} cy="218" r="8" fill={[SAGE, AMBER, SAGE][i]} opacity="0.6" />
        </g>
      ))}
    </>
  ),

  // Document extraction — page with highlighted fields wired to a values panel.
  docExtract: () => (
    <>
      <rect x="52" y="50" width="150" height="200" rx="10" fill="rgba(255,255,255,0.92)" />
      <rect x="68" y="66" width="80" height="9" rx="4" fill="rgba(28,26,38,0.35)" />
      {[110, 90, 118, 70, 110, 86].map((w, i) => (
        <rect key={i} x="68" y={92 + i * 22} width={w} height="6" rx="3" fill="rgba(28,26,38,0.2)" />
      ))}
      {([[88, CORAL], [136, AMBER], [202, SAGE]] as const).map(([y, c], i) => (
        <rect key={i} x="64" y={y} width={[86, 104, 74][i]} height="16" rx="3" fill="none" stroke={c} strokeWidth="1.5" />
      ))}
      {([[96, CORAL], [144, AMBER], [210, SAGE]] as const).map(([y, c], i) => (
        <path key={i} d={`M202 ${y} H236`} stroke={c} strokeWidth="1.5" strokeDasharray="3 3" />
      ))}
      <rect x="236" y="60" width="116" height="180" rx="10" fill={P} stroke={PS} />
      {([CORAL, AMBER, SAGE] as const).map((c, i) => {
        const y = 84 + i * 52;
        return (
          <g key={i}>
            <circle cx="252" cy={y} r="5" fill={c} />
            <rect x="264" y={y - 5} width="60" height="7" rx="3.5" fill={DIM} />
            <rect x="252" y={y + 12} width="88" height="14" rx="5" fill="rgba(255,255,255,0.16)" />
            <rect x="260" y={y + 17} width={60 - i * 8} height="6" rx="3" fill={BAR} />
          </g>
        );
      })}
    </>
  ),

  // Mobile valuation — gauge, headline price, delta chip, comps.
  valuation: () => (
    <Phone>
      <text x="150" y="72" fontSize="9" fontFamily={MONO} fill="rgba(255,255,255,0.7)">ESTIMATED VALUE</text>
      <path d="M156 150 A44 44 0 0 1 244 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="9" strokeLinecap="round" />
      <path d="M156 150 A44 44 0 0 1 234 122" fill="none" stroke={SAGE} strokeWidth="9" strokeLinecap="round" />
      <text x="200" y="142" fontSize="19" fontFamily={SANS} fontWeight="700" fill="#fff" textAnchor="middle">$612k</text>
      <rect x="168" y="162" width="64" height="20" rx="10" fill="rgba(184,242,200,0.25)" />
      <path d="M180 177 l5 -8 l5 8 z" fill={SAGE} />
      <text x="210" y="177" fontSize="10" fontFamily={MONO} fill="#fff" textAnchor="middle">+4.2%</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="152" y={196 + i * 22} width="96" height="16" rx="5" fill="rgba(255,255,255,0.14)" />
          <rect x="160" y={201 + i * 22} width="44" height="6" rx="3" fill={BAR} />
          <rect x="216" y={201 + i * 22} width="24" height="6" rx="3" fill={SAGE} />
        </g>
      ))}
    </Phone>
  ),
} satisfies Record<string, () => ReactNode>;

export type GalleryKind = keyof typeof SCENES;

export function GalleryVisual({
  kind,
  label,
  className,
  image,
}: {
  kind?: GalleryKind | string;
  label: string;
  className?: string;
  image?: string;
}) {
  const SceneRender = kind && (SCENES as Record<string, () => ReactNode>)[kind];

  if (SceneRender) {
    return (
      <div className={className}>
        <GFrame label={label}>{SceneRender()}</GFrame>
      </div>
    );
  }

  if (image) {
    return <img src={image} alt={label} className={`${className || ""} object-cover w-full h-full`} />;
  }

  const fallbackRender = SCENES.dashboard;
  return (
    <div className={className}>
      <GFrame label={label}>{fallbackRender()}</GFrame>
    </div>
  );
}
