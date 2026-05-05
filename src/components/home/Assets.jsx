import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assetTabs as staticTabs, initialAssetData as fallbackData } from '../../data/homeData'
import { getAllCryptos, getGainers, getNewListings } from '../../api/crypto'

const colorFromSymbol = (symbol) => {
  const palette = ['#F7931A', '#627EEA', '#26A17B', '#F3BA2F', '#346AA9', '#2775CA', '#000000', '#FF0013', '#C3A634', '#0033AD', '#2A5ADA', '#E84142']
  const key = symbol || 'C'
  let hash = 0
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return palette[hash % palette.length]
}

const normalizeCrypto = (c, id) => ({
  id: c._id || id,
  name: c.name || c.symbol || 'Unknown',
  symbol: c.symbol || '',
  price: typeof c.price === 'number' ? c.price : 0,
  change: typeof c.change24h === 'number' ? c.change24h : 0,
  color: colorFromSymbol(c.symbol),
  letter: (c.symbol || c.name || 'C')[0],
})

const formatPrice = (price) => {
  if (price < 0.001) return price.toFixed(6)
  if (price < 1)     return price.toFixed(4)
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const Assets = () => {
  const [activeTab, setActiveTab] = useState('Tradable')
  const [data, setData] = useState({
    Tradable: [],
    'Top gainers': [],
    'New on Coinbase': [],
  })
  const navigate = useNavigate()
  const [flipping, setFlipping] = useState(new Set())
  const [loaded, setLoaded] = useState(false)

  const dataRef = useRef(data)
  const activeTabRef = useRef(activeTab)
  useEffect(() => { dataRef.current = data }, [data])
  useEffect(() => { activeTabRef.current = activeTab }, [activeTab])

  // Fetch backend data on mount
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const [allCryptos, gainers, newListings] = await Promise.all([
          getAllCryptos().catch(() => []),
          getGainers().catch(() => []),
          getNewListings().catch(() => []),
        ])

        setData({
          Tradable: (allCryptos || []).slice(0, 6).map((c, i) => normalizeCrypto(c, `tradable-${i}`)),
          'Top gainers': (gainers || []).slice(0, 6).map((c, i) => normalizeCrypto(c, `gainers-${i}`)),
          'New on Coinbase': (newListings || []).slice(0, 6).map((c, i) => normalizeCrypto(c, `new-${i}`)),
        })
      } catch (err) {
        console.error('Failed to fetch cryptos:', err)
        setData({
          Tradable: fallbackData.Tradable || [],
          'Top gainers': fallbackData['Top gainers'] || [],
          'New on Coinbase': fallbackData['New on Coinbase'] || [],
        })
      } finally {
        setLoaded(true)
      }
    }

    fetchCryptos()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const current = dataRef.current[activeTabRef.current]
      if (!current || current.length === 0) return
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
  }, [loaded])

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
            to="/explore"
            className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white text-md font-bold rounded-full hover:bg-gray-700 transition-colors"
          >
            See more assets
          </Link>
        </div>

        {/* Right: Dark interactive card */}
        <div className="w-full lg:w-3/5 bg-[#1a1b1e] rounded-3xl p-6">

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4">
            {staticTabs.map(tab => (
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
            {!loaded ? (
              <div className="text-center py-4 text-gray-400">Loading assets...</div>
            ) : data[activeTab].length === 0 ? (
              <div className="text-center py-4 text-gray-400">No assets available</div>
            ) : (
              data[activeTab].map(asset => (
              <div
                key={asset.id}
                onClick={() => asset.symbol && navigate(`/crypto/${asset.symbol}`)}
                className="flex items-center justify-between py-4 px-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.letter}
                  </div>
                  <div>
                    <span className="text-white text-lg font-semibold">{asset.name}</span>
                    {asset.symbol && <p className="text-xs text-gray-400">{asset.symbol}</p>}
                  </div>
                </div>

                <div className={`text-right ${flipping.has(asset.id) ? 'price-flip' : ''}`}>
                  <p className="text-white text-lg font-semibold">GHS {formatPrice(asset.price)}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${
                    asset.change > 0 ? 'text-green-400' :
                    asset.change < 0 ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                  </p>
                </div>
              </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Assets