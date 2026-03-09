import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StatChart } from "./Charts";
import { marketStats } from "../../data/exploreData";

const MarketStats = () => (
  <section className="mt-10 border-t border-gray-100 pt-8">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
        Market stats
      </h2>
      <div className="flex gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
    <p className="text-sm text-gray-500 mb-2">
      The overall crypto market is growing this week. As of today, the total crypto market capitalization is 23.99 trillion, representing a 0.64% increase from last week.
    </p>
    <a href="#" className="text-sm text-[var(--coinbase-blue)] font-medium hover:underline">
      Read more
    </a>

    <div className="flex gap-4 mt-6 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-4">
      {marketStats.map((stat) => (
        <div key={stat.label} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow min-w-[200px] shrink-0 lg:min-w-0 lg:shrink">
          <p className="text-xs text-gray-500">{stat.label}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-bold text-gray-900">{stat.value}</p>
            <span className={`text-xs font-medium ${stat.change > 0 ? "text-green-600" : "text-red-500"}`}>
              {stat.change > 0 ? "↗" : "↘"} {Math.abs(stat.change).toFixed(2)}%
            </span>
          </div>
          <StatChart color={stat.chartColor} seed={stat.label} />
        </div>
      ))}
    </div>
  </section>
);

export default MarketStats;
