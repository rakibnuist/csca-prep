/**
 * Lightweight, dependency-free concept diagrams. Inline SVG keeps them crisp on
 * every screen and instant to load — no image assets needed.
 */

const W = 320;
const H = 180;

function Frame({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="grid place-items-center bg-paper-deep/40 p-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={caption}
          className="h-auto w-full max-w-[420px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="border-t border-line px-4 py-2 text-[10.5px] text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  );
}

const ink = "#101418";
const soft = "#8a857b";
const line = "#d4d8dd";
const verm = "#d31d3c";
const jade = "#0a7a53";
const gold = "#a9791c";

export function ConceptVisual({ figureKey }: { figureKey?: string }) {
  switch (figureKey) {
    case "venn":
      return (
        <Frame caption="Two overlapping sets: union is everything, intersection is the overlap.">
          <rect x="20" y="30" width="150" height="120" rx="10" fill={soft} opacity="0.08" stroke={line} />
          <rect x="150" y="30" width="150" height="120" rx="10" fill={line} opacity="0.25" stroke={line} />
          <circle cx="125" cy="90" r="52" fill={verm} opacity="0.18" stroke={verm} />
          <circle cx="195" cy="90" r="52" fill={jade} opacity="0.16" stroke={jade} />
          <text x="95" y="86" fontSize="11" fill={ink} textAnchor="middle">A</text>
          <text x="225" y="86" fontSize="11" fill={ink} textAnchor="middle">B</text>
          <text x="160" y="94" fontSize="10" fill={ink} textAnchor="middle">A∩B</text>
          <text x="160" y="168" fontSize="9.5" fill={soft} textAnchor="middle">U</text>
        </Frame>
      );
    case "numberline":
      return (
        <Frame caption="Solution sets are intervals: filled dot includes the endpoint, open dot excludes it.">
          <line x1="30" y1="95" x2="290" y2="95" stroke={ink} strokeWidth="1.5" />
          {[60, 110, 160, 210, 260].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="90" x2={x} y2="100" stroke={ink} />
              <text x={x} y="118" fontSize="9" fill={soft} textAnchor="middle">{i - 1}</text>
            </g>
          ))}
          <circle cx="160" cy="95" r="5" fill="#fafafa" stroke={verm} strokeWidth="2.5" />
          <line x1="160" y1="95" x2="290" y2="95" stroke={verm} strokeWidth="4" opacity="0.5" />
          <text x="205" y="75" fontSize="10" fill={verm} textAnchor="middle">x &gt; 1</text>
        </Frame>
      );
    case "parabola":
      return (
        <Frame caption="y = x²: even (symmetric about the y-axis), with a minimum at the vertex.">
          <line x1="30" y1="40" x2="30" y2="150" stroke={line} />
          <line x1="30" y1="150" x2="290" y2="150" stroke={line} />
          <path d="M60 45 Q160 210 260 45" fill="none" stroke={verm} strokeWidth="2.5" />
          <circle cx="160" cy="150" r="4" fill={ink} />
          <text x="270" y="165" fontSize="10" fill={soft}>x</text>
          <text x="18" y="45" fontSize="10" fill={soft}>y</text>
          <text x="160" y="35" fontSize="10" fill={ink} textAnchor="middle">vertex</text>
        </Frame>
      );
    case "graph":
      return (
        <Frame caption="Exponential growth vs. its inverse, the logarithm.">
          <line x1="30" y1="40" x2="30" y2="150" stroke={line} />
          <line x1="30" y1="150" x2="290" y2="150" stroke={line} />
          <path d="M35 148 Q150 145 185 45" fill="none" stroke={verm} strokeWidth="2.5" />
          <path d="M60 45 Q120 120 285 142" fill="none" stroke={jade} strokeWidth="2.5" strokeDasharray="5 4" />
          <text x="195" y="60" fontSize="10" fill={verm}>y = aˣ</text>
          <text x="200" y="128" fontSize="10" fill={jade}>y = logₐx</text>
        </Frame>
      );
    case "sequence":
      return (
        <Frame caption="Arithmetic: add the same d each step. Geometric: multiply by the same r.">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={55 + i * 55} cy="80" r="16" fill={i === 0 ? verm : "#fafafa"} stroke={verm} />
              <text x={55 + i * 55} y="84" fontSize="10" fill={i === 0 ? "#fff" : ink} textAnchor="middle">
                {i === 0 ? "a₁" : `a${i + 1}`}
              </text>
              {i < 4 && <text x={82 + i * 55} y="76" fontSize="10" fill={soft}>+d</text>}
            </g>
          ))}
          <text x="160" y="130" fontSize="10" fill={ink} textAnchor="middle">aₙ = a₁ + (n − 1)d</text>
        </Frame>
      );
    case "tangent":
      return (
        <Frame caption="The derivative is the slope of the tangent line at a point on the curve.">
          <line x1="30" y1="40" x2="30" y2="150" stroke={line} />
          <line x1="30" y1="150" x2="290" y2="150" stroke={line} />
          <path d="M45 55 Q150 210 280 40" fill="none" stroke={verm} strokeWidth="2.5" />
          <line x1="70" y1="150" x2="250" y2="55" stroke={gold} strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="160" cy="112" r="4.5" fill={ink} />
          <text x="230" y="70" fontSize="10" fill={gold}>tangent</text>
          <text x="160" y="135" fontSize="9" fill={soft} textAnchor="middle">slope = f′(x)</text>
        </Frame>
      );
    case "plane":
      return (
        <Frame caption="Coordinates turn geometry into algebra: distance, midpoint, slope and circles.">
          <line x1="30" y1="40" x2="30" y2="150" stroke={line} />
          <line x1="30" y1="150" x2="290" y2="150" stroke={line} />
          <line x1="80" y1="130" x2="240" y2="60" stroke={verm} strokeWidth="2" />
          <circle cx="80" cy="130" r="4" fill={ink} />
          <circle cx="240" cy="60" r="4" fill={ink} />
          <text x="66" y="145" fontSize="10" fill={ink}>(x₁,y₁)</text>
          <text x="210" y="52" fontSize="10" fill={ink}>(x₂,y₂)</text>
          <text x="150" y="105" fontSize="9" fill={soft}>slope = Δy/Δx</text>
        </Frame>
      );
    case "vector":
      return (
        <Frame caption="A vector has magnitude and direction; the angle follows from the dot product.">
          <line x1="40" y1="140" x2="280" y2="140" stroke={line} />
          <line x1="40" y1="140" x2="40" y2="40" stroke={line} />
          <line x1="40" y1="140" x2="220" y2="60" stroke={verm} strokeWidth="2.5" markerEnd="url(#arrow)" />
          <line x1="40" y1="140" x2="250" y2="120" stroke={jade} strokeWidth="2.5" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={ink} />
            </marker>
          </defs>
          <path d="M90 140 A50 50 0 0 0 80 112" fill="none" stroke={gold} strokeWidth="1.5" />
          <text x="96" y="128" fontSize="10" fill={gold}>θ</text>
          <text x="225" y="52" fontSize="10" fill={verm}>a</text>
          <text x="258" y="118" fontSize="10" fill={jade}>b</text>
        </Frame>
      );
    case "complex":
      return (
        <Frame caption="The Argand plane: a + bi is the point (a, b), and its modulus is the distance.">
          <line x1="40" y1="90" x2="280" y2="90" stroke={line} />
          <line x1="160" y1="40" x2="160" y2="150" stroke={line} />
          <line x1="160" y1="90" x2="235" y2="135" stroke={verm} strokeWidth="2.5" />
          <circle cx="235" cy="135" r="4.5" fill={verm} />
          <text x="242" y="140" fontSize="10" fill={verm}>a + bi</text>
          <text x="285" y="86" fontSize="10" fill={soft}>Re</text>
          <text x="164" y="42" fontSize="10" fill={soft}>Im</text>
          <text x="190" y="120" fontSize="9" fill={ink}>|z|</text>
        </Frame>
      );
    case "solid":
      return (
        <Frame caption="Standard solids: volume and surface area are built from the base and height.">
          <ellipse cx="110" cy="130" rx="45" ry="14" fill={line} opacity="0.5" />
          <rect x="65" y="65" width="90" height="65" fill={verm} opacity="0.12" stroke={verm} />
          <ellipse cx="110" cy="65" rx="45" ry="14" fill="#fafafa" stroke={verm} />
          <text x="110" y="70" fontSize="9" fill={ink} textAnchor="middle">r</text>
          <text x="215" y="105" fontSize="11" fill={ink}>V = πr²h</text>
          <text x="215" y="125" fontSize="9.5" fill={soft}>cylinder</text>
        </Frame>
      );
    case "dice":
      return (
        <Frame caption="Classical probability: favourable outcomes ÷ equally likely outcomes.">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={80 + i * 70}
                y="55"
                width="44"
                height="44"
                rx="8"
                fill={i === 0 ? verm : "#fafafa"}
                stroke={verm}
                opacity={i === 0 ? 1 : 0.9}
              />
              {[
                [14, 14],
                [30, 14],
                [14, 30],
                [30, 30],
              ].map(([dx, dy], j) => (
                <circle key={j} cx={80 + i * 70 + dx} cy={55 + dy} r="2.6" fill={i === 0 ? "#fff" : verm} />
              ))}
            </g>
          ))}
          <text x="160" y="130" fontSize="11" fill={ink} textAnchor="middle">P(A) = 4 / 6</text>
        </Frame>
      );
    case "histogram":
      return (
        <Frame caption="Central tendency and spread: where the data sits and how far it fans out.">
          <line x1="30" y1="140" x2="290" y2="140" stroke={line} />
          {[35, 72, 112, 82, 44].map((h, i) => (
            <rect key={i} x={45 + i * 45} y={140 - h} width="30" height={h} rx="3" fill={i === 2 ? verm : line} />
          ))}
          <line x1="30" y1="150" x2="290" y2="150" stroke={ink} strokeWidth="1" opacity="0.2" />
          <text x="160" y="168" fontSize="9.5" fill={soft} textAnchor="middle">mean · median · spread</text>
        </Frame>
      );
    case "bell":
      return (
        <Frame caption="The normal curve: 68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ.">
          <line x1="25" y1="145" x2="295" y2="145" stroke={line} />
          <path d="M30 145 C120 145 130 35 160 35 C190 35 200 145 290 145" fill={verm} opacity="0.12" stroke={verm} strokeWidth="2" />
          {[-2, -1, 0, 1, 2].map((z) => (
            <line
              key={z}
              x1={160 + z * 45}
              y1="45"
              x2={160 + z * 45}
              y2="145"
              stroke={soft}
              strokeDasharray="3 3"
              opacity="0.6"
            />
          ))}
          <text x="160" y="162" fontSize="9.5" fill={soft} textAnchor="middle">μ − 2σ   μ   μ + 2σ</text>
        </Frame>
      );
    case "motion":
      return (
        <Frame caption="A velocity–time graph: gradient is acceleration, area is displacement.">
          <line x1="35" y1="40" x2="35" y2="150" stroke={line} />
          <line x1="35" y1="150" x2="290" y2="150" stroke={line} />
          <line x1="45" y1="140" x2="250" y2="55" stroke={verm} strokeWidth="2.5" />
          <path d="M45 140 L250 55 L250 150 L45 150 Z" fill={verm} opacity="0.1" />
          <circle cx="250" cy="55" r="4" fill={ink} />
          <text x="275" y="165" fontSize="9.5" fill={soft}>t</text>
          <text x="18" y="46" fontSize="9.5" fill={soft}>v</text>
          <text x="170" y="130" fontSize="9.5" fill={ink}>area = s</text>
          <text x="180" y="70" fontSize="9.5" fill={verm}>slope = a</text>
        </Frame>
      );
    case "wave":
      return (
        <Frame caption="A wave: wavelength λ is one full cycle, amplitude is height from the centre.">
          <line x1="20" y1="95" x2="300" y2="95" stroke={line} />
          <path
            d="M25 95 C55 40 85 40 115 95 C145 150 175 150 205 95 C235 40 265 40 295 95"
            fill="none"
            stroke={verm}
            strokeWidth="2.5"
          />
          <line x1="25" y1="95" x2="115" y2="95" stroke={jade} strokeDasharray="4 3" />
          <text x="70" y="86" fontSize="10" fill={jade}>λ</text>
          <line x1="70" y1="95" x2="70" y2="52" stroke={gold} strokeDasharray="4 3" />
          <text x="74" y="72" fontSize="9.5" fill={gold}>A</text>
        </Frame>
      );
    case "circuit":
      return (
        <Frame caption="Series resistance adds: R = R₁ + R₂. Parallel resistance adds as reciprocals.">
          <path d="M60 60 H120 M180 60 H250 V140 H60 V60" fill="none" stroke={ink} strokeWidth="2" />
          <rect x="120" y="48" width="60" height="24" rx="3" fill="#fafafa" stroke={verm} />
          <text x="150" y="64" fontSize="10" fill={ink} textAnchor="middle">R</text>
          <line x1="140" y1="140" x2="170" y2="140" stroke={gold} strokeWidth="4" />
          <line x1="155" y1="128" x2="155" y2="152" stroke={gold} strokeWidth="2" />
          <text x="185" y="145" fontSize="9.5" fill={soft}>cell</text>
          <text x="150" y="105" fontSize="10" fill={ink} textAnchor="middle">V = IR</text>
        </Frame>
      );
    case "atom":
      return (
        <Frame caption="An atom: a dense nucleus with electrons in shells; electron transitions emit photons.">
          <ellipse cx="160" cy="90" rx="80" ry="32" fill="none" stroke={line} />
          <ellipse cx="160" cy="90" rx="32" ry="80" fill="none" stroke={line} />
          <circle cx="160" cy="90" r="16" fill={verm} opacity="0.2" stroke={verm} />
          <text x="160" y="94" fontSize="9" fill={ink} textAnchor="middle">+</text>
          <circle cx="240" cy="90" r="5" fill={jade} />
          <circle cx="160" cy="170" r="5" fill={jade} />
          <circle cx="80" cy="90" r="5" fill={jade} />
        </Frame>
      );
    case "ph":
      return (
        <Frame caption="The pH scale is logarithmic: each unit is a tenfold change in H⁺ concentration.">
          {[
            ["0", "#c0262e"],
            ["3", "#d9694e"],
            ["5", "#d8a24a"],
            ["7", "#0a7a53"],
            ["9", "#3c8fbf"],
            ["14", "#4b4fa8"],
          ].map(([label, color], i) => (
            <g key={label}>
              <rect x={35 + i * 42} y="70" width="42" height="30" fill={color} opacity="0.85" />
              <text x={56 + i * 42} y="89" fontSize="10" fill="#fff" textAnchor="middle">
                {label}
              </text>
            </g>
          ))}
          <text x="35" y="120" fontSize="9.5" fill={soft}>acidic</text>
          <text x="287" y="120" fontSize="9.5" fill={soft} textAnchor="end">basic</text>
          <text x="182" y="120" fontSize="9.5" fill={ink} textAnchor="middle">neutral</text>
        </Frame>
      );
    default:
      return null;
  }
}
