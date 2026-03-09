import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { MiniChart } from "./Charts";
import {
  cryptoAssets,
  TOTAL_ASSETS,
  formatPrice,
  getChangeColor,
  getChangeArrow,
  getChartType,
  getChartColor,
  parseAbbreviated,
} from "../../data/exploreData";

const ChevronDown = () => (
  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* Sort icon that reflects current direction */
const SortIndicator = ({ active, direction }) => {
  const color = active ? "text-[var(--coinbase-blue)]" : "text-gray-400";
  return (
    <svg className={`w-3 h-3 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {direction === "asc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V3m0 0L3 7m4-4l4 4" />
      ) : direction === "desc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13v8m0 0l4-4m-4 4l-4-4" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      )}
    </svg>
  );
};

const ROW_OPTIONS = [10, 25, 50];
const TIME_OPTIONS = ["1H", "1D", "1W", "1M", "1Y"];
const ASSET_OPTIONS = ["All assets", "Tradable", "Gainers", "Losers"];

const CryptoMarketPrices = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [timePeriod, setTimePeriod] = useState("1D");
  const [assetFilter, setAssetFilter] = useState("All assets");
  const [sortColumn, setSortColumn] = useState(null); // "name" | "price" | "change" | "mktCap" | "volume"
  const [sortDir, setSortDir] = useState("none");     // "none" | "asc" | "desc"

  /* Dropdown open states */
  const [openDropdown, setOpenDropdown] = useState(null); // "assets" | "time" | "rows" | null
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Cycle sort: none → asc → desc → none */
  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDir === "none") setSortDir("asc");
      else if (sortDir === "asc") setSortDir("desc");
      else { setSortDir("none"); setSortColumn(null); }
    } else {
      setSortColumn(column);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  /* Filter + sort assets */
  const processedAssets = useMemo(() => {
    let list = [...cryptoAssets];

    /* Search filter */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) => a.name.toLowerCase().includes(q) || a.ticker.toLowerCase().includes(q));
    }

    /* Asset category filter */
    if (assetFilter === "Gainers") list = list.filter((a) => a.change > 0);
    else if (assetFilter === "Losers") list = list.filter((a) => a.change < 0);

    /* Sort */
    if (sortColumn && sortDir !== "none") {
      const dir = sortDir === "asc" ? 1 : -1;
      list.sort((a, b) => {
        let va, vb;
        switch (sortColumn) {
          case "name":   va = a.name.toLowerCase(); vb = b.name.toLowerCase(); return va < vb ? -dir : va > vb ? dir : 0;
          case "price":  return (a.price - b.price) * dir;
          case "change": return (a.change - b.change) * dir;
          case "mktCap": return (parseAbbreviated(a.mktCap) - parseAbbreviated(b.mktCap)) * dir;
          case "volume": return (parseAbbreviated(a.volume) - parseAbbreviated(b.volume)) * dir;
          default:       return 0;
        }
      });
    }

    return list;
  }, [searchQuery, assetFilter, sortColumn, sortDir]);

  const totalPages = Math.ceil(TOTAL_ASSETS / rowsPerPage);
  const paginatedAssets = processedAssets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFav = (ticker) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) next.delete(ticker);
      else next.add(ticker);
      return next;
    });
  };

  /* Header helper */
  const thClass = (col) =>
    `text-left py-3 text-sm font-semibold cursor-pointer select-none transition-colors ${
      sortColumn === col && sortDir !== "none" ? "text-[var(--coinbase-blue)]" : "text-gray-700"
    }`;

  /* Pagination helper */
  const renderPagination = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="text-gray-400 px-1">...</span>
          ) : (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                currentPage === p
                  ? "bg-[var(--coinbase-blue)] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p.toLocaleString()}
            </button>
          )
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="text-gray-500 hover:text-gray-800 ml-1"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="mt-12 border-t border-gray-100 pt-8">
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
          Crypto market prices
        </h2>
        <span className="text-sm text-gray-400">{TOTAL_ASSETS.toLocaleString()} assets</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        The overall crypto market is growing this week. As of today, the total crypto market capitalization is 23.99 trillion, representing a 0.64% increase from last week.
      </p>
      <a href="#" className="text-sm text-[var(--coinbase-blue)] font-medium hover:underline">
        Read more
      </a>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mt-6 mb-6 relative" ref={dropdownRef}>
        {/* Asset filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "assets" ? null : "assets")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span className="text-xs">🌐</span>
            {assetFilter}
            <ChevronDown />
          </button>
          {openDropdown === "assets" && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[140px]">
              {ASSET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setAssetFilter(opt); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    assetFilter === opt ? "text-[var(--coinbase-blue)] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time period */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "time" ? null : "time")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {timePeriod}
            <ChevronDown />
          </button>
          {openDropdown === "time" && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[90px]">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setTimePeriod(opt); setOpenDropdown(null); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    timePeriod === opt ? "text-[var(--coinbase-blue)] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency (static) */}
        <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
          GHS
          <ChevronDown />
        </button>

        {/* Rows per page */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "rows" ? null : "rows")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {rowsPerPage} rows
            <ChevronDown />
          </button>
          {openDropdown === "rows" && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[100px]">
              {ROW_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setRowsPerPage(opt); setOpenDropdown(null); setCurrentPage(1); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    rowsPerPage === opt ? "text-[var(--coinbase-blue)] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt} rows
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 pr-2 w-8"></th>
              <th className={thClass("name")} onClick={() => handleSort("name")}>
                <span className="flex items-center gap-1">
                  Asset <SortIndicator active={sortColumn === "name"} direction={sortColumn === "name" ? sortDir : "none"} />
                </span>
              </th>
              <th className={thClass("price")} onClick={() => handleSort("price")}>
                <span className="flex items-center gap-1">
                  Market price <SortIndicator active={sortColumn === "price"} direction={sortColumn === "price" ? sortDir : "none"} />
                </span>
              </th>
              <th className="text-left py-3 text-sm font-semibold text-gray-700">Chart</th>
              <th className={thClass("change")} onClick={() => handleSort("change")}>
                <span className="flex items-center gap-1">
                  Change <SortIndicator active={sortColumn === "change"} direction={sortColumn === "change" ? sortDir : "none"} />
                </span>
              </th>
              <th className={thClass("mktCap")} onClick={() => handleSort("mktCap")}>
                <span className="flex items-center gap-1">
                  Mkt cap <SortIndicator active={sortColumn === "mktCap"} direction={sortColumn === "mktCap" ? sortDir : "none"} />
                </span>
              </th>
              <th className={thClass("volume")} onClick={() => handleSort("volume")}>
                <span className="flex items-center gap-1">
                  Volume <SortIndicator active={sortColumn === "volume"} direction={sortColumn === "volume" ? sortDir : "none"} />
                </span>
              </th>
              <th className="text-right py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.ticker} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-2">
                  <button onClick={() => toggleFav(asset.ticker)} className="text-gray-300 hover:text-yellow-400 transition-colors">
                    {favorites.has(asset.ticker) ? (
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <StarIcon className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: asset.color }}
                    >
                      {asset.letter}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{asset.ticker}</span>
                        {asset.badge && (
                          <span className="text-xs text-[var(--coinbase-blue)]">• {asset.badge}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-5 text-sm text-gray-900">GHS {formatPrice(asset.price)}</td>
                <td className="py-5">
                  <MiniChart color={getChartColor(asset.change)} type={getChartType(asset.change)} seed={asset.ticker} />
                </td>
                <td className={`py-5 text-sm font-medium ${getChangeColor(asset.change)}`}>
                  {getChangeArrow(asset.change)} {Math.abs(asset.change).toFixed(2)}%
                </td>
                <td className="py-5 text-sm text-gray-900">GHS {asset.mktCap}</td>
                <td className="py-5 text-sm text-gray-900">GHS {asset.volume}</td>
                <td className="py-5 text-right">
                  <Link
                    to="/signup"
                    className="inline-block px-5 py-2 bg-[var(--coinbase-blue)] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Trade
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Asset Cards ── */}
      <div className="md:hidden space-y-0">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <span
            className={`text-sm font-semibold flex items-center gap-1 cursor-pointer select-none ${
              sortColumn === "name" && sortDir !== "none" ? "text-[var(--coinbase-blue)]" : "text-gray-700"
            }`}
            onClick={() => handleSort("name")}
          >
            Asset <SortIndicator active={sortColumn === "name"} direction={sortColumn === "name" ? sortDir : "none"} />
          </span>
          <div className="flex gap-8">
            <span className="text-sm font-semibold text-gray-700">Chart</span>
            <span
              className={`text-sm font-semibold flex items-center gap-1 cursor-pointer select-none ${
                sortColumn === "price" && sortDir !== "none" ? "text-[var(--coinbase-blue)]" : "text-gray-700"
              }`}
              onClick={() => handleSort("price")}
            >
              Market price <SortIndicator active={sortColumn === "price"} direction={sortColumn === "price" ? sortDir : "none"} />
            </span>
          </div>
        </div>

        {paginatedAssets.map((asset) => (
          <div key={asset.ticker} className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: asset.color }}
              >
                {asset.letter}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">{asset.ticker}</span>
                  {asset.badge && (
                    <span className="text-xs text-[var(--coinbase-blue)]">• {asset.badge}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MiniChart color={getChartColor(asset.change)} type={getChartType(asset.change)} seed={asset.ticker} />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">GHS {formatPrice(asset.price)}</p>
                <p className={`text-xs font-medium ${getChangeColor(asset.change)}`}>
                  {getChangeArrow(asset.change)} {Math.abs(asset.change).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
      <p className="text-center text-sm text-gray-400 mt-3 mb-8">
        {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, TOTAL_ASSETS)} of {TOTAL_ASSETS.toLocaleString()} assets
      </p>
    </section>
  );
};

export default CryptoMarketPrices;
