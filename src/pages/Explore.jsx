import React, { useState } from "react";
import ExploreHeader from "../components/explore/ExploreHeader";
import MarketStats from "../components/explore/MarketStats";
import CryptoMarketPrices from "../components/explore/CryptoMarketPrices";
import ExploreCta from "../components/explore/ExploreCta";
import GetStartedCard from "../components/explore/GetStartedCard";
import TopMoversCard from "../components/explore/TopMoversCard";
import NewOnCoinbaseCard from "../components/explore/NewOnCoinbaseCard";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-9xl mx-auto px-4 md:px-8 pt-10 pb-0">
        <div className="flex gap-10">
          {/* Main Column */}
          <div className="flex-1 min-w-0">
            <ExploreHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <MarketStats />

            {/* Mobile: Sidebar Cards */}
            <div className="lg:hidden mt-10 space-y-8">
              <GetStartedCard />
              <TopMoversCard />
              <NewOnCoinbaseCard />
            </div>

            <CryptoMarketPrices searchQuery={searchQuery} />
            <ExploreCta />
          </div>

          {/* Sidebar (Desktop only) */}
          <aside className="hidden lg:block w-[400px] shrink-0 space-y-8 pt-2">
            <GetStartedCard />
            <div className="border-t border-gray-100 pt-6">
              <TopMoversCard />
            </div>
            <div className="border-t border-gray-100 pt-6">
              <NewOnCoinbaseCard />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Explore;
