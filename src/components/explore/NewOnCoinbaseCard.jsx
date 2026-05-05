import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { newOnCoinbase as staticNewOnCoinbase } from "../../data/exploreData";
import { getNewListings } from '../../api/crypto'
import { useNavigate } from 'react-router-dom'

const NewOnCoinbaseCard = () => {
  const [idx, setIdx] = useState(0);
  const [remote, setRemote] = useState(null)
  const navigate = useNavigate();
 
  useEffect(() => {
    let mounted = true
    getNewListings().then((data) => {
      if (!mounted) return
      const list = Array.isArray(data) ? data : (data?.data || data?.cryptos || [])
      if (list && list.length) setRemote(list)
    }).catch(() => {
      // ignore
    })
    return () => { mounted = false }
  }, [])

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
        {(remote || staticNewOnCoinbase).slice(idx, idx + 2).map((n) => {
          const ticker = n.symbol || n.ticker || n.code || n.name
          const name = n.name || n.title || ticker
          const date = n.createdAt ? new Date(n.createdAt).toLocaleDateString() : (n.date || '')
          const color = n.color || '#6b7280'
          const letter = (n.symbol || n.ticker || n.name || 'N')[0]
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
              <p className="text-xs text-gray-500 uppercase">{ticker}</p>
              <p className="text-sm font-bold text-gray-900">{name}</p>
              <p className="text-xs text-gray-400 mt-1">{date}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default NewOnCoinbaseCard;
