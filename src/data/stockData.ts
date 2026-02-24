import type { Holdings, Position, Stock,Trade } from "../types/stock.types";
 
export const stocks: Stock[] = [
  // ... existing 5 stocks
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp',
    price: 191.55, change: 1.73, changePct: 0.91,
    volume: 171_584_839, marketCap: 4_654_665_074_157, sector: 'Technology' },
  { id: '7', symbol: 'AMZN', name: 'Amazon.com Inc',
    price: 205.27, change: -4.84, changePct: -2.30,
    volume: 53_491_300, marketCap: 2_203_555_021_564, sector: 'Consumer Discretionary' },
  { id: '8', symbol: 'META', name: 'Meta Platforms Inc',
    price: 637.25, change: -18.41, changePct: -2.81,
    volume: 24_500_000, marketCap: 1_611_958_286_500, sector: 'Technology' },
  { id: '9', symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.',
    price: 494.09, change: -4.11, changePct: -0.82,
    volume: 3_560_000, marketCap: 1_065_298_800_800, sector: 'Financials' },
  { id: '10', symbol: 'LLY', name: 'Eli Lilly and Co',
    price: 1058.56, change: 49.04, changePct: 4.86,
    volume: 3_250_000, marketCap: 998_600_464_618, sector: 'Healthcare' },
  { id: '11', symbol: 'AVGO', name: 'Broadcom Inc',
    price: 330.34, change: -2.31, changePct: -0.69,
    volume: 17_660_000, marketCap: 1_566_232_435_796, sector: 'Technology' },
  { id: '12', symbol: 'V', name: 'Visa Inc',
    price: 306.52, change: -14.43, changePct: -4.50,
    volume: 6_830_000, marketCap: 584_229_857_739, sector: 'Financials' },
  { id: '13', symbol: 'UNH', name: 'UnitedHealth Group Inc',
    price: 282.34, change: -7.66, changePct: -2.64,
    volume: 7_247_495, marketCap: 255_754_467_006, sector: 'Healthcare' },
  { id: '14', symbol: 'XOM', name: 'Exxon Mobil Corp',
    price: 112.45, change: 0.85, changePct: 0.76,
    volume: 15_400_000, marketCap: 498_000_000_000, sector: 'Energy' },
  { id: '15', symbol: 'WMT', name: 'Walmart Inc',
    price: 175.20, change: 1.15, changePct: 0.66,
    volume: 12_800_000, marketCap: 615_000_000_000, sector: 'Consumer Staples' },
  { id: '16', symbol: 'MA', name: 'Mastercard Inc',
    price: 462.10, change: -2.45, changePct: -0.53,
    volume: 2_100_000, marketCap: 428_000_000_000, sector: 'Financials' },
  { id: '17', symbol: 'HD', name: 'Home Depot Inc',
    price: 355.80, change: -3.20, changePct: -0.89,
    volume: 3_900_000, marketCap: 352_000_000_000, sector: 'Consumer Discretionary' },
  { id: '18', symbol: 'PG', name: 'Procter & Gamble Co',
    price: 158.90, change: 0.45, changePct: 0.28,
    volume: 5_200_000, marketCap: 375_000_000_000, sector: 'Consumer Staples' },
  { id: '19', symbol: 'COST', name: 'Costco Wholesale Corp',
    price: 725.30, change: 5.60, changePct: 0.78,
    volume: 1_800_000, marketCap: 322_000_000_000, sector: 'Consumer Staples' },
  { id: '20', symbol: 'ABBV', name: 'AbbVie Inc',
    price: 178.40, change: -1.15, changePct: -0.64,
    volume: 4_300_000, marketCap: 315_000_000_000, sector: 'Healthcare' },
  { id: '21', symbol: 'KO', name: 'Coca-Cola Co',
    price: 61.25, change: 0.30, changePct: 0.49,
    volume: 11_200_000, marketCap: 265_000_000_000, sector: 'Consumer Staples' },
  { id: '22', symbol: 'BAC', name: 'Bank of America Corp',
    price: 38.15, change: 0.42, changePct: 1.11,
    volume: 35_600_000, marketCap: 298_000_000_000, sector: 'Finance' },
  { id: '23', symbol: 'ADBE', name: 'Adobe Inc',
    price: 585.60, change: -4.20, changePct: -0.71,
    volume: 2_400_000, marketCap: 262_000_000_000, sector: 'Technology' },
  { id: '24', symbol: 'NFLX', name: 'Netflix Inc',
    price: 610.15, change: 8.45, changePct: 1.40,
    volume: 3_100_000, marketCap: 264_000_000_000, sector: 'Communication Services' },
  { id: '25', symbol: 'ORCL', name: 'Oracle Corp',
    price: 128.40, change: 0.95, changePct: 0.74,
    volume: 8_700_000, marketCap: 351_000_000_000, sector: 'Technology' }
];

 
export const trades: Trade[] = [
  // --- TECHNOLOGY & AI ---
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY', 
    quantity: 10, price: 266.18, date: '2026-02-23' },
  { id: 't2', stockId: '2', symbol: 'NVDA', type: 'BUY', 
    quantity: 25, price: 191.55, date: '2026-02-23' },
  { id: 't3', stockId: '3', symbol: 'MSFT', type: 'BUY', 
    quantity: 15, price: 384.47, date: '2026-02-23' },
  { id: 't4', stockId: '4', symbol: 'AVGO', type: 'BUY', 
    quantity: 5,  price: 330.34, date: '2026-02-23' },
  { id: 't5', stockId: '5', symbol: 'ORCL', type: 'BUY', 
    quantity: 20, price: 184.20, date: '2026-02-23' },

  // --- INTERNET & COMM ---
  { id: 't6', stockId: '6', symbol: 'GOOGL', type: 'BUY', 
    quantity: 12, price: 311.69, date: '2026-02-23' },
  { id: 't7', stockId: '7', symbol: 'META', type: 'BUY', 
    quantity: 8,  price: 637.25, date: '2026-02-23' },
  { id: 't8', stockId: '8', symbol: 'NFLX', type: 'SELL', 
    quantity: 4,  price: 895.12, date: '2026-02-23' },

  // --- CONSUMER & RETAIL ---
  { id: 't9', stockId: '9', symbol: 'AMZN', type: 'BUY', 
    quantity: 10, price: 205.27, date: '2026-02-23' },
  { id: 't10', stockId: '10', symbol: 'TSLA', type: 'SELL', 
    quantity: 6,  price: 399.83, date: '2026-02-23' },
  { id: 't11', stockId: '11', symbol: 'COST', type: 'BUY', 
    quantity: 3,  price: 942.50, date: '2026-02-23' },

  // --- FINANCE & HEALTHCARE ---
  { id: 't12', stockId: '12', symbol: 'JPM', type: 'BUY', 
    quantity: 15, price: 245.10, date: '2026-02-23' },
  { id: 't13', stockId: '13', symbol: 'V', type: 'BUY', 
    quantity: 10, price: 318.45, date: '2026-02-23' },
  { id: 't14', stockId: '14', symbol: 'LLY', type: 'BUY', 
    quantity: 2,  price: 915.30, date: '2026-02-23' },
  { id: 't15', stockId: '15', symbol: 'UNH', type: 'BUY', 
    quantity: 5,  price: 582.60, date: '2026-02-23' },

  { id: 't16', stockId: '16', symbol: 'AMD', type: 'BUY', 
    quantity: 20, price: 164.85, date: '2026-02-23' },
  { id: 't17', stockId: '17', symbol: 'ASML', type: 'BUY', 
    quantity: 3,  price: 742.10, date: '2026-02-23' },
  { id: 't18', stockId: '18', symbol: 'ARM', type: 'BUY', 
    quantity: 30, price: 138.40, date: '2026-02-23' },

  // --- FINTECH & PAYMENTS ---
  { id: 't19', stockId: '19', symbol: 'MA', type: 'BUY', 
    quantity: 8,  price: 521.15, date: '2026-02-23' },
  { id: 't20', stockId: '20', symbol: 'PYPL', type: 'SELL', 
    quantity: 50, price: 84.30, date: '2026-02-23' },
  { id: 't21', stockId: '21', symbol: 'SQ', type: 'BUY', 
    quantity: 25, price: 92.75, date: '2026-02-23' },

  // --- ENERGY & INDUSTRIALS ---
  { id: 't22', stockId: '22', symbol: 'XOM', type: 'BUY', 
    quantity: 40, price: 112.90, date: '2026-02-23' },
  { id: 't23', stockId: '23', symbol: 'CVX', type: 'BUY', 
    quantity: 15, price: 158.45, date: '2026-02-23' },
  { id: 't24', stockId: '24', symbol: 'CAT', type: 'BUY', 
    quantity: 10, price: 345.20, date: '2026-02-23' },

  // --- CLOUD & SOFTWARE ---
  { id: 't25', stockId: '25', symbol: 'CRM', type: 'BUY', 
    quantity: 12, price: 294.60, date: '2026-02-23' },
  { id: 't26', stockId: '26', symbol: 'SNOW', type: 'BUY', 
    quantity: 15, price: 178.10, date: '2026-02-23' },
  { id: 't27', stockId: '27', symbol: 'ADBE', type: 'SELL', 
    quantity: 5,  price: 512.45, date: '2026-02-23' },

  // --- CONSUMER & E-COMMERCE ---
  { id: 't28', stockId: '28', symbol: 'MELI', type: 'BUY', 
    quantity: 2,  price: 1890.30, date: '2026-02-23' },
  { id: 't29', stockId: '29', symbol: 'BABA', type: 'BUY', 
    quantity: 35, price: 82.15, date: '2026-02-23' },
  { id: 't30', stockId: '30', symbol: 'WMT', type: 'BUY', 
    quantity: 25, price: 91.40, date: '2026-02-23' }
];

export const positions: Position[] = [
  { symbol: 'AAPL', quantity: 10, avgPrice: 175.00, ltp: 263.25, pnl: 882.50, pnlPercent: 50.43 },
  { symbol: 'MSFT', quantity: 5, avgPrice: 360.00, ltp: 396.25, pnl: 181.25, pnlPercent: 10.07 },
  { symbol: 'GOOGL', quantity: 8, avgPrice: 155.20, ltp: 316.32, pnl: 1288.96, pnlPercent: 103.81 },
  { symbol: 'AMZN', quantity: 15, avgPrice: 145.50, ltp: 208.88, pnl: 950.70, pnlPercent: 43.56 },
  { symbol: 'TSLA', quantity: 12, avgPrice: 220.00, ltp: 408.44, pnl: 2261.28, pnlPercent: 85.65 },
  { symbol: 'NVDA', quantity: 20, avgPrice: 110.00, ltp: 190.04, pnl: 1600.80, pnlPercent: 72.76 },
  { symbol: 'META', quantity: 6, avgPrice: 485.00, ltp: 652.68, pnl: 1006.08, pnlPercent: 34.57 },
  { symbol: 'BRK.B', quantity: 4, avgPrice: 410.00, ltp: 497.80, pnl: 351.20, pnlPercent: 21.41 },
  { symbol: 'V', quantity: 10, avgPrice: 265.00, ltp: 318.64, pnl: 536.40, pnlPercent: 20.24 },
  { symbol: 'JPM', quantity: 15, avgPrice: 168.40, ltp: 242.15, pnl: 1106.25, pnlPercent: 43.79 },
  { symbol: 'WMT', quantity: 25, avgPrice: 62.10, ltp: 94.42, pnl: 808.00, pnlPercent: 52.05 },
  { symbol: 'MA', quantity: 7, avgPrice: 425.00, ltp: 512.30, pnl: 611.10, pnlPercent: 20.54 },
  { symbol: 'LLY', quantity: 3, avgPrice: 710.00, ltp: 924.15, pnl: 642.45, pnlPercent: 30.16 },
  { symbol: 'AVGO', quantity: 5, avgPrice: 1350.00, ltp: 1642.80, pnl: 1464.00, pnlPercent: 21.69 },
  { symbol: 'NFLX', quantity: 9, avgPrice: 420.00, ltp: 488.12, pnl: 613.08, pnlPercent: 16.22 },
  { symbol: 'ADBE', quantity: 6, avgPrice: 510.00, ltp: 548.33, pnl: 229.98, pnlPercent: 7.51 },
  { symbol: 'INTC', quantity: 30, avgPrice: 42.00, ltp: 47.60, pnl: 168.00, pnlPercent: 13.33 },
  { symbol: 'AMD', quantity: 18, avgPrice: 105.00, ltp: 121.45, pnl: 296.10, pnlPercent: 15.66 },
  { symbol: 'PYPL', quantity: 12, avgPrice: 68.00, ltp: 73.90, pnl: 70.80, pnlPercent: 8.68 },
];

export const sampleHoldings: Holdings[] = [
  {
    symbol: 'AAPL',
    quantity: 10,
    Invested: 1750.00,
    Value: 175.00, // Purchase Price per share
    CurrentValue: 2632.50, // quantity * current LTP ($263.25)
    TotalReturn: 882.50
  },
  {
    symbol: 'MSFT',
    quantity: 5,
    Invested: 1800.00,
    Value: 360.00,
    CurrentValue: 1981.25, // quantity * current LTP ($396.25)
    TotalReturn: 181.25
  },
  {
    symbol: 'GOOGL',
    quantity: 8,
    Invested: 1241.60,
    Value: 155.20,
    CurrentValue: 2530.56, // quantity * current LTP ($316.32)
    TotalReturn: 1288.96
  },
  {
    symbol: 'AMZN',
    quantity: 15,
    Invested: 2182.50,
    Value: 145.50,
    CurrentValue: 3133.20, // quantity * current LTP ($208.88)
    TotalReturn: 950.70
  },
  {
    symbol: 'TSLA',
    quantity: 12,
    Invested: 2640.00,
    Value: 220.00,
    CurrentValue: 4901.28, // quantity * current LTP ($408.44)
    TotalReturn: 2261.28
  },
  {
    symbol: 'NVDA',
    quantity: 20,
    Invested: 2200.00,
    Value: 110.00,
    CurrentValue: 3800.80, // quantity * current LTP ($190.04)
    TotalReturn: 1600.80
  },
  {
    symbol: 'META',
    quantity: 6,
    Invested: 2910.00,
    Value: 485.00,
    CurrentValue: 3916.08, // quantity * current LTP ($652.68)
    TotalReturn: 1006.08
  },
  {
    symbol: 'BRK.B',
    quantity: 4,
    Invested: 1640.00,
    Value: 410.00,
    CurrentValue: 1991.20, // quantity * current LTP ($497.80)
    TotalReturn: 351.20
  }
];
