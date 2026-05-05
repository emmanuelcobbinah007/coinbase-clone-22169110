import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  UserCircleIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import CoinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg'
import { clearStoredAuthUser, getStoredAuthUser } from '../utils/auth'
import { getAllCryptos } from '../api/crypto'
import { getCreatedCoinSymbolsForUser } from '../utils/createdCoins'

const sideNavItems = [
  { key: 'profile', label: 'Profile', icon: UserCircleIcon, path: '/dashboard' },
  { key: 'security', label: 'Security', icon: ShieldCheckIcon, path: '/dashboard/in-progress/security' },
  { key: 'activity', label: 'Activity', icon: ChartBarSquareIcon, path: '/dashboard/in-progress/activity' },
  { key: 'statements', label: 'Statements', icon: DocumentTextIcon, path: '/dashboard/in-progress/statements' },
  { key: 'add-crypto', label: 'Add Crypto', icon: PlusCircleIcon, path: '/dashboard/add-crypto' },
  { key: 'created-coins', label: 'Created Coins', icon: DocumentTextIcon, path: '/dashboard/created-coins' },
]

const normalizeSymbol = (coin) => (coin?.ticker || coin?.symbol || '').toUpperCase()

const CreatedCoins = () => {
  const navigate = useNavigate()
  const user = getStoredAuthUser()

  const [allCoins, setAllCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  const createdSymbols = useMemo(
    () => new Set(getCreatedCoinSymbolsForUser(user?.email).map((s) => String(s).toUpperCase())),
    [user?.email]
  )

  const createdCoins = useMemo(
    () => allCoins.filter((coin) => createdSymbols.has(normalizeSymbol(coin))),
    [allCoins, createdSymbols]
  )

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const coins = await getAllCryptos()
        if (mounted) {
          setAllCoins(Array.isArray(coins) ? coins : [])
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load coins.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const handleSignOut = () => {
    clearStoredAuthUser()
    navigate('/signin')
  }

  return (
    <section className="min-h-screen bg-[#f5f7fb] p-0">
      <div className="w-full min-h-screen border-0 bg-white overflow-hidden">
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-[220px] border-r border-gray-200 bg-[#fbfcff] p-4 lg:p-5 z-20">
          <button
            onClick={() => navigate('/')}
            className="hover:cursor-pointer mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={CoinbaseLogo} alt="Coinbase" className="h-7 w-7" />
            <p className="text-lg font-semibold text-gray-900">ACCOUNT</p>
          </button>

          <nav className="space-y-2">
            {sideNavItems.map((item) => {
              const Icon = item.icon
              const active = item.key === 'created-coins'

              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                    active
                      ? 'bg-blue-50 text-[var(--coinbase-blue)] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {isDrawerOpen ? (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/35"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close menu overlay"
            />

            <div className="absolute inset-y-0 left-0 w-[260px] border-r border-gray-200 bg-[#fbfcff] p-4">
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false)
                    navigate('/')
                  }}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img src={CoinbaseLogo} alt="Coinbase" className="h-7 w-7" />
                  <p className="text-lg font-semibold text-gray-900">ACCOUNT</p>
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="h-9 w-9 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {sideNavItems.map((item) => {
                  const Icon = item.icon
                  const active = item.key === 'created-coins'

                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setIsDrawerOpen(false)
                        navigate(item.path)
                      }}
                      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                        active
                          ? 'bg-blue-50 text-[var(--coinbase-blue)] font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        ) : null}

        <div className="bg-white lg:ml-[220px] min-h-screen flex flex-col">
          <div className="fixed top-0 right-0 left-0 lg:left-[220px] z-10 flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 bg-white">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors lg:hidden"
              aria-label="Open dashboard menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
            <button className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <QuestionMarkCircleIcon className="h-5 w-5" />
            </button>
            <button className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-cyan-500 text-white font-semibold flex items-center justify-center">
              {userInitial}
            </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl px-4 pt-24 pb-8 sm:px-8 sm:pt-28 sm:pb-10 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">My Created Coins</h1>
                <p className="mt-2 text-gray-600">Coins you created from the dashboard add form.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/dashboard/add-crypto')}
                className="rounded-full bg-[var(--coinbase-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Add another
              </button>
            </div>

            <div className="mt-7 rounded-2xl border border-gray-200 bg-white overflow-hidden">
              {isLoading ? (
                <p className="px-5 py-6 text-sm text-gray-500">Loading your created coins...</p>
              ) : errorMessage ? (
                <p className="px-5 py-6 text-sm text-red-600">{errorMessage}</p>
              ) : createdCoins.length === 0 ? (
                <div className="px-5 py-8">
                  <p className="text-sm text-gray-600">You have not created any coins yet.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard/add-crypto')}
                    className="mt-3 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Go to Add Crypto
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {createdCoins.map((coin) => {
                    const symbol = normalizeSymbol(coin)
                    const name = coin?.name || 'Unnamed coin'
                    const price = Number(coin?.price)
                    const change = Number(coin?.change ?? coin?.change24h ?? 0)
                    const detailPath = symbol ? `/crypto/${symbol}` : '/explore'

                    return (
                      <div key={`${symbol}-${name}`} className="px-5 py-4 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex items-center gap-3">
                          {coin?.image ? (
                            <img
                              src={coin.image}
                              alt={name}
                              className="h-10 w-10 rounded-full object-cover border border-gray-200"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold border border-gray-200">
                              {symbol?.slice(0, 2) || 'CO'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                            <p className="text-xs text-gray-500 truncate">{symbol || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {Number.isFinite(price) ? `GHS ${price.toLocaleString()}` : 'GHS —'}
                          </p>
                          <p className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Number.isFinite(change) ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—'}
                          </p>
                        </div>
                        <Link
                          to={detailPath}
                          className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSignOut}
                className="rounded-full bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreatedCoins