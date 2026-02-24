
import React from 'react';
import type { Holdings } from '../../types/stock.types';
import DataTable   from '../../components/DataTable';
 import { PortfolioPieChart } from '../../components/charts/PortfolioPieChart';
 import useInfiniteScroll from '../../hooks/useInfiniteScroll';
interface HoldingsFeatureProps {
  holdings: Holdings[];
}
 
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
 
const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
  const totalValue = holdings.reduce(
  (sum, h) => sum + h.CurrentValue,
  0
);

const pieData = holdings.map(h => ({
  name: h.symbol,
  value: totalValue > 0
    ? (h.CurrentValue / totalValue) * 100
    : 0
}));
  const { visibleItems, bottomRef, hasMore } =
    useInfiniteScroll(holdings, 10);
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      <DataTable<Holdings>
        data={visibleItems}
        rowKey="symbol"
        filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',        header: 'Symbol',         sortable: true },
          { key: 'quantity',           header: 'Qty',            sortable: true },
          { key: 'Invested', header: 'Invested Value', sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'CurrentValue',  header: 'Current Value',  sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'TotalReturn',   header: 'Total Return',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
        ]}
      />
      {hasMore && <div ref={bottomRef} />}
      <PortfolioPieChart data={pieData} />
    </>
  );
};
 
export default HoldingsFeature;
