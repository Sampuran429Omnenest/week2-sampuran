import './App.css';
// src/App.tsx
import {useState,lazy } from 'react';
 
// Data
import { positions, stocks, trades,sampleHoldings } from './data/stockData';
 
// Types
//import type { Holdings, Position, Stock,Trade } from './types/stock.types';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
// // Components
// import StockCard          from './components/StockCard';
// import PortfolioSummary   from './components/PortfolioSummary';
// import SearchBar          from './components/SearchBar';
// import DataTable, { type Column }          from './components/DataTable';
// import TradeForm          from './components/TradeForm';
// import TradeFeature from './components/TradeFeature';
// import LiveQuotesFeature from './features/quotes/LiveQuotesFeature';
// import PositionFeature from './features/positions/PositionFeature';
import TableSkeleton from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';
import type { Stock, Trade } from './types/stock.types';

const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});
const PortfolioFeature=lazy(function(){
  return import ('./features/portfolio/PortfolioFeature');
});
const PositionsFeature = lazy(function() {
  return import('./features/positions/PositionFeature');
});
const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});
const TradeFeature = lazy(function() {
  return import('./features/trades/TradeFeature');
});
type NewTradeInput = Omit<Trade, 'id' | 'date'>;
function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [sectorFilter,  setSectorFilter]  = useState('');
  const [tradeHistory,  setTradeHistory]  = useState<Trade[]>(trades);
 
  // Filter stocks based on search and sector
  // const filteredStocks = stocks.filter(s => {
  //   const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  //     || s.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesSector = !sectorFilter || s.sector === sectorFilter;
  //   return matchesSearch && matchesSector;
  // });

  const filteredStocks = stocks.filter(function(stock) {
    const queryLower     = searchQuery.toLowerCase();
    const symbolMatches  = stock.symbol.toLowerCase().includes(queryLower);
    const nameMatches    = stock.name.toLowerCase().includes(queryLower);
    const searchMatches  = symbolMatches || nameMatches;
    const noFilter       = sectorFilter === '';
    const sectorMatches  = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });

 
  // Add a new trade (receives NewTradeInput — no id/date)
  // const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
  //   const newTrade: Trade = {
  //     ...input,
  //     id:   `t${Date.now()}`,
  //     date: new Date().toISOString().split('T')[0],
  //   };
  //   setTradeHistory(prev => [newTrade, ...prev]);
  // };

  function handleNewTrade(input: NewTradeInput): void {
    const newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }

  // interface GroupedTrade {
  //   symbol: string;
  //   quantity: number;
  //   avgPrice: number;
  // }

  // const positionColumns: Column<Position>[] = [
  //   { key: 'symbol', header: 'Symbol' },
  //   { key: 'quantity', header: 'Qty' },
  //   { 
  //     key: 'avgPrice', 
  //     header: 'Avg Price', 
  //     render: (v) => `$${Number(v).toFixed(2)}` 
  //   },
  //   { 
  //     key: 'ltp', 
  //     header: 'LTP', 
  //     render: (v) => `$${Number(v).toFixed(2)}` 
  //   },
  //   { 
  //     key: 'pnl', 
  //     header: 'P&L', 
  //     render: (v) => {
  //       const val = Number(v);
  //       return <span style={{ color: val >= 0 ? 'green' : 'red',fontWeight:'bold'}}>
  //         {val >= 0 ? '+' : ''}{val.toFixed(2)}
  //       </span>
  //     } 
  //   }
  // ]; 
  // const holdingColumns: Column<Holdings>[] = [
    
  //   { key: 'symbol', header: 'Symbol', sortable: true }, 
    
   
  //   { key: 'quantity', header: 'Qty', sortable: true }, 
    
  //   { key: 'Invested', header: 'Invested',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
  //   { key: 'Value', header: 'Avg. Cost',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
  //   { key: 'CurrentValue', header: 'Current Value',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
    
   
  //   { 
  //     key: 'TotalReturn', 
  //     header: 'Profit/Loss', 
  //     sortable: true,
  //     render: v => {
  //       const val = Number(v);
  //       return (
  //         <span style={{ color: val >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
  //           {val >= 0 ? '+' : ''}${val.toFixed(2)}
  //         </span>
  //       );
  //     } 
  //   },
  // ];
  // const calculatedPositions: Position[] = Array.from(
  //     tradeHistory.reduce((acc, trade) => {
  //     const existing = acc.get(trade.symbol);
  //     const qtyChange = trade.type === 'BUY' ? trade.quantity : -trade.quantity;
    
  //     if (existing) {
  //       existing.quantity += qtyChange;
  //       if (trade.type === 'BUY') {
  //         // Simple weighted average calculation
  //         existing.avgPrice = ((existing.avgPrice * (existing.quantity - qtyChange)) + (trade.price * qtyChange)) / existing.quantity;
  //       }
  //     } else {
  //       acc.set(trade.symbol, {
  //         symbol: trade.symbol,
  //         quantity: qtyChange,
  //         avgPrice: trade.price,
  //       });
  //     }
  //     return acc;
  //   }, new Map<string, GroupedTrade>()) // <--- Tell the Map what it holds
  // ).map(([,pos]: [string, GroupedTrade]) => { // <--- Explicit types instead of 'any'
  
  //   const currentStock = stocks.find(s => s.symbol === pos.symbol);
  //   const ltp = currentStock?.price || 0;
  //   const pnl = (ltp - pos.avgPrice) * pos.quantity;

  //   return {
  //     ...pos,
  //     ltp,
  //     pnl,
  //     pnlPercent: pos.avgPrice > 0 ? (pnl / (pos.avgPrice * pos.quantity)) * 100 : 0
  //   };
  // });


  return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>
 
      {/* ── FEATURE 1: Live Quotes — uses BOTH skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>
 
      {/* ── FEATURE 2: Portfolio Summary ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 3: Positions ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
      >
        <PositionsFeature positions={positions} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 4: Holdings ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={sampleHoldings} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 5: Trade History + Form — uses TWO skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          tradeHistory={tradeHistory}
          stocks={stocks}
          selectedStock={selectedStock}
          onSubmitTrade={handleNewTrade}
        />
      </SuspenseBoundary>
 
    </div>

  );
}
 
export default App;
