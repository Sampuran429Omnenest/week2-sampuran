export interface Stock{
    id:string;
    symbol:string;
    name:string;
    price:number;
    change:number;
    changePct:number;
    volume:number;
    marketCap:number;
    sector:string;
}
export interface Trade{
    id:string;
    stockId:string;
    symbol:string;
    type:'BUY'|'SELL';
    quantity:number;
    price:number;
    date:string;
}
export interface Portfolio{
    totalValue:number;
    totalCost:number;
    gainLoss:number;
    holdings:Stock[];
}
export interface Position{
    symbol:string;
    quantity:number;
    avgPrice:number;
    ltp:number;
    pnl:number;
    pnlPercent:number;
}
export interface Holdings{
    symbol:string;
    quantity:number;
    Invested:number;
    Value:number;
    CurrentValue:number;
    TotalReturn:number;
}
