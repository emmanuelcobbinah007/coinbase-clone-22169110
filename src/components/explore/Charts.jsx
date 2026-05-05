import React, { useMemo } from "react";

/* Simple seeded PRNG (deterministic per seed string) */
const createRng = (seed) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
};

const buildSeries = (seed, numPoints, trend) => {
  const rand = createRng(seed);
  const points = [];

  /* Starting baseline depends on trend direction */
  let y = trend === "up" ? 0.72
        : trend === "down" ? 0.28
        : 0.5;

  for (let i = 0; i < numPoints; i++) {
    /* mix a gentle trend drift with random noise */
    const drift = trend === "up" ? -0.018
                : trend === "down" ? 0.018
                : 0;
    const noise = (rand() - 0.5) * 0.11;
    y = y + drift + noise;
    y = Math.max(0.08, Math.min(0.92, y));
    points.push(y);
  }

  return points;
};

const buildPath = (seed, numPoints, width, height, trend) => {
  const points = buildSeries(seed, numPoints, trend);
  const step = width / (numPoints - 1);
  const pad = 3;
  const usable = height - pad * 2;

  const pts = points.map((point, index) => {
    const x = Math.round(step * index * 10) / 10;
    const y = pad + (1 - point) * usable;
    return `${x},${Math.round(y * 10) / 10}`;
  });

  return `M${pts.join(" L")}`;
};

export const MiniChart = ({ color = "#22c55e", type = "line", seed = "default" }) => {
  const trend = type === "flat" ? "flat" : color === "#22c55e" ? "up" : "down";
  const d = useMemo(() => buildPath(seed, 12, 40, 28, trend), [seed, trend]);
  return (
    <svg viewBox="0 0 40 28" className="w-[80px] h-[28px]" fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const buildTimeLabels = (range) => {
  if (range === "1W") return ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "1d ago", "Now"];
  if (range === "1M") return ["4w", "3w", "2w", "1w", "Now"];
  if (range === "1Y") return ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Now"];
  return ["24h ago", "18h", "12h", "6h", "Now"];
};

export const ExpandedChart = ({ color = "#2563eb", seed = "expanded", basePrice = 1, range = "1D" }) => {
  const trend = color === "#22c55e" || color === "#2563eb" ? "up" : "down";
  const points = useMemo(() => buildSeries(seed, 48, trend), [seed, trend]);
  const line = useMemo(() => buildPath(seed, 48, 320, 140, trend), [seed, trend]);

  const xLabels = useMemo(() => buildTimeLabels(range), [range]);

  const lastX = 320;
  const lastY = 3 + (1 - points[points.length - 1]) * (140 - 6);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 320 140" className="h-full w-full" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`expanded-chart-fade-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
        <pattern id={`expanded-chart-dots-${seed}`} x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.45" fill={color} opacity="0.25" />
        </pattern>
      </defs>
      <path
        d={`${line} L320,137 L0,137 Z`}
        fill={`url(#expanded-chart-fade-${seed})`}
      />
      <path
        d={`${line} L320,137 L0,137 Z`}
        fill={`url(#expanded-chart-dots-${seed})`}
      />
      <path
        d={line}
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={lastX} cy={lastY} r="1.5" fill={color} />
      <circle cx={lastX} cy={lastY} r="3.4" stroke={color} strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
      <circle cx={lastX} cy={lastY} r="5.2" stroke={color} strokeOpacity="0.12" strokeWidth="1.2" fill="none" />
      </svg>

      <div className="pointer-events-none absolute inset-x-2 bottom-2 hidden justify-between text-[10px] text-gray-500 md:flex">
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex justify-between text-[10px] text-gray-500 md:hidden">
        {[xLabels[0], xLabels[Math.floor(xLabels.length / 2)], xLabels[xLabels.length - 1]].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}

export const StatChart = ({ color, seed = "stat" }) => {
  const trend = color === "#22c55e" ? "up" : "down";
  const d = useMemo(() => buildPath(seed, 20, 120, 48, trend), [seed, trend]);
  return (
    <svg viewBox="0 0 120 48" className="w-full h-12 mt-3" fill="none" preserveAspectRatio="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
