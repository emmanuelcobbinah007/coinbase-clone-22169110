export const languages = [
  { lang: "English", region: "Global", selected: true },
  { lang: "Español", region: "United States", selected: false },
  { lang: "English", region: "United States", selected: false },
  { lang: "Deutsch", region: "Germany", selected: false },
];

export const searchTabs = ['Top', 'Crypto', 'Stocks', 'Predictions', 'Perpetuals', 'Futures'];

export const searchData = {
  CRYPTO: [
    { rank: 1,  name: 'Bitcoin',  ticker: 'BTC',   color: '#f7931a', letter: '₿', vol: '25.9B', mcap: '1.4T',   price: '67,533.88', change: -0.86 },
    { rank: 2,  name: 'Ethereum', ticker: 'ETH',   color: '#627eea', letter: '◆', vol: '12.2B', mcap: '235.2B', price: '1,949.89',  change: -1.94 },
    { rank: 3,  name: 'Tether',   ticker: 'USDT',  color: '#26a17b', letter: 'T', vol: '52.8B', mcap: '184B',   price: '1.00',      change:  0.00 },
  ],
  STOCKS: [
    { name: 'NVIDIA',            ticker: 'NVDA',  color: '#76b900', letter: 'N', vol: '189.6M', mcap: '4.3T', price: '178.03', change: -2.90 },
    { name: 'Apple',             ticker: 'AAPL',  color: '#555555', letter: '', vol: '41.2M',  mcap: '3.8T', price: '257.00', change: -1.26 },
    { name: 'Alphabet Inc. Class A', ticker: 'GOOGL', color: '#4285f4', letter: 'G', vol: '25.6M', mcap: '3.6T', price: '297.13', change: -1.25 },
  ],
  PREDICTIONS: [
    { name: 'Avoid Price decline: Will Bitcoin drop 5%?', ticker: '', color: '#888', letter: '?', vol: '', mcap: '', price: '', change: 53 },
  ],
};

export const navbarElements = [
  {
    title: "Individuals",
    subElements: [
      { name: "Buy and sell", description: "Buy, sell, and use crypto" },
      { name: "Advanced", description: "Professional-grade trading tools" },
      { name: "Base App", description: "Post, earn, trade, and chat, all in one place" },
      { name: "Earn", description: "Stake your crypto and earn rewards" },
      { name: "Coinbase One", description: "Get zero trading fees and more" },
      { name: "Coinbase Wealth", description: "Institutional-grade services for UHNW" },
      { name: "Private Client", description: "For trusts, family offices, UHNWIs" },
      { name: "Credit Card", description: "Earn up to 4% bitcoin back" },
      { name: "Onchain", description: "Dive into the world of onchain apps" },
      { name: "Debit Card", description: "Spend crypto, get crypto back" },
    ],
  },
  {
    title: "Businesses",
    subElements: [
      { name: "Business", description: "Crypto trading and payments for startups and SMBs" },
      { name: "Payments", description: "The stablecoin payments stack for commerce platforms" },
      { name: "Asset Listings", description: "List your asset on Coinbase" },
      { name: "Token Manager", description: "The platform for token distributions, vesting, and lockups" },
    ],
  },
  {
    title: "Institutions",
    subElements: [
      { name: "Trading and Financing", description: "Professional prime brokerage services" },
      { name: "Exchange", description: "Spot markets for high-frequency trading" },
      { name: "Custody", description: "Securely store all your digital assets" },
      { name: "International Exchange", description: "Access perpetual futures markets" },
      { name: "Staking", description: "Explore staking across our products" },
      { name: "Derivatives Exchange", description: "Trade an accessible futures market" },
      { name: "Onchain Wallet", description: "Institutional-grade wallet to get onchain" },
      { name: "Verified Pools", description: "Transparent, verified liquidity pools" },
    ],
  },
  {
    title: "Developers",
    subElements: [
      { name: "Payments", description: "Fast and global stablecoin payments with a single integration" },
      { name: "Banks & Brokerages", description: "Secure, regulated offerings for retail, private banking, & institutional clients" },
      { name: "Trading", description: "Launch crypto trading and custody for your users" },
      { name: "Payment Firms", description: "Near-instant, low-cost, global payment rails for modern providers" },
      { name: "Wallets", description: "Deploy customizable and scalable wallets for your business" },
      { name: "Startups", description: "Launch your business with the world's leader in crypto" },
      { name: "Stablecoins", description: "Access USDC and Coinbase Custom Stablecoins" },
    ],
  },
  {
    title: "Company",
    subElements: [
      { name: "About", description: "Powering the crypto economy" },
      { name: "Careers", description: "Work with us" },
      { name: "Affiliates", description: "Help introduce the world to crypto" },
      { name: "Support", description: "Find answers to your questions" },
      { name: "Blog", description: "Read the latest from Coinbase" },
      { name: "Security", description: "The most trusted & secure" },
    ],
  },
];
