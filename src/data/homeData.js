import UsdcImage from '../assets/0_4mVyVaU6yLa--GR_.png';
import ReplaceBankImage from '../assets/Replace_Bank.png';
import BitcoinImage from '../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.png';

export const assetTabs = ['Tradable', 'Top gainers', 'New on Coinbase'];

export const initialAssetData = {
  Tradable: [
    { id: 'btc',  name: 'Bitcoin',   price: 730567.30, change: -0.30, color: '#F7931A', letter: '₿' },
    { id: 'eth',  name: 'Ethereum',  price: 21166.33,  change: -1.10, color: '#627EEA', letter: 'Ξ' },
    { id: 'usdt', name: 'Tether',    price: 10.77,     change:  0.00, color: '#26A17B', letter: '₮' },
    { id: 'bnb',  name: 'BNB',       price: 6686.94,   change: -1.45, color: '#F3BA2F', letter: 'B' },
    { id: 'xrp',  name: 'XRP',       price: 14.68,     change: -0.24, color: '#346AA9', letter: 'X' },
    { id: 'usdc', name: 'USDC',      price: 10.77,     change:  0.00, color: '#2775CA', letter: '$' },
  ],
  'Top gainers': [
    { id: 'prcl',  name: 'Parcl',              price: 0.23,     change: 48.76, color: '#00C896', letter: 'P' },
    { id: 'alcx',  name: 'Alchemix',           price: 70.14,    change: 31.79, color: '#6B6B6B', letter: 'A' },
    { id: 'farm',  name: 'Harvest Finance',    price: 153.59,   change: 17.84, color: '#8BC34A', letter: 'H' },
    { id: 'perp',  name: 'Perpetual Protocol', price: 0.56,     change: 15.08, color: '#00C8A0', letter: 'P' },
    { id: 'noice', name: 'Noice',              price: 0.000570, change: 13.92, color: '#CCCCCC', letter: 'N' },
    { id: 'sqd',   name: 'Subsquid',           price: 0.39,     change:  9.50, color: '#3D5AFE', letter: 'S' },
  ],
  'New on Coinbase': [
    { id: 'hype', name: 'Hyperliquid', price: 328.24, change: -0.83, color: '#00C896', letter: 'H' },
    { id: 'jup',  name: 'Jupiter',     price: 1.76,   change: -7.23, color: '#15EAC9', letter: 'J' },
    { id: 'ltr',  name: 'Lighter',     price: 11.77,  change: -5.21, color: '#555555', letter: 'L' },
    { id: 'sent', name: 'Sentient',    price: 0.26,   change: -5.12, color: '#E91E63', letter: 'S' },
    { id: 'wal',  name: 'Walrus',      price: 0.78,   change: -3.80, color: '#00BFA5', letter: 'W' },
    { id: 'ray',  name: 'Raydium',     price: 6.21,   change: -0.14, color: '#6366F1', letter: 'R' },
  ],
};

export const articles = [
  {
    image: UsdcImage,
    imageAlt: 'USDC digital dollar illustration',
    title: 'USDC: The digital dollar for the global crypto economy...',
    description:
      'Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...',
    href: '/learn/usdc',
  },
  {
    image: ReplaceBankImage,
    imageAlt: 'Can crypto replace your bank illustration',
    title: 'Can crypto really replace your bank account?...',
    description:
      "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
    href: '/learn/crypto-vs-bank',
  },
  {
    image: BitcoinImage,
    imageAlt: 'Best time to invest in crypto illustration',
    title: 'When is the best time to invest in crypto?',
    description:
      'Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...',
    href: '/learn/best-time-to-invest',
  },
];
