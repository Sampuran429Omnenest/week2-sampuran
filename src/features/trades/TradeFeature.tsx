
import React from 'react';
import type { Trade } from '../../types/stock.types';
import DataTable        from '../../components/DataTable';
import TradeForm        from '../../components/TradeForm';
import useTradeStore from '../../hooks/useTradeStore';
import { useStockStore } from '../../hooks/useStockStore';

// Trade but WITHOUT id and date (the form user hasn't submitted yet)
// type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
// interface TradeFeatureProps {
//   // tradeHistory:  Trade[];
//   stocks:        Stock[];
//   selectedStock: Stock | null;
//   // onSubmitTrade: (input: NewTradeInput) => void;
// }
 
const TradeFeature: React.FC = ()=>{
  const tradeHistory=useTradeStore((s)=>s.tradeHistory);
  const addTrade=useTradeStore((s)=>s.addTrade);
  const stocks=useStockStore((s)=>s.allStocks);
  const selectedStock=useStockStore((s)=>s.selectedStock);
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey="id"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              // BUY = green text, SELL = red text
              const isBuy   = value === 'BUY';
              const color  = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: color }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',     sortable: true },
          { key: 'price',    header: 'Price',   sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',    sortable: true },
        ]}
      />
 
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={addTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};
 
export default TradeFeature;  // REQUIRED for React.lazy()
