import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getStoredAuthUser } from '../utils/auth'
import CoinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg'
import {
  UserCircleIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
  WrenchScrewdriverIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

const PageInProgress = () => {
  const navigate = useNavigate()
  const { section } = useParams()
  const user = getStoredAuthUser()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  // If profile is requested, the profile page already exists at /dashboard
  if (section === 'profile') {
    return <Navigate to="/dashboard" replace />
  }

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  const sideNavItems = [
    { key: 'profile', label: 'Profile', icon: UserCircleIcon, section: 'profile' },
    { key: 'security', label: 'Security', icon: ShieldCheckIcon, section: 'security' },
    { key: 'activity', label: 'Activity', icon: ChartBarSquareIcon, section: 'activity' },
    { key: 'statements', label: 'Statements', icon: DocumentTextIcon, section: 'statements' },
    { key: 'add-crypto', label: 'Add Crypto', icon: PlusCircleIcon, section: 'add-crypto' },
    { key: 'created-coins', label: 'Created Coins', icon: DocumentTextIcon, section: 'created-coins' },
  ]

  const label = section
    ? section
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'This page'

  const goToInProgressPage = (nextSection, closeDrawer = false) => {
    if (nextSection === 'add-crypto') {
      navigate('/dashboard/add-crypto')
    } else if (nextSection === 'created-coins') {
      navigate('/dashboard/created-coins')
    } else {
      navigate(`/dashboard/in-progress/${nextSection}`)
    }

    if (closeDrawer) {
      setIsDrawerOpen(false)
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
            {sideNavItems.map((item, index) => {
              const Icon = item.icon
              const active = item.section === section || (!section && index === 0)

              return (
                <button
                  key={item.key}
                  onClick={() => goToInProgressPage(item.section)}
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
                {sideNavItems.map((item, index) => {
                  const Icon = item.icon
                  const active = item.section === section || (!section && index === 0)

                  return (
                    <button
                      key={item.key}
                      onClick={() => goToInProgressPage(item.section, true)}
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

          <div className="flex-1 px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
            <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl items-center justify-center">
              <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
                <div className="mb-6 flex items-center gap-3 text-gray-500">
                  <WrenchScrewdriverIcon className="h-6 w-6" />
                  <span className="text-sm font-medium uppercase tracking-[0.2em]">Page in progress</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {label} is being built
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                  This section is still in progress. You can come back later, or return to the dashboard to
                  continue browsing the profile area.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="rounded-full bg-[var(--coinbase-blue)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    Back to dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Go to homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageInProgress