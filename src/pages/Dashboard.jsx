import React from 'react'
import { Navigate } from 'react-router-dom'
import { getStoredAuthUser } from '../utils/auth'

const Dashboard = () => {
  const user = getStoredAuthUser()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return (
    <section className="min-h-[70vh] bg-[#f8f9fb] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">Your profile summary</p>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Name</p>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
