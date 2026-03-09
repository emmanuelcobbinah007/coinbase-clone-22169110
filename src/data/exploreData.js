export const cryptoAssets = [
  { name: "Bitcoin",   ticker: "BTC",  price: 721269.34, change: -1.04, mktCap: "14.4T",  volume: "318.8B", color: "#F7931A", letter: "₿" },
  { name: "Ethereum",  ticker: "ETH",  price: 20850.19,  change: -1.96, mktCap: "2.5T",   volume: "149.6B", color: "#627EEA", letter: "Ξ" },
  { name: "Tether",    ticker: "USDT", price: 10.77,     change:  0.01, mktCap: "2.0T",   volume: "613.6B", color: "#26A17B", letter: "₮", badge: null },
  { name: "BNB",       ticker: "BNB",  price: 6612.87,   change: -1.46, mktCap: "901.3B", volume: "13.5B",  color: "#F3BA2F", letter: "B" },
  { name: "XRP",       ticker: "XRP",  price: 14.51,     change: -0.87, mktCap: "886.7B", volume: "15.5B",  color: "#346AA9", letter: "X" },
  { name: "USDC",      ticker: "USDC", price: 10.77,     change:  0.00, mktCap: "832.3B", volume: "57.9B",  color: "#2775CA", letter: "$", badge: "Earns 3.35% APY" },
  { name: "Solana",    ticker: "SOL",  price: 880.58,    change: -1.93, mktCap: "502.4B", volume: "25.1B",  color: "#000000", letter: "S" },
  { name: "TRON",      ticker: "TRX",  price: 3.11,      change: -0.84, mktCap: "267.4B", volume: "6.1B",   color: "#FF0013", letter: "T" },
  { name: "Dogecoin",  ticker: "DOGE", price: 0.95,      change: -1.73, mktCap: "146.3B", volume: "7.9B",   color: "#C3A634", letter: "D" },
  { name: "Cardano",   ticker: "ADA",  price: 2.69,      change: -2.27, mktCap: "97.2B",  volume: "3.7B",   color: "#0033AD", letter: "A" },
  { name: "Chainlink", ticker: "LINK", price: 96.42,     change: -2.11, mktCap: "62.6B",  volume: "5.9B",   color: "#2A5ADA", letter: "L" },
  { name: "Avalanche", ticker: "AVAX", price: 152.30,    change: -3.01, mktCap: "58.2B",  volume: "4.2B",   color: "#E84142", letter: "A" },
  { name: "Shiba Inu", ticker: "SHIB", price: 0.000092,  change: -2.58, mktCap: "54.1B",  volume: "3.1B",   color: "#FFA409", letter: "S" },
  { name: "Polkadot",  ticker: "DOT",  price: 32.80,     change: -1.58, mktCap: "47.9B",  volume: "2.4B",   color: "#E6007A", letter: "P" },
  { name: "Bitcoin Cash", ticker: "BCH",  price: 2456.12,   change: -1.12, mktCap: "46.8B",  volume: "3.8B",   color: "#8DC351", letter: "B" },
  { name: "Uniswap",   ticker: "UNI",  price: 58.70,     change: -2.84, mktCap: "35.1B",  volume: "2.1B",   color: "#FF007A", letter: "U" },
  { name: "Litecoin",  ticker: "LTC",  price: 623.45,    change:  1.23, mktCap: "46.3B",  volume: "4.5B",   color: "#345D9D", letter: "L" },
  { name: "Stellar",   ticker: "XLM",  price: 2.34,      change: -0.56, mktCap: "31.4B",  volume: "1.8B",   color: "#14B6E7", letter: "S" },
  { name: "Cosmos",    ticker: "ATOM", price: 42.10,     change: -1.67, mktCap: "12.5B",  volume: "1.3B",   color: "#2E3148", letter: "A" },
  { name: "Polygon",   ticker: "POL",  price: 5.42,      change: -2.10, mktCap: "45.8B",  volume: "2.9B",   color: "#8247E5", letter: "P" },
];

export const marketStats = [
  { label: "Total market cap",  value: "GHS 23.99T", change: -1.27, chartColor: "#ef4444" },
  { label: "Trade volume",      value: "GHS 1.26T",  change: 17.43, chartColor: "#22c55e" },
  { label: "Buy-sell ratio",    value: "GHS 0.76",   change: -1.69, chartColor: "#ef4444" },
  { label: "BTC dominance",     value: "60.16%",     change: 0.15,  chartColor: "#22c55e" },
];

export const topMovers = [
  { ticker: "ALCX",  name: "Alchemix",    change: -26.22, price: "GHS 63.03", color: "#6B6B6B", letter: "A" },
  { ticker: "PLUME", name: "Plume",        change: 18.46,  price: "GHS 0.15",  color: "#FF6B35", letter: "P" },
  { ticker: "SHPING",name: "Shping",       change: -17.32, price: "GHS 0.02",  color: "#E91E63", letter: "S" },
  { ticker: "PRCL",  name: "Parcl",        change: 14.59,  price: "GHS 0.23",  color: "#00C896", letter: "P" },
];

export const newOnCoinbase = [
  { ticker: "HYPE",    name: "Hyperliquid", date: "Added Feb 5",  color: "#00C896", letter: "H" },
  { ticker: "JUPITER", name: "Jupiter",     date: "Added Dec 9",  color: "#15EAC9", letter: "J" },
  { ticker: "LIGHT",   name: "Lighter",     date: "Added Nov 28", color: "#555555", letter: "L" },
];

export const ROWS_PER_PAGE = 10;
export const TOTAL_ASSETS = 18560;

export const formatPrice = (price) => {
  if (price < 0.001) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const getChangeColor = (val) =>
  val > 0 ? "text-green-600" : val < 0 ? "text-red-500" : "text-gray-500";

export const getChangeArrow = (val) => (val > 0 ? "↗" : val < 0 ? "↙" : "");

export const getChartType = (val) => (val === 0 ? "flat" : "line");

export const getChartColor = (val) => (val > 0 ? "#22c55e" : val < 0 ? "#ef4444" : "#9ca3af");

export const parseAbbreviated = (str) => {
  const num = parseFloat(str);
  if (isNaN(num)) return 0;
  if (str.endsWith("T")) return num * 1e12;
  if (str.endsWith("B")) return num * 1e9;
  if (str.endsWith("M")) return num * 1e6;
  return num;
};
