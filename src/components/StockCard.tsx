import type React from "react";
import type { Stock } from "../types/stock.types";

//props interface
interface StockCardProps{
    stock:Stock;
    onSelect?:(stock:Stock)=>void
    isSelected?:boolean;
}
//component Parameter
const StockCard:React.FC<StockCardProps>=({
    stock,
    onSelect,
    isSelected=false,
})=>{
    const isPositive=stock.change>0;
    return(
        <div
        onClick={()=>onSelect?.(stock)}
        style={{
            border: isSelected ? '2px solid #1E40AF' : '1px solid #E5E7EB',
            borderRadius: 12,
            padding: 20,
            cursor: 'pointer',
            background: isSelected ? '#EFF6FF' : '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
        }}
        >
            <h3>{stock.symbol}-{stock.name}</h3>
            <p>Price:${stock.price.toFixed(2)}</p>
            <p style={{color:isPositive?'green':'red'}}>{isPositive?'+':''}{stock.change.toFixed(2)}
                ({stock.changePct.toFixed(2)}%)
            </p>
            <small>Sector:{stock.sector}</small>
        </div>
    );
}
export default StockCard;