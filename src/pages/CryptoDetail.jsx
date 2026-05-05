import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { getAllCryptos } from '../api/crypto'
import { ExpandedChart } from '../components/explore/Charts'

const PriceGraph = ({ seed, positive, basePrice }) => {
  return (
    <div className="w-full rounded-[28px] border border-gray-100 bg-[#f8fafc] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-500 sm:mb-4">
        <div className="flex gap-3 text-gray-900 sm:gap-4">
          <button className="font-semibold">1D</button>
          <button>1W</button>
          <button>1M</button>
          <button>1Y</button>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm sm:px-4">
          Price
          <ChevronLeftIcon className="w-4 h-4 rotate-[-90deg]" />
        </button>
      </div>

      <div className="relative h-[360px] overflow-hidden rounded-[28px] bg-[#f6f8fc] border border-gray-100 p-3 sm:h-[420px] sm:p-4 lg:h-[560px] lg:p-6">
        <ExpandedChart color={positive ? '#2563eb' : '#ef4444'} seed={seed} basePrice={basePrice} range="1D" />
      </div>
    </div>
  )
}

const metrics = [
  { label: 'TVL', value: '$1.4B' },
  { label: 'Market cap', value: '$312.9B' },
  { label: 'FDV', value: '$312.9B' },
  { label: 'Vol 24h', value: '$1.0B' },
]

const balances = [
  { label: 'Your balance', amount: '$1.04', detail: '<0.001' },
  { label: 'On other networks', amount: '$1.69', detail: '<0.001' },
]

const infoLinks = ['Etherscan', 'Website', 'Twitter']

const CryptoDetail = () => {
  const { symbol } = useParams()
  const navigate = useNavigate()
  const [crypto, setCrypto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState('0.00')
  const [sellToken, setSellToken] = useState(null)
  const [buyToken, setBuyToken] = useState(null)
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [activeTokenPicker, setActiveTokenPicker] = useState(null)

  const swapTokens = useMemo(() => {
    if (!crypto) return []

    return [
      {
        symbol: crypto.symbol,
        name: crypto.name,
        price: Number(crypto.price || 0),
        color: 'var(--coinbase-blue)',
        image: crypto.image || null,
      },
      {
        symbol: 'GHS',
        name: 'Ghana Cedi',
        price: 1,
        color: '#111827',
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        price: 1,
        color: '#2563eb',
      },
    ]
  }, [crypto])

  const activeSellToken = sellToken || swapTokens[0]
  const activeBuyToken = buyToken || swapTokens[1]

  const formatSwapAmount = (value) => {
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return ''
    if (numeric === 0) return '0'
    if (numeric < 0.01) return numeric.toFixed(6)
    if (numeric < 1) return numeric.toFixed(4)
    return numeric.toFixed(2)
  }

  const convertAmount = (value, fromToken, toToken) => {
    const numeric = Number(value)
    if (!fromToken || !toToken || Number.isNaN(numeric)) return ''
    const converted = (numeric * Number(fromToken.price || 1)) / Number(toToken.price || 1)
    return formatSwapAmount(converted)
  }

  const handleSellAmountChange = (value) => {
    setSellAmount(value)
    setBuyAmount(convertAmount(value, activeSellToken, activeBuyToken))
  }

  const handleBuyAmountChange = (value) => {
    setBuyAmount(value)
    setSellAmount(convertAmount(value, activeBuyToken, activeSellToken))
  }

  const handlePickToken = (role, token) => {
    if (role === 'sell') {
      setSellToken(token)
      if (sellAmount) setBuyAmount(convertAmount(sellAmount, token, activeBuyToken))
    } else {
      setBuyToken(token)
      if (buyAmount) setSellAmount(convertAmount(buyAmount, token, activeSellToken))
    }
    setActiveTokenPicker(null)
  }

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const data = await getAllCryptos()
        const list = Array.isArray(data) ? data : (data?.cryptos || data?.data || [])
        const found = list.find((c) => c.symbol === symbol)

        if (found) {
          setCrypto(found)
        } else {
          navigate('/explore')
        }
      } catch (err) {
        console.error('Failed to fetch crypto:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCrypto()
  }, [symbol, navigate])

  useEffect(() => {
    if (!crypto || swapTokens.length === 0) return
    setSellToken((current) => current || swapTokens[0])
    setBuyToken((current) => current || swapTokens[1])
  }, [crypto, swapTokens])

  const handleAmountChange = (e) => {
    const val = e.target.value
    setAmount(val)

    if (val && crypto) {
      const num = parseFloat(val)
      setTotal(Number.isNaN(num) ? '0.00' : (num * crypto.price).toFixed(2))
    } else {
      setTotal('0.00')
    }
  }

  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    alert(`${tradeType === 'buy' ? 'Buy' : 'Sell'} order placed for ${amount} ${crypto?.symbol}!\n\nTotal: GHS ${total}`)
    setAmount('')
    setTotal('0.00')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-gray-600">
        Loading crypto details...
      </div>
    )
  }

  if (!crypto) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center text-gray-600">
        Crypto not found
      </div>
    )
  }

  const isPositive = (crypto.change24h || 0) >= 0
  const changeClass = isPositive ? 'text-green-600' : 'text-red-600'

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 pt-5 lg:px-8 lg:pt-7">
              <button
                onClick={() => navigate('/explore')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--coinbase-blue)] hover:opacity-80 transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Explore
              </button>

              <div className="mt-6 flex items-start gap-4 lg:gap-5">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shrink-0 text-white font-bold text-2xl" style={{ backgroundColor: crypto.image ? 'transparent' : 'var(--coinbase-blue)' }}>
                  {crypto.image ? (
                    <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                  ) : (
                    crypto.symbol?.[0]
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                    <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900">{crypto.name}</h1>
                    <span className="text-lg text-gray-500">{crypto.symbol}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
                      GHS {crypto.price?.toFixed(2) || '0.00'}
                    </div>
                    <div className={`flex items-center gap-1 text-base lg:text-lg font-semibold ${changeClass}`}>
                      {isPositive ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
                      {isPositive ? '+' : ''}{Number(crypto.change24h || 0).toFixed(2)}%
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    24h Change: <span className={changeClass}>GHS {((crypto.change24h || 0) / 100 * crypto.price).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 lg:px-8 py-6 lg:py-8 border-t border-gray-100">
              <PriceGraph seed={crypto.symbol} positive={isPositive} basePrice={Number(crypto.price || 0)} />

              <div className="mt-8">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-5">Stats</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-gray-900">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-5 space-y-4">
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-4 lg:p-5">
              <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-4">
                <span className="text-gray-900">Swap</span>
                <div className="flex gap-4">
                  <button className="text-gray-600 hover:text-gray-900">Limit</button>
                  <button className="text-gray-600 hover:text-gray-900">Send</button>
                  <button className="text-gray-600 hover:text-gray-900">Buy</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative rounded-2xl bg-[#f8fafc] border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">Sell</p>
                    <button
                      onClick={() => setActiveTokenPicker(activeTokenPicker === 'sell' ? null : 'sell')}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--coinbase-blue)] px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      {activeSellToken?.image ? (
                        <img src={activeSellToken.image} alt={activeSellToken.symbol} className="w-5 h-5 rounded-full object-cover" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] flex items-center justify-center">{activeSellToken?.symbol?.[0] || 'S'}</span>
                      )}
                      {activeSellToken?.symbol || 'Select token'}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={sellAmount}
                    onChange={(e) => handleSellAmountChange(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent text-4xl font-semibold text-gray-900 placeholder-gray-300 focus:outline-none"
                  />

                  {activeTokenPicker === 'sell' && (
                    <div className="absolute right-4 top-16 z-20 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                      {swapTokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => handlePickToken('sell', token)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xs font-bold text-gray-700" style={{ backgroundColor: token.color }}>
                            {token.image ? <img src={token.image} alt={token.symbol} className="h-full w-full object-cover" /> : token.symbol?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{token.symbol}</p>
                            <p className="text-xs text-gray-500">{token.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm">↓</div>
                </div>

                <div className="relative rounded-2xl bg-[#f8fafc] border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">Buy</p>
                    <button
                      onClick={() => setActiveTokenPicker(activeTokenPicker === 'buy' ? null : 'buy')}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900"
                    >
                      <span className="w-5 h-5 rounded-full bg-[var(--coinbase-blue)] text-white flex items-center justify-center text-[10px]">
                        {activeBuyToken?.symbol?.[0] || 'B'}
                      </span>
                      {activeBuyToken?.symbol || 'Buy'}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => handleBuyAmountChange(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent text-4xl font-semibold text-gray-900 placeholder-gray-300 focus:outline-none"
                  />
                  <div className="mt-2 text-sm text-gray-500">${buyAmount ? Number(buyAmount).toFixed(2) : '0'}</div>

                  {activeTokenPicker === 'buy' && (
                    <div className="absolute right-4 top-16 z-20 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                      {swapTokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => handlePickToken('buy', token)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xs font-bold text-gray-700" style={{ backgroundColor: token.color }}>
                            {token.image ? <img src={token.image} alt={token.symbol} className="h-full w-full object-cover" /> : token.symbol?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{token.symbol}</p>
                            <p className="text-xs text-gray-500">{token.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-500 px-1">
                  Rate: 1 {activeSellToken?.symbol || 'token'} = {formatSwapAmount((Number(activeSellToken?.price || 1) / Number(activeBuyToken?.price || 1)))} {activeBuyToken?.symbol || 'token'}
                </div>

                <button
                  onClick={handleTrade}
                  disabled={!sellAmount && !buyAmount}
                  className="w-full rounded-2xl bg-[var(--coinbase-blue)] py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Swap now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your balance</h3>
              <div className="space-y-4">
                {balances.map((balance) => (
                  <div key={balance.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{balance.label}</p>
                      <p className="mt-1 text-base font-semibold text-gray-900">{balance.amount}</p>
                    </div>
                    <div className="text-sm text-gray-500">{balance.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Info</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {infoLinks.map((item) => (
                  <span key={item} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">{item}</span>
                ))}
              </div>
              <p className="text-sm leading-6 text-gray-600">
                {crypto.name} is a demo crypto detail page styled after a lightweight exchange interface.
                It keeps the app’s live data and trading flow while presenting the page in a cleaner, lighter layout.
              </p>
            </div>

            <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${tradeType === 'buy' ? 'bg-[var(--coinbase-blue)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${tradeType === 'sell' ? 'bg-[var(--coinbase-blue)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Sell
                </button>
              </div>

              <label className="block text-sm text-gray-500 mb-2">Amount ({crypto.symbol})</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[var(--coinbase-blue)] focus:outline-none"
              />

              <div className="mt-4 rounded-2xl border border-gray-200 bg-[#f8fafc] p-4">
                <p className="text-sm text-gray-500">Total (GHS)</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{total}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {['100', '500', '1000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setAmount(val)
                      setTotal((parseFloat(val) * crypto.price).toFixed(2))
                    }}
                    className="rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    GHS {val}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTrade}
                className={`mt-4 w-full rounded-2xl py-3 font-semibold text-white transition-colors ${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {crypto.symbol}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                This is a demo. No real transactions will be processed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetail
