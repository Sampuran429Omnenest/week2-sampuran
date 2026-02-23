import type React from "react";
import type { Stock, Trade } from "../types/stock.types";
import { useState } from "react";

type EditableStock=Partial<Stock>;
type StockSummary=Pick<Stock,'symbol'|'name'|'price'|'sector'>;
type NewTradeInput=Omit<Trade,'id'|'date'>;

interface TradeFormProps{
    stocks:StockSummary[];
    onSubmitTrade:(trade:NewTradeInput)=>void;
    initialValues?:EditableStock;
}
const TradeForm:React.FC<TradeFormProps>=({
    stocks,
    onSubmitTrade,
    initialValues={},
})=>{
    const [form,setForm]=useState<NewTradeInput>({
        stockId:initialValues.id ?? '',
        symbol:initialValues.symbol?? '',
        type:'BUY',
        quantity:1,
        price:initialValues.price ?? 0,
    });
    const handleStockChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const selected=stocks.find(s=>s.symbol===e.target.value);
        if(selected){
            setForm(prev=>({
                ...prev,
                symbol:selected.symbol,
                price:selected.price,
            }));
        }
    };
    const handleSubmit=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        onSubmitTrade(form);
    }
    return(
         <div
    style={{
      background: "#ffffff",
      borderRadius: 16,
      padding: 40,
      maxWidth: 600,
      margin: "0 auto",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    }}
  >
    <h3 style={{ marginBottom: 20 }}>Place a Trade</h3>

    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <select
        value={form.symbol}
        onChange={handleStockChange}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #D1D5DB",
        }}
      >
        <option value="">--Select Stock--</option>
        {stocks.map((s) => (
          <option key={s.symbol} value={s.symbol}>
            {s.symbol} - {s.name}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: 12 }}>
        {(["BUY", "SELL"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, type: t }))}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background:
                form.type === t
                  ? t === "BUY"
                    ? "#16A34A"
                    : "#DC2626"
                  : "#E5E7EB",
              color: form.type === t ? "#fff" : "#374151",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <input
        type="number"
        min={1}
        value={form.quantity}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            quantity: Math.max(1, Number(e.target.value)),
          }))
        }
        placeholder="Quantity"
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #D1D5DB",
        }}
      />

      <div style={{ fontWeight: 500 }}>
        Price: ${form.price.toFixed(2)} | Total: $
        {(form.price * form.quantity).toFixed(2)}
      </div>

      <button
        type="submit"
        disabled={!form.symbol}
        style={{
          padding: "12px",
          borderRadius: 8,
          border: "none",
          cursor: form.symbol ? "pointer" : "not-allowed",
          background: form.symbol ? "#1E40AF" : "#9CA3AF",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Submit Trade
      </button>
    </form>
  </div>
    );
}
export default TradeForm;
