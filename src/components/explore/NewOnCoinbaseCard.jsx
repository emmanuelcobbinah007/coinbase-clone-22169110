import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { newOnCoinbase } from "../../data/exploreData";

const NewOnCoinbaseCard = () => {
  const [idx, setIdx] = useState(0);

  const shift = (dir) => {
    setIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return newOnCoinbase.length - 2;
      if (next > newOnCoinbase.length - 2) return 0;
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          New on Coinbase
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
      <div className="flex gap-3 overflow-hidden">
        {newOnCoinbase.slice(idx, idx + 2).map((n) => (
          <div key={n.ticker} className="flex-1 bg-gray-50 rounded-xl p-4 min-w-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
              style={{ backgroundColor: n.color }}
            >
              {n.letter}
            </div>
            <p className="text-xs text-gray-500 uppercase">{n.ticker}</p>
            <p className="text-sm font-bold text-gray-900">{n.name}</p>
            <p className="text-xs text-gray-400 mt-1">{n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOnCoinbaseCard;
