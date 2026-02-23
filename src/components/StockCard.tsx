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
            border:isSelected?'2px solid #1E40AF':'1px solid #D1D5DB',
            borderRadius:8,padding:16,cursor:'pointer',
            background:isSelected?'#DBEAFE':'#fff',
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