import type React from "react";
import type { Stock } from "../types/stock.types";
import { useEffect, useState } from "react";

interface PortfolioState{
    holdings:Stock[];
    totalValue:number;
    gainLoss:number;
    isLoading:boolean;
    error:string|null;
}
interface PortfolioSummaryProps{
    availableStocks:Stock[];
}
const PortfolioSummary:React.FC<PortfolioSummaryProps>=({availableStocks})=>{
    const [portfolio,setPortfolio]=useState<PortfolioState>({
        holdings:[],
        totalValue:0,
        gainLoss:0,
        isLoading:true,
        error:null
    });
    const [selectedSector,setSelectedSector]=useState<string>('All');
    
    useEffect(()=>{
        setTimeout(()=>{
            const topThree=availableStocks.slice(0,3);
            const totalValue=topThree.reduce((sum,s)=>sum+s.price*10,0);
            const totalCost=topThree.reduce((sum,s)=>sum+(s.price-s.change)*10,0);
            setPortfolio({
                holdings:topThree,
                totalValue,
                gainLoss:totalValue-totalCost,
                isLoading:false,
                error:null,
            })
        },800)
    },[availableStocks]);
    const filtered=selectedSector==='All'
    ? portfolio.holdings
    : portfolio.holdings.filter(s=>s.sector===selectedSector);
    if(portfolio.isLoading) return <p>Loading portfolio...</p>;
    if(portfolio.error) return <p>Error :{portfolio.error}</p>;
    return(
        <div
        style={{
      background: "#ffffff",
      borderRadius: 16,
      padding: 40,
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      maxWidth: 700,
      margin: "0 auto",
      textAlign: "center",
    }}
        >
            <h2 style={{ marginBottom: 20 }}>Portfolio Summary</h2>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                ${portfolio.totalValue.toLocaleString()}
            </div>
            <div
      style={{
        color: portfolio.gainLoss >= 0 ? "#16A34A" : "#DC2626",
        fontWeight: 600,
        marginBottom: 25,
      }}
    >
      {portfolio.gainLoss >= 0 ? "+" : ""}
      ${portfolio.gainLoss.toFixed(2)}
    </div>

    <select
      value={selectedSector}
      onChange={(e) => setSelectedSector(e.target.value)}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #D1D5DB",
        marginBottom: 20,
      }}
    >
      <option>All</option>
      <option>Technology</option>
      <option>Finance</option>
      <option>Automotive</option>
    </select>

        <div
        style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
        }}
        >
        {filtered.map((s) => (
            <div
            key={s.id}
            style={{
                padding: "8px 16px",
                background: "#F3F4F6",
                borderRadius: 8,
                fontSize: 14,
                }}
            >
            {s.symbol} – ${s.price.toFixed(2)}
                </div>
            ))}
            </div>
        </div>
    );
}
export default PortfolioSummary