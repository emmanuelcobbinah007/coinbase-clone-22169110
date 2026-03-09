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

const buildPath = (seed, numPoints, width, height, trend) => {
  const rand = createRng(seed);
  const pad = 3;
  const usable = height - pad * 2;
  const step = width / (numPoints - 1);

  /* Starting baseline depends on trend direction */
  let y = trend === "up" ? pad + usable * 0.75
        : trend === "down" ? pad + usable * 0.25
        : height / 2;

  const pts = [];
  for (let i = 0; i < numPoints; i++) {
    const x = Math.round(step * i * 10) / 10;
    /* mix a gentle trend drift with random noise */
    const drift = trend === "up" ? -usable * 0.045
                : trend === "down" ? usable * 0.045
                : 0;
    const noise = (rand() - 0.5) * usable * 0.38;
    y = y + drift + noise;
    y = Math.max(pad, Math.min(height - pad, y));
    pts.push(`${x},${Math.round(y * 10) / 10}`);
  }
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

export const StatChart = ({ color, seed = "stat" }) => {
  const trend = color === "#22c55e" ? "up" : "down";
  const d = useMemo(() => buildPath(seed, 20, 120, 48, trend), [seed, trend]);
  return (
    <svg viewBox="0 0 120 48" className="w-full h-12 mt-3" fill="none" preserveAspectRatio="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
