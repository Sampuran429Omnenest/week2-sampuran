import './App.css';
// src/App.tsx
import  { useState } from 'react';
 
// Data
import { sampleHoldings, stocks, trades } from './data/stockData';
 
// Types
import type { Holdings, Position, Stock,Trade } from './types/stock.types';
 
// Components
import StockCard          from './components/StockCard';
import PortfolioSummary   from './components/PortfolioSummary';
import SearchBar          from './components/SearchBar';
import DataTable, { type Column }          from './components/DataTable';
import TradeForm          from './components/TradeForm';
 
function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [sectorFilter,  setSectorFilter]  = useState('');
  const [tradeHistory,  setTradeHistory]  = useState<Trade[]>(trades);
 
  // Filter stocks based on search and sector
  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });
 
  // Add a new trade (receives NewTradeInput — no id/date)
  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  };
  interface GroupedTrade {
    symbol: string;
    quantity: number;
    avgPrice: number;
  }
  const positionColumns: Column<Position>[] = [
    { key: 'symbol', header: 'Symbol' },
    { key: 'quantity', header: 'Qty' },
    { 
      key: 'avgPrice', 
      header: 'Avg Price', 
      render: (v) => `$${Number(v).toFixed(2)}` 
    },
    { 
      key: 'ltp', 
      header: 'LTP', 
      render: (v) => `$${Number(v).toFixed(2)}` 
    },
    { 
      key: 'pnl', 
      header: 'P&L', 
      render: (v) => {
        const val = Number(v);
        return <span style={{ color: val >= 0 ? 'green' : 'red',fontWeight:'bold'}}>
          {val >= 0 ? '+' : ''}{val.toFixed(2)}
        </span>
      } 
    }
  ]; 
  const holdingColumns: Column<Holdings>[] = [
    
    { key: 'symbol', header: 'Symbol', sortable: true }, 
    
   
    { key: 'quantity', header: 'Qty', sortable: true }, 
    
    { key: 'Invested', header: 'Invested',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
    { key: 'Value', header: 'Avg. Cost',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
    { key: 'CurrentValue', header: 'Current Value',sortable:true, render: v => `$${Number(v).toFixed(2)}` },
    
   
    { 
      key: 'TotalReturn', 
      header: 'Profit/Loss', 
      sortable: true,
      render: v => {
        const val = Number(v);
        return (
          <span style={{ color: val >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
            {val >= 0 ? '+' : ''}${val.toFixed(2)}
          </span>
        );
      } 
    },
  ];
  const calculatedPositions: Position[] = Array.from(
      tradeHistory.reduce((acc, trade) => {
      const existing = acc.get(trade.symbol);
      const qtyChange = trade.type === 'BUY' ? trade.quantity : -trade.quantity;
    
      if (existing) {
        existing.quantity += qtyChange;
        if (trade.type === 'BUY') {
          // Simple weighted average calculation
          existing.avgPrice = ((existing.avgPrice * (existing.quantity - qtyChange)) + (trade.price * qtyChange)) / existing.quantity;
        }
      } else {
        acc.set(trade.symbol, {
          symbol: trade.symbol,
          quantity: qtyChange,
          avgPrice: trade.price,
        });
      }
      return acc;
    }, new Map<string, GroupedTrade>()) // <--- Tell the Map what it holds
  ).map(([,pos]: [string, GroupedTrade]) => { // <--- Explicit types instead of 'any'
  
    const currentStock = stocks.find(s => s.symbol === pos.symbol);
    const ltp = currentStock?.price || 0;
    const pnl = (ltp - pos.avgPrice) * pos.quantity;

    return {
      ...pos,
      ltp,
      pnl,
      pnlPercent: pos.avgPrice > 0 ? (pnl / (pos.avgPrice * pos.quantity)) * 100 : 0
    };
  });
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>
 
      {/* Event Typing */}
      <SearchBar
        onSearch={setSearchQuery}
        onFilterChange={setSectorFilter}
        placeholder='Search by symbol or name...'
      />
 
      {/* Typing Props */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={selectedStock?.id === stock.id}
            onSelect={setSelectedStock}
          />
        ))}
      </div>
 
      {/* Typing State */}
      <PortfolioSummary availableStocks={stocks} />
 
      {/* Generic Components — Stock table */}
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={filteredStocks}
        rowKey='id'
        onRowClick={setSelectedStock}
        emptyMessage='No stocks match your search.'
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'name',   header: 'Company' },
          { key: 'price',  header: 'Price',
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'changePct', header: 'Change %',
            render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(2)}%
              </span>;
            }},
          { key: 'volume', header: 'Volume',
            render: v => Number(v).toLocaleString() },
        ]}
      />
 
      {/* Generic Components — Trade table */}
      <h2 style={{ color: '#1E40AF' }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey='id'
        columns={[
          { key: 'symbol',   header: 'Symbol' },
          { key: 'type',     header: 'Type',
            render: v => <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>
              {String(v)}</strong> },
          { key: 'quantity', header: 'Qty' },
          { key: 'price',    header: 'Price',
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'date',     header: 'Date' },
        ]}
      />
      <h2 style={{ color: '#1E40AF' }}>Your Positions</h2>
        <DataTable<Position> 
          data={calculatedPositions} 
          rowKey="symbol" 
          filterKey="symbol"
          columns={positionColumns} 
        />
        <h2 style={{ color: '#1E40AF' }}>My Holdings</h2>
          <DataTable<Holdings>
          data={sampleHoldings}
          rowKey="symbol"
          filterKey="symbol"
          columns={holdingColumns}
        />

      {/* Utility Types */}
      <h2 style={{ color: '#1E40AF' }}>New Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={handleNewTrade}
        initialValues={selectedStock ?? {}}
      />
    </div>
  );
}
 
export default App;
