import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CtAImage from '../../assets/image.png'

const CtaSection = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className="w-full bg-white">
      <section className="w-full px-8 pt-30 pb-10">
        <div className="max-w-9xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left — text + form */}
          <div className="flex flex-col gap-6 lg:max-w-xl w-full">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Take control<br />of your money
            </h2>

            <p className="text-base text-gray-700">
              Start your portfolio today and discover crypto
            </p>

            <form className="mt-8 flex flex-col md:flex-row items-center lg:items-start gap-3 w-full">
            <input 
              type="email" 
              placeholder="satoshi@nakamoto.com" 
              className="w-full md:w-[400px] lg:flex-1 px-5 py-4 border border-gray-400 rounded-lg text-md focus:outline-none focus:border-gray-500 transition-colors hover:bg-gray-100" 
            />
            <button 
              type="submit" 
              className="w-full md:w-[200px] lg:w-auto px-8 py-4 text-white rounded-full text-md font-bold transition-colors hover:opacity-90 hover:cursor-pointer"
              style={{ backgroundColor: 'var(--coinbase-blue)' }}
            >
              Sign up
            </button>
          </form>
          </div>

          {/* Right — floating coin cluster */}
          <div className="relative w-full lg:w-[700px] lg:h-[600px] flex-shrink-0">
            <img className='w-full h-full object-contain' src={CtAImage} alt="Floating coins" />
          </div>

        </div>
      </section>

      {/* Disclaimer */}
      <div className="w-full px-8 pb-16 pt-26 text-center">
        <p className="text-xs text-gray-500 mb-3">
          DEX trading is offered by Coinbase Bermuda Technologies Ltd.
        </p>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Products and features may not be available in all regions. Information is for or informational purposes only,
          and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or shares,
          or to participate in any investment or trading strategy or (ii) intended to provide accounting, legal, or tax
          advice, or investment recommendations. Trading cryptocurrency comes with risk.
        </p>
      </div>
    </div>
  )
}

export default CtaSection
