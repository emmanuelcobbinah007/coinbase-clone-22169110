import React from 'react'
import Hero from '../components/home/Hero'
import Assets from '../components/home/Assets'
import FeatureSection from '../components/home/FeatureSection'
import LearnSection from '../components/home/LearnSection'
import CtaSection from '../components/home/CtaSection'
import AdvancedImage from '../assets/Advanced.png'
import ZeroFeesImage from '../assets/zero_fees_us.png'
import BaseAppImage from '../assets/CB_LOLP__1_.png'

const Home = () => {
  return (
    <>
      <Hero />
      <Assets />
      <FeatureSection
        imageLeft={true}
        heading="Powerful tools, designed for the advanced trader."
        description="Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets."
        ctaLabel="Start trading"
        ctaHref="/advanced"
        image={AdvancedImage}
        imageAlt="Coinbase Advanced trading interface"
      />
      <FeatureSection
        imageLeft={false}
        tag="Coinbase One"
        heading="Zero trading fees, more rewards."
        description="Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more."
        ctaLabel="Claim free trial"
        ctaHref="/coinbase-one"
        image={ZeroFeesImage}
        imageAlt="Coinbase One - Zero trading fees"
      />
      <FeatureSection
        imageLeft={true}
        tag="Base App"
        heading="Countless ways to earn crypto with the Base App."
        description="An everything app to trade, create, discover, and chat, all in one place."
        ctaLabel="Learn more"
        ctaHref="/base-app"
        image={BaseAppImage}
        imageAlt="Base App"
      />
      <LearnSection />
      <CtaSection />
    </>
  )
}

export default Home