import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CoinbaseLogo from '../assets/coinbaseLogoNavigation-4.svg'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [cookieDismissed, setCookieDismissed] = useState(false)

  const handleContinue = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0b0d' }}>
      {/* Top-left logo */}
      <div className="px-6 py-5">
        <Link to="/">
          <img src={CoinbaseLogo} alt="Coinbase" className="w-10 h-10" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>
      </div>

      {/* Centered form */}
      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-white text-center mb-8">
            Create your account
          </h1>

          <form onSubmit={handleContinue} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white font-medium">
                Email<span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-4 rounded-xl text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ backgroundColor: '#1c1d20', border: '1px solid #2e2f33' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#3d5af1' }}
            >
              Continue
            </button>
          </form>

          {/* OR divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: '#2e2f33' }} />
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#2e2f33' }} />
          </div>

          {/* Social sign-up */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'Continue with Passkey', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/><circle cx="18" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
              )},
              { label: 'Continue with Google', icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              )},
              { label: 'Continue with Apple', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              )},
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-white text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#1c1d20', border: '1px solid #2e2f33' }}
              >
                <span className="w-6 flex items-center justify-center">{icon}</span>
                <span className="flex-1 text-center">{label}</span>
              </button>
            ))}
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-white font-semibold mt-8">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-400 hover:underline">Sign in</Link>
          </p>

          {/* Private window note */}
          <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
            Not your device? Use a private window. See our{' '}
            <Link to="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>{' '}for more info.
          </p>
        </div>
      </div>

      {/* Cookie banner */}
      {!cookieDismissed && (
        <div className="fixed bottom-0 left-0 right-0 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: '#1c1d20', borderTop: '1px solid #2e2f33' }}>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            We use strictly necessary cookies to enable essential functions, such as security and authentication.{' '}
            <strong>For more information, see our{' '}</strong>
            <Link to="/cookie-policy" className="text-blue-400 underline">Cookie Policy</Link>.
          </p>
          <button
            onClick={() => setCookieDismissed(true)}
            className="px-6 py-2.5 rounded-full text-white text-sm font-bold flex-shrink-0 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3d5af1' }}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}

export default SignUp