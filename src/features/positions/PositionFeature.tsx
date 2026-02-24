import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable    from '../../components/DataTable';
 
interface PositionsFeatureProps {
  positions: Position[];
}
 
// Helper: render a number as a coloured cell
// value  = the raw cell value
// suffix = '%' for percentage columns, '' (empty) for dollar columns
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
 
  // Convert the raw value to a number
  const numberValue  = Number(value);
 
  // Colour based on positive or negative
  const isPositive   = numberValue >= 0;
  const textColour   = isPositive ? '#166534' : '#991B1B';
 
  // '+' before positive numbers (negative numbers already have '-')
  const prefix = isPositive ? '+' : '';
 
  // '$' before dollar values, nothing before percentages
  const currencySign = suffix === '%' ? '' : '$';
 
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}
 
const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>
      <DataTable<Position>
        data={positions}
        rowKey="symbol"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',    sortable: true },
          { key: 'quantity',      header: 'Qty',       sortable: true },
          { key: 'avgPrice', header: 'Avg Price', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'ltp',      header: 'LTP',       sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'pnl',    header: 'P&L',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
          { key: 'pnlPercent', header: 'P&L %', sortable: true,
            render: function(value) { return pnlCell(value, '%'); }
          },
        ]}
      />
    </>
  );
};
 
export default PositionsFeature;
