import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { assetTabs as tabs, initialAssetData as initialData } from '../../data/homeData'

const formatPrice = (price) => {
  if (price < 0.001) return price.toFixed(6)
  if (price < 1)     return price.toFixed(4)
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const Assets = () => {
  const [activeTab, setActiveTab] = useState('Tradable')
  const [data, setData] = useState(initialData)
  const [flipping, setFlipping] = useState(new Set())

  const dataRef = useRef(data)
  const activeTabRef = useRef(activeTab)
  useEffect(() => { dataRef.current = data }, [data])
  useEffect(() => { activeTabRef.current = activeTab }, [activeTab])

  useEffect(() => {
    const interval = setInterval(() => {
      const current = dataRef.current[activeTabRef.current]
      const count = Math.floor(Math.random() * 2) + 1
      const picked = new Set()
      while (picked.size < count) {
        picked.add(Math.floor(Math.random() * current.length))
      }

      const newFlipping = new Set([...picked].map(i => current[i].id))
      setFlipping(newFlipping)

      setData(prev => {
        const updated = { ...prev }
        const tabAssets = [...updated[activeTabRef.current]]
        picked.forEach(idx => {
          const delta = (Math.random() - 0.48) * 0.004
          tabAssets[idx] = { ...tabAssets[idx], price: tabAssets[idx].price * (1 + delta) }
        })
        updated[activeTabRef.current] = tabAssets
        return updated
      })

      setTimeout(() => setFlipping(new Set()), 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: '#f1f2f4' }}>
      <div className="max-w-9xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left */}
        <div className="w-full lg:w-1/2">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Explore crypto like Bitcoin, Ethereum, and Dogecoin.
          </h2>
          <p className="mt-5 text-base text-gray-500">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </p>
          <Link
            to="/cryptocurrencies"
            className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white text-md font-bold rounded-full hover:bg-gray-700 transition-colors"
          >
            See more assets
          </Link>
        </div>

        {/* Right: Dark interactive card */}
        <div className="w-full lg:w-3/5 bg-[#1a1b1e] rounded-3xl p-6">

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-[#3a3b3e] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Rows */}
          <div>
            {data[activeTab].map(asset => (
              <div
                key={asset.id}
                className="flex items-center justify-between py-4 px-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.letter}
                  </div>
                  <span className="text-white text-xl font-semibold">{asset.name}</span>
                </div>

                <div className={`text-right ${flipping.has(asset.id) ? 'price-flip' : ''}`}>
                  <p className="text-white text-lg font-semibold">GHS {formatPrice(asset.price)}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${
                    asset.change > 0 ? 'text-green-400' :
                    asset.change < 0 ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {asset.change > 0 ? '↗' : asset.change < 0 ? '↙' : ''} {Math.abs(asset.change).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Assets