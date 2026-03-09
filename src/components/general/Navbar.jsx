import React, { useState, useRef, useEffect } from 'react';
import CoinbaseLogo from "../../assets/coinbaseLogoNavigation-4.svg";
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, GlobeAltIcon, CheckIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { languages, searchTabs, searchData, navbarElements } from '../../data/navbarData';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTab, setSearchTab] = useState('Top');
  const closeTimeout = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    } else {
      setSearchQuery('');
      setSearchTab('Top');
    }
  }, [searchOpen]);

  const handleMouseEnter = (menu) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 100);
  };

  return (
    <>
      <nav className="sticky top-0 bg-white border-b border-gray-200 px-6 py-2 z-50">
        <div className="max-w-9xl mx-auto flex items-center justify-between">
          {/* Left: Logo + Desktop Nav Links */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img className='w-12 h-12' src={CoinbaseLogo} alt="Coinbase Logo" />
            </Link>
            
            {/* Desktop nav links - hidden below lg */}
            <div className="hidden xl:flex space-x-6">
              <Link to="/explore" className="text-md font-semibold text-gray-700 hover:bg-gray-200 rounded-4xl px-4 py-2 mt-2">Cryptocurrencies</Link>
              
              {navbarElements.map((item) => (
                <div
                  key={item.title}
                  className="relative group py-2"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={`text-md font-semibold rounded-4xl focus:outline-none px-4 py-2 transition-colors ${
                    activeMenu === item.title 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}>
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Search - visible on all sizes */}
            <button
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-900" />
            </button>
            
            {/* Globe - hidden on mobile, visible on md+ */}
            <div 
              className="relative hidden md:block"
              onMouseEnter={() => handleMouseEnter('language')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <GlobeAltIcon className="w-5 h-5 text-gray-900" />
              </button>

              <div className={`absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-2xl rounded-3xl p-6 z-50 transition-all duration-300 ease-in-out ${
                activeMenu === 'language' 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <h3 className="text-sm font-semibold text-gray-600 mb-6">Language and region</h3>
                  
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-3 py-3 bg-gray-200 border-none rounded-2xl text-sm focus:ring-0 focus:outline-none placeholder-gray-1000"
                  />
                </div>

                <div className="space-y-1 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {languages.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-2xl cursor-pointer transition-colors group/lang"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.lang}</p>
                        <p className="text-xs text-gray-1000">{item.region}</p>
                      </div>
                      {item.selected && (
                        <CheckIcon className="w-5 h-5 text-green-600 font-bold" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sign in - hidden on mobile, visible on md+ */}
            <Link to="/signin" className="hidden md:inline-block px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-bold transition-all ml-1">
              Sign in
            </Link>
            
            {/* Sign up - visible on all sizes */}
            <Link 
              to="/signup" 
              className="px-6 py-2.5 text-white rounded-full text-sm font-bold transition-all"
              style={{ backgroundColor: 'var(--coinbase-blue)' }}
            >
              Sign up
            </Link>

            {/* Hamburger menu - visible below lg */}
            <button 
              className="lg:hidden p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen 
                ? <XMarkIcon className="w-5 h-5 text-gray-900" />
                : <Bars3Icon className="w-5 h-5 text-gray-900" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`hidden xl:block fixed inset-0 top-[73px] z-30 transition-all duration-200 ${
          activeMenu && activeMenu !== 'language'
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
        onMouseEnter={handleMouseLeave}
      />

      {/* Full-width Desktop Dropdown */}
      {navbarElements.map((item) => (
        <div
          key={item.title}
          className={`hidden xl:block fixed left-0 right-0 top-[73px] bg-white border-b border-gray-200 shadow-lg z-40 transition-all duration-200 ease-in-out ${
            activeMenu === item.title
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="flex gap-16">
              {/* Left column (even-indexed items) */}
              <div className="flex-1 space-y-2">
                {item.subElements.filter((_, i) => i % 2 === 0).map((sub) => (
                  <div key={sub.name} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                    <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{sub.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right column (odd-indexed items) */}
              <div className="flex-1 space-y-2">
                {item.subElements.filter((_, i) => i % 2 === 1).map((sub) => (
                  <div key={sub.name} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                    <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-300 rounded-sm"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{sub.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sub.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Search backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={() => setSearchOpen(false)}
      />

      {/* Search panel — slides in from the right */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[60] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out rounded-l-3xl ${searchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Search input row */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <div className="flex items-center flex-1 gap-2 border-2 border-blue-500 rounded-full px-4 py-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
          {searchTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSearchTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                searchTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {(() => {
            // Tab → category mapping
            const tabCategoryMap = {
              Top: ['CRYPTO', 'STOCKS', 'PREDICTIONS'],
              Crypto: ['CRYPTO'],
              Stocks: ['STOCKS'],
              Predictions: ['PREDICTIONS'],
              Perpetuals: [],
              Futures: [],
            };

            const categories = tabCategoryMap[searchTab] ?? [];
            const q = searchQuery.trim().toLowerCase();

            const filtered = categories
              .map((cat) => ({
                category: cat,
                items: searchData[cat].filter(
                  (item) =>
                    !q ||
                    item.name.toLowerCase().includes(q) ||
                    item.ticker.toLowerCase().includes(q)
                ),
              }))
              .filter(({ items }) => items.length > 0);

            if (filtered.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
                  {q ? `No results for "${searchQuery}"` : 'No assets in this category yet.'}
                </div>
              );
            }

            return filtered.map(({ category, items }) => (
              <div key={category} className="mb-4">
                <p className="text-xs font-bold text-gray-400 tracking-widest mb-2 mt-4">{category}</p>
                {items.map((item) => (
                  <div
                    key={item.ticker || item.name}
                    className="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-xl px-2 cursor-pointer transition-colors"
                  >
                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.letter}
                    </div>

                    {/* Name + ticker */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-gray-900 truncate">{item.name}</span>
                        {item.rank && (
                          <span className="text-xs text-gray-400 bg-gray-100 rounded px-1 font-medium">#{item.rank}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{item.ticker}</p>
                    </div>

                    {/* Volume + mcap */}
                    {item.vol && (
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">{item.vol} vol</p>
                        <p className="text-xs text-gray-500">{item.mcap} mcap</p>
                      </div>
                    )}

                    {/* Price + change */}
                    <div className="text-right flex-shrink-0">
                      {item.price && <p className="text-sm font-semibold text-gray-900">${item.price}</p>}
                      <p className={`text-xs font-semibold ${item.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {item.change >= 0 ? '↗' : '↘'} {Math.abs(item.change).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[73px] bg-white z-40 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        <div className="px-6 pt-8 space-y-2">
          <Link 
            to="/cryptocurrencies" 
            className="block text-2xl font-bold text-gray-900 py-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cryptocurrencies
          </Link>

          {navbarElements.map((item) => (
            <button
              key={item.title}
              className="flex items-center justify-between w-full text-2xl font-bold text-gray-900 py-4"
            >
              <span>{item.title}</span>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Bottom: Globe + Sign in (mobile only) */}
        <div className="px-6 pb-10 flex items-center space-x-4">
          <button className="p-3 bg-gray-200 rounded-full">
            <GlobeAltIcon className="w-5 h-5 text-gray-900" />
          </button>
          <Link 
            to="/signin" 
            className="px-8 py-3 bg-gray-200 text-gray-900 rounded-full text-sm font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar