import React from 'react'
import HeroImage from '../../assets/Hero__4_.png'

const Hero = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto px-8 py-6 md:py-14 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Phone Image */}
        <div className="w-full lg:w-1/2">
          <img 
            src={HeroImage} 
            alt="Coinbase app preview" 
            className=" md:w-[1800px] lg:w-[1800px] h-auto object-contain rounded-4xl" 
          />
          <p className="text-xs text-gray-500 py-2">
            Stocks and prediction markets not available in your jurisdiction.
          </p>
        </div>

        {/* Right: Text + CTA */}
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            The future of finance is here.
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Trade crypto and more on a platform you can trust.
          </p>
          <form className="mt-8 flex flex-col md:flex-row items-center lg:items-start gap-3 w-full lg:w-2/3">
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

      </div>
    </section>
  )
}

export default Hero