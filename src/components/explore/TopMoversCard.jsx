import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { topMovers, getChangeColor, getChangeArrow } from "../../data/exploreData";

const TopMoversCard = () => {
  const [idx, setIdx] = useState(0);

  const shift = (dir) => {
    setIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return topMovers.length - 2;
      if (next > topMovers.length - 2) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Top movers
        </h3>
        <div className="flex gap-2">
          <button onClick={() => shift(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button onClick={() => shift(1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">24hr change</p>
      <div className="flex gap-3 overflow-hidden">
        {topMovers.slice(idx, idx + 2).map((m) => (
          <div key={m.ticker} className="flex-1 bg-gray-50 rounded-xl p-4 min-w-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
              style={{ backgroundColor: m.color }}
            >
              {m.letter}
            </div>
            <p className="text-sm font-semibold text-gray-700">{m.ticker}</p>
            <p className={`text-sm font-bold mt-1 ${getChangeColor(m.change)}`}>
              {getChangeArrow(m.change)} {Math.abs(m.change).toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">{m.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMoversCard;
