import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { usePositionStore } from '../../hooks/usePositionStore';

interface PositionsFeatureProps {
  positions: Position[];
}

/** 
 * Sub-component for the Compare button to follow "Rules of Hooks" 
 * and optimize performance per row.
 */
const CompareButton: React.FC<{ record: Position }> = ({ record }) => {
  const toggleCompare = usePositionStore((s) => s.toggleCompare);
  
  // Select only the boolean status for this specific symbol
  const isComparing = usePositionStore((s) => 
    s.compareList.some((p) => p.symbol === record.symbol)
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
        fontWeight: isComparing ? 'bold' : 'normal',
        minWidth: 80
      }}
    >
      {isComparing ? '✓ Compare' : '+ Compare'}
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

const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {
  // Infinite scroll logic
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 10);

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>
        Positions
        <span style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 12 }}>
          {visibleItems.length} of {positions.length}
        </span>
      </h2>

      <DataTable<Position>
        data={visibleItems}   
        rowKey="symbol"
        filterKey="symbol"
        pageSize={10} 
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'quantity', header: 'Qty', sortable: true },
          { 
            key: 'avgPrice', 
            header: 'Avg Price', 
            sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { 
            key: 'ltp', 
            header: 'LTP', 
            sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { 
            key: 'pnl', 
            header: 'P&L', 
            sortable: true,
            render: function(value) { return pnlCell(value); }
          },
          { 
            key: 'pnlPercent', 
            header: 'P&L %', 
            sortable: true,
            render: function(value) { return pnlCell(value, '%'); }
          },
          // ── NEW: Compare Action Column ──
          {
            key: 'symbol',
            header: 'Compare',
            render: (_val, record) => <CompareButton record={record} />
          }
        ]}
      />

      {hasMore && <div ref={bottomRef} style={{ height: 20 }} />}
    </>
  );
};

export default PositionsFeature;
