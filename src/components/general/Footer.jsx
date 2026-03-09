import React from 'react'
import { Link } from 'react-router-dom'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import CoinbaseLogo from '../../assets/coinbaseLogoNavigation-4.svg'
import XIcon from '../../assets/x-light.svg'
import LinkedInIcon from '../../assets/linkedin-light.svg'
import InstagramIcon from '../../assets/instagram-light.svg'
import TikTokIcon from '../../assets/tiktok-light.svg'
import {
  company, learn, individuals, businesses, institutions,
  developers, support, assetPrices, stockPrices, socialLinks,
} from '../../data/footerData'

const FooterColumn = ({ title, links, titleBold = false }) => (
  <div className="flex flex-col gap-3 mb-8">
    <h3 className={`text-sm text-gray-900 mb-1 ${titleBold ? 'font-bold' : 'font-bold'}`}>{title}</h3>
    {links.map((link) => (
      <Link
        key={link.label}
        to={link.href}
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors leading-snug"
      >
        {link.label}
      </Link>
    ))}
  </div>
)

const socialIcons = { x: XIcon, linkedin: LinkedInIcon, instagram: InstagramIcon, tiktok: TikTokIcon }

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 px-8" style={{ backgroundColor: '#f1f2f4' }}>
      <div className="max-w-7xl mx-auto">

        {/* Main link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-0">

          {/* Column 1: Logo + Learn */}
          <div>
            <Link to="/" className="block mb-10">
              <img src={CoinbaseLogo} alt="Coinbase" className="w-8 h-8" />
            </Link>
            <FooterColumn title="Learn" links={learn} />
          </div>

          {/* Column 2: Company */}
          <div>
            <FooterColumn title="Company" links={company} />
          </div>

          {/* Column 3: Individuals + Businesses + Institutions */}
          <div>
            <FooterColumn title="Individuals" links={individuals} />
            <FooterColumn title="Businesses" links={businesses} />
            <FooterColumn title="Institutions" links={institutions} />
          </div>

          {/* Column 4: Developers */}
          <div>
            <FooterColumn title="Developers" links={developers} />
          </div>

          {/* Column 5: Support + Asset prices + Stock prices */}
          <div>
            <FooterColumn title="Support" links={support} />
            <FooterColumn title="Asset prices" links={assetPrices} />
            <FooterColumn title="Stock prices" links={stockPrices} />
          </div>

        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5 mt-4 mb-8">
          {socialLinks.map((s) => (
            <a
              key={s.alt}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.alt}
              className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
            >
              <img src={socialIcons[s.iconName]} alt={s.alt} className="w-full h-full object-contain" style={{ filter: 'brightness(0)' }} />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>© 2026 Not Coinbase</span>
            <span>•</span>
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms & Conditions</Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <GlobeAltIcon className="w-4 h-4" />
            <span>Global</span>
            <span>•</span>
            <span>English</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
