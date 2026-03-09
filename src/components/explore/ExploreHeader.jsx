import React from "react";
import { MagnifyingGlassIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const ExploreHeader = ({ searchQuery, onSearchChange }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
    <div>
      <h1
        className="text-3xl md:text-4xl font-bold text-gray-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Explore crypto
      </h1>
      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
        Coinbase 50 Index is down{" "}
        <span className="text-red-500">↘ 1.20% (24hrs)</span>
        <InformationCircleIcon className="w-4 h-4 text-gray-400" />
      </p>
    </div>
    <div className="relative w-full md:w-[340px]">
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for an asset"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[var(--coinbase-blue)] transition-all"
      />
    </div>
  </div>
);

export default ExploreHeader;
