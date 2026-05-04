import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { clearStoredAuthUser, getStoredAuthUser } from '../utils/auth'

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

  const handleSignOut = () => {
    clearStoredAuthUser()
    navigate('/signin')
  }

  return (
    <section className="min-h-[70vh] bg-[#f8f9fb] px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.name || 'User'}.</p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Explore
            </Link>
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Name</p>
            <p className="text-lg font-semibold text-gray-900 break-words">{user.name || 'N/A'}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900 break-all">{user.email}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Account status</p>
            <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
              Active
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Member since</p>
            <p className="text-lg font-semibold text-gray-900">{joinedLabel}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
