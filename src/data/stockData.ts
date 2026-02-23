import type { Position, Stock,Trade } from "../types/stock.types";
 
export const stocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.',
    price: 189.30, change: 2.15, changePct: 1.15,
    volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.',
    price: 141.80, change: -0.95, changePct: -0.67,
    volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.',
    price: 378.90, change: 4.20, changePct: 1.12,
    volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.',
    price: 248.50, change: -7.30, changePct: -2.85,
    volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM',  name: 'JPMorgan Chase',
    price: 196.40, change: 1.05, changePct: 0.54,
    volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance' },
];
 
export const trades: Trade[] = [
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY',
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY',
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL',
    quantity: 8,  price: 265.00, date: '2024-03-10' },
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
  { symbol: 'AVGO', quantity: 5, avgPrice: 1350.00, ltp: 1642.80, pnl: 1464.00, pnlPercent: 21.69 }
];
