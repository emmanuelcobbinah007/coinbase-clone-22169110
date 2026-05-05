import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { clearStoredAuthUser, getStoredAuthUser } from '../utils/auth'
import CoinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg'
import {
  UserCircleIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  DocumentTextIcon,
  PhoneIcon,
  IdentificationIcon,
  UserIcon,
  HomeModernIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

const sideNavItems = [
  { key: 'profile', label: 'Profile', icon: UserCircleIcon, section: 'profile' },
  { key: 'security', label: 'Security', icon: ShieldCheckIcon, section: 'security' },
  { key: 'activity', label: 'Activity', icon: ChartBarSquareIcon, section: 'activity' },
  { key: 'statements', label: 'Statements', icon: DocumentTextIcon, section: 'statements' },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const user = getStoredAuthUser()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  const joinedLabel = new Date().toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  const profileRows = [
    {
      key: 'phone',
      icon: PhoneIcon,
      title: 'Phone Number',
      value: 'xxxxxxx60',
    },
    {
      key: 'legalName',
      icon: IdentificationIcon,
      title: 'Legal Name',
      value: user.name || 'Not set',
    },
    {
      key: 'displayName',
      icon: UserIcon,
      title: 'Display Name',
      value: user.name || 'User',
    },
    {
      key: 'address',
      icon: HomeModernIcon,
      title: 'Residential Address',
      value: 'Not set',
    },
    {
      key: 'email',
      icon: EnvelopeIcon,
      title: 'Email Address',
      value: user.email,
    },
    {
      key: 'dob',
      icon: CalendarDaysIcon,
      title: 'Date of birth',
      value: 'xx/xx/xx99',
    },
    {
      key: 'timezone',
      icon: ClockIcon,
      title: 'Time zone',
      value: 'Pacific Time (US & Canada)',
    },
    {
      key: 'currency',
      icon: CurrencyDollarIcon,
      title: 'Currency',
      value: 'GHS',
    },
  ]

  const handleSignOut = () => {
    clearStoredAuthUser()
    navigate('/signin')
  }

  const goToInProgressPage = (section) => {
    navigate(`/dashboard/in-progress/${section}`)
  }

  return (
    <section className="min-h-screen bg-[#f5f7fb] p-0">
      <div className="w-full min-h-screen border-0 bg-white overflow-hidden">
        {/* Fixed Sidebar */}
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
              const active = index === 0

              return (
                <button
                  key={item.key}
                  onClick={() => (item.section === 'profile' ? navigate('/dashboard') : goToInProgressPage(item.section))}
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

        <div className="bg-white lg:ml-[220px] min-h-screen flex flex-col">
          <div className="fixed top-0 right-0 left-0 lg:left-[220px] z-10 flex items-center justify-end gap-2 border-b border-gray-200 px-4 py-3 sm:px-6 bg-white">
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

            <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-8 sm:py-10 flex-1 mt-18">
              <div className="text-center mb-8">
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-blue-500 text-white text-3xl font-medium flex items-center justify-center">
                  {userInitial}
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{user.name || 'User'}</h1>
                <p className="mt-2 text-sm text-gray-500">Member since {joinedLabel}</p>
              </div>

              <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
                {profileRows.map((row) => {
                  const Icon = row.icon
                  return (
                    <button
                      key={row.key}
                      onClick={() => goToInProgressPage(row.key)}
                      className="w-full px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <Icon className="h-5 w-5 text-gray-500 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xl font-semibold text-gray-900 leading-tight">{row.title}</p>
                          <p className="text-lg text-gray-500 truncate mt-0.5">{row.value}</p>
                        </div>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 shrink-0" />
                    </button>
                  )
                })}
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

export default Dashboard
