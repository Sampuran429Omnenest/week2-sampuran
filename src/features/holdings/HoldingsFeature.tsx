import React from 'react';
import type { Holdings } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { PortfolioPieChart } from '../../components/charts/PortfolioPieChart';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useHoldingStore } from '../../hooks/useHoldingStore';

/**
 * COMPONENT: Compare Toggle for Holdings
 */
const CompareButton: React.FC<{ record: Holdings }> = ({ record }) => {
  const toggleCompare = useHoldingStore((s) => s.toggleCompare);
  const isComparing = useHoldingStore((s) => 
    s.compareList.some((h) => h.symbol === record.symbol)
  );

  return (
    <button
      onClick={() => toggleCompare(record)}
      style={{
        backgroundColor: isComparing ? '#1E40AF' : '#E5E7EB',
        color: isComparing ? '#fff' : '#374151',
        border: 'none',
        borderRadius: 4,
        padding: '4px 8px',
        fontSize: 11,
        cursor: 'pointer',
        minWidth: 85
      }}
    >
      {isComparing ? '✓ Comparing' : '+ Compare'}
    </button>
  );
};

/**
 * COMPONENT: Holding Actions (Remove)
 */
const ActionButtons: React.FC<{ record: Holdings }> = ({ record }) => {
  const removeHolding = useHoldingStore((s) => s.removeHolding);

  return (
    <button
      onClick={() => {
        if(window.confirm(`Delete ${record.symbol} from holdings?`)) {
          removeHolding(record.symbol);
        }
      }}
      style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
    >
      🗑
    </button>
  );
};

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  const numberValue  = Number(value);
  const isPositive   = numberValue >= 0;
  const textColour   = isPositive ? '#166534' : '#991B1B';
  const prefix       = isPositive ? '+' : '';
  const currencySign = suffix === '%' ? '' : '$';
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const HoldingsFeature: React.FC = () => {
  // 1. Pull holdings directly from the store
  const holdings = useHoldingStore((s) => s.holdings);

  // 2. Calculated Data for Charts
  const totalValue = holdings.reduce((sum, h) => sum + h.CurrentValue, 0);
  const pieData = holdings.map(h => ({
    name: h.symbol,
    value: totalValue > 0 ? (h.CurrentValue / totalValue) * 100 : 0
  }));

  // 3. Infinite Scroll Setup
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(holdings, 10);

  return (
    <div style={{ marginBottom: '5rem' }}>
      <h2 style={{ color: '#1E40AF' }}>
        Holdings
        <span style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 12, color: '#6B7280' }}>
          {visibleItems.length} of {holdings.length}
        </span>
      </h2>

      <DataTable<Holdings>
        data={visibleItems}
        rowKey="symbol"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'quantity', header: 'Qty', sortable: true },
          { 
            key: 'Invested', 
            header: 'Invested Value', 
            sortable: true,
            render: (v) => '$' + Number(v).toLocaleString()
          },
          { 
            key: 'CurrentValue',  
            header: 'Current Value',  
            sortable: true,
            render: (v) => '$' + Number(v).toLocaleString()
          },
          { 
            key: 'TotalReturn',   
            header: 'Total Return',   
            sortable: true,
            render: (v) => pnlCell(v) 
          },
          // Comparison Column
          {
            key: 'symbol',
            header: 'Compare',
            render: (_, record) => <CompareButton record={record} />
          },
          // Actions Column
          {
            key: 'symbol',
            header: 'Actions',
            render: (_, record) => <ActionButtons record={record} />
          }
        ]}
      />

      {hasMore && <div ref={bottomRef} style={{ height: 20 }} />}
      
      <div style={{ marginTop: 40 }}>
        <PortfolioPieChart data={pieData} />
      </div>
    </div>
  );
};

export default HoldingsFeature;