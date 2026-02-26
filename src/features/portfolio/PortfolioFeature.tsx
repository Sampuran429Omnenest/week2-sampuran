
import React from 'react';
import PortfolioSummary  from '../../components/PortfolioSummary';
import { useStockStore } from '../../hooks/useStockStore';
 
const PortfolioFeature: React.FC = () => {
  const stocks=useStockStore((s)=>s.allStocks);
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      <PortfolioSummary availableStocks={stocks} />
    </>
  );
};
 
export default PortfolioFeature;  // REQUIRED for React.lazy()
