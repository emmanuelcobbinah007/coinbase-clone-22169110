import React from 'react'
import { Link } from 'react-router-dom'
import CoinbaseLogo from '../../assets/coinbaseLogoNavigation-4.svg'

const FeatureSection = ({
  imageLeft = true,
  tag,
  heading,
  description,
  ctaLabel,
  ctaHref = '/',
  image,
  imageAlt = '',
  bgColor = '#ffffff',
}) => {
  const textBlock = (
    <div className="w-full lg:w-1/2 flex flex-col justify-center">
      {tag && (
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 mb-6 w-fit">
          <img src={CoinbaseLogo} alt="Coinbase" className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest text-gray-700 uppercase">{tag}</span>
        </div>
      )}

      <h2
        className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {heading}
      </h2>

      <p className="mt-5 text-base text-gray-500 max-w-md leading-relaxed">
        {description}
      </p>

      <Link
        to={ctaHref}
        className="inline-block mt-8 px-7 py-3.5 bg-gray-900 text-white text-md font-bold rounded-full hover:bg-gray-700 transition-colors w-fit"
      >
        {ctaLabel}
      </Link>
    </div>
  )

  const imageBlock = (
    <div className="w-full lg:w-1/2 flex justify-center">
      <img
        src={image}
        alt={imageAlt}
        className="w-full max-w-[560px] h-auto object-contain rounded-3xl"
      />
    </div>
  )

  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: bgColor }}>
      <div className={`max-w-7xl mx-auto flex items-center gap-16 lg:flex-row ${imageLeft ? 'flex-col' : 'flex-col-reverse'}`}>
        {imageLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  )
}

export default FeatureSection
