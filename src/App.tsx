import { lazy, useState } from 'react';
import { stocks, trades, positions, sampleHoldings } from './data/stockData';
 
import type { Stock, Trade } from './types/stock.types';
import MarketTicker from './components/ticker/MarketTicker';
// ── Boundary wrapper (EAGER import — NOT lazy) ───────────────────────
import SuspenseBoundary from './boundaries/SuspenseBoundary';
//
// WHY NOT lazy? SuspenseBoundary SHOWS the skeleton while things load.
// It needs to be ready instantly.
 
// ── Skeleton components (EAGER imports — NOT lazy) ───────────────────
import TableSkeleton    from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton     from './skeletons/FormSkeleton';
import StockComparePanel from './components/StockComparePanel';
import PositionComparePanel from './components/PositionComparePanel';
// WHY NOT lazy? These ARE the fallback UI.
// They must exist BEFORE the real components arrive.


 
const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});
 
const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
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
 
  // ── State (COMPLETELY UNCHANGED from Module 1) ─────────────────────
  const [selectedStock,  setSelectedStock]  = useState<Stock | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sectorFilter,   setSectorFilter]   = useState('');
  const [tradeHistory,   setTradeHistory]   = useState<Trade[]>(trades);
 
  // ── Filtered stocks (UNCHANGED) ─────────────────────────────────────
  const  filteredStocks = stocks.filter(function(stock) {
    const  queryLower     = searchQuery.toLowerCase();
    const  symbolMatches  = stock.symbol.toLowerCase().includes(queryLower);
    const  nameMatches    = stock.name.toLowerCase().includes(queryLower);
    const  searchMatches  = symbolMatches || nameMatches;
    const  noFilter       = sectorFilter === '';
    const  sectorMatches  = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });
 
  // ── handleNewTrade (UNCHANGED) ───────────────────────────────────────
  function handleNewTrade(input: NewTradeInput): void {
    const  newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>


      <div style={{marginBottom:'2rem'}}>
        <MarketTicker stocks={stocks} />
      </div>
 
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
      <StockComparePanel/>
      <PositionComparePanel/>
    </div>
  );
}
 
export default App;