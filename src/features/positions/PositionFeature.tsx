import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { usePositionStore } from '../../hooks/usePositionStore';

/**
 * COMPONENT: Compare Toggle
 */
const CompareButton: React.FC<{ record: Position }> = ({ record }) => {
  const toggleCompare = usePositionStore((s) => s.toggleCompare);
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
        minWidth: 85
      }}
    >
      {isComparing ? '✓ Comparing' : '+ Compare'}
    </button>
  );
};

const ActionButtons: React.FC<{ record: Position }> = ({ record }) => {
  const removePosition = usePositionStore((s) => s.removePosition);
  const updatePosition = usePositionStore((s) => s.updatePosition);
  const addPosition = usePositionStore((s) => s.addPosition);

  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {/* UPDATE/ADD LOGIC: Buy 1 more share at current LTP */}
      <button
        title="Buy 1 More"
        onClick={() => addPosition({ ...record, quantity: 1, avgPrice: record.ltp })}
        style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
      >
        +1
      </button>

      {/* UPDATE LOGIC: Manually reset quantity to 0 via updatePosition */}
      <button
        title="Reset Qty"
        onClick={() => updatePosition(record.symbol, { quantity: 0 })}
        style={{ background: '#FEF9C3', color: '#854D0E', border: '1px solid #FEF08A', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
      >
        ↺
      </button>

      {/* REMOVE LOGIC: Delete completely */}
      <button
        title="Delete Position"
        onClick={() => {
          if(window.confirm(`Remove ${record.symbol} from portfolio?`)) {
            removePosition(record);
          }
        }}
        style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
      >
        🗑
      </button>
    </div>
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

const PositionsFeature: React.FC = () => {
  const globalPositions = usePositionStore((s) => s.positions);
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(globalPositions, 10);

  return (
    <>
      <h2 style={{ color: '#1E40AF', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        Portfolio Positions
        <span style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 12, color: '#6B7280' }}>
          {globalPositions.length} Assets Held
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
            render: (v) => '$' + Number(v).toFixed(2) 
          },
          { 
            key: 'ltp', 
            header: 'LTP', 
            sortable: true,
            render: (v) => '$' + Number(v).toFixed(2) 
          },
          { 
            key: 'pnl', 
            header: 'P&L', 
            sortable: true,
            render: (v) => pnlCell(v) 
          },
          { 
            key: 'pnlPercent', 
            header: 'P&L %', 
            sortable: true,
            render: (v) => pnlCell(v, '%') 
          },
          {
            key: 'symbol',
            header: 'Compare',
            render: (_, record) => <CompareButton record={record} />
          },
          {
            key: 'symbol',
            header: 'Actions',
            render: (_, record) => <ActionButtons record={record} />
          }
        ]}
      />

      {hasMore && <div ref={bottomRef} style={{ height: 20 }} />}
    </>
  );
};

export default PositionsFeature;