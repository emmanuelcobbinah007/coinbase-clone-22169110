import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { topMovers as staticTopMovers, getChangeColor, getChangeArrow } from "../../data/exploreData";
import { getGainers } from '../../api/crypto'
import { useNavigate } from 'react-router-dom'

const TopMoversCard = () => {
  const [idx, setIdx] = useState(0);
  const [remote, setRemote] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true
    getGainers().then((data) => {
      if (!mounted) return
      // backend could return array or { data }
      const list = Array.isArray(data) ? data : (data?.data || data?.cryptos || [])
      if (list && list.length) setRemote(list)
    }).catch(() => {
      // ignore, fallback to static
    })
    return () => { mounted = false }
  }, [])

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
        {(remote || staticTopMovers).slice(idx, idx + 2).map((m) => {
          const ticker = m.symbol || m.ticker || m.code || m.name
          const change = typeof m.change24h === 'number' ? m.change24h : (m.change || 0)
          const price = typeof m.price === 'number' ? `GHS ${m.price.toLocaleString()}` : (m.price || '')
          const color = m.color || '#6b7280'
          const letter = (m.symbol || m.ticker || m.name || 'C')[0]
          return (
            <div
              key={ticker}
              onClick={() => navigate(`/crypto/${ticker}`)}
              className="flex-1 bg-gray-50 rounded-xl p-4 min-w-0 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
                style={{ backgroundColor: color }}
              >
                {letter}
              </div>
              <p className="text-sm font-semibold text-gray-700">{ticker}</p>
              <p className={`text-sm font-bold mt-1 ${getChangeColor(change)}`}>
                {getChangeArrow(change)} {Math.abs(change).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">{price}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TopMoversCard;
