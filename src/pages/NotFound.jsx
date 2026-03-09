import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorIllustration from '../assets/errorWeb404-6.svg'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-8 text-center">

      {/* Official Coinbase 404 illustration */}
      <img src={ErrorIllustration} alt="Page not found" className="w-60 h-60 mb-6 select-none" />

      {/* Error ID */}
      <p className="text-xs text-gray-400 mb-4 tracking-wide font-mono">
        {Date.now()}
      </p>

      {/* Heading */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">Page Coming Soon.</h1>

      {/* Subtext */}
      <p className="text-sm text-gray-500 mb-8 max-w-xs">
        The page you're looking for is in development.
      </p>

      {/* Go back button */}
      <button
        onClick={() => navigate(-1)}
        className="px-10 py-3.5 text-white font-bold rounded-full hover:opacity-90 transition-opacity"
        style={{ backgroundColor: 'var(--coinbase-blue)' }}
      >
        Go back
      </button>

    </div>
  )
}

export default NotFound
