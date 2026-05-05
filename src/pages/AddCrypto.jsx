import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
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
import { createCrypto } from '../api/crypto'
import { trackCreatedCoinForUser } from '../utils/createdCoins'

const sideNavItems = [
  { key: 'profile', label: 'Profile', icon: UserCircleIcon, path: '/dashboard' },
  { key: 'security', label: 'Security', icon: ShieldCheckIcon, path: '/dashboard/in-progress/security' },
  { key: 'activity', label: 'Activity', icon: ChartBarSquareIcon, path: '/dashboard/in-progress/activity' },
  { key: 'statements', label: 'Statements', icon: DocumentTextIcon, path: '/dashboard/in-progress/statements' },
  { key: 'add-crypto', label: 'Add Crypto', icon: PlusCircleIcon, path: '/dashboard/add-crypto' },
  { key: 'created-coins', label: 'Created Coins', icon: DocumentTextIcon, path: '/dashboard/created-coins' },
]

const AddCrypto = () => {
  const navigate = useNavigate()
  const user = getStoredAuthUser()

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignOut = () => {
    clearStoredAuthUser()
    navigate('/signin')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const payload = {
      name: formData.name.trim(),
      symbol: formData.symbol.trim().toUpperCase(),
      price: Number(formData.price),
      image: formData.image.trim(),
      change24h: formData.change24h === '' ? 0 : Number(formData.change24h),
    }

    if (!payload.name || !payload.symbol || Number.isNaN(payload.price) || !payload.image) {
      setErrorMessage('Please fill in name, symbol, price, and image.')
      return
    }

    if (Number.isNaN(payload.change24h)) {
      setErrorMessage('24h change must be a valid number.')
      return
    }

    setIsSubmitting(true)

    try {
      await createCrypto(payload)
      trackCreatedCoinForUser(user?.email, payload.symbol)
      setSuccessMessage(`${payload.name} (${payload.symbol}) added successfully.`)
      setFormData({
        name: '',
        symbol: '',
        price: '',
        image: '',
        change24h: '',
      })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add cryptocurrency.')
    } finally {
      setIsSubmitting(false)
    }
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
              const active = item.key === 'add-crypto'

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
                  const active = item.key === 'add-crypto'

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

          <div className="mx-auto w-full max-w-3xl px-4 pt-24 pb-8 sm:px-8 sm:pt-28 sm:pb-10 flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Add New Cryptocurrency</h1>
            <p className="mt-2 text-gray-600">
              School-project mode: add a crypto directly from your dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Bitcoin"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Symbol
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    placeholder="BTC"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm uppercase focus:border-blue-500 focus:outline-none"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                  Price
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="any"
                    min="0"
                    placeholder="65000"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  24h Change (%)
                  <input
                    type="number"
                    name="change24h"
                    value={formData.change24h}
                    onChange={handleChange}
                    step="any"
                    placeholder="2.5"
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Image URL
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </label>

              {errorMessage ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                  {successMessage}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[var(--coinbase-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Adding...' : 'Add Crypto'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  View Explore
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="ml-auto rounded-full bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddCrypto
