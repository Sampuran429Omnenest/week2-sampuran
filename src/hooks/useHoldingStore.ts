import { create } from "zustand";
import type { Holdings } from "../types/stock.types";
import { sampleHoldings } from "../data/stockData";

interface HoldingStore {
  // --- State ---
  holdings: Holdings[];
  compareList: Holdings[];

  // --- Portfolio Actions ---
  addHolding: (holding: Holdings) => void;
  removeHolding: (symbol: string) => void;
  updateHolding: (symbol: string, changes: Partial<Holdings>) => void;

  // --- Comparison Actions ---
  toggleCompare: (holding: Holdings) => void;
  clearCompare: () => void;
}

export const useHoldingStore = create<HoldingStore>((set) => ({
  // --- Initial State ---
  holdings: sampleHoldings,
  compareList: [],

  // --- Portfolio Management ---
  addHolding: (newHolding) => {
    set((state) => {
      const existing = state.holdings.find((h) => h.symbol === newHolding.symbol);
      if (existing) {
        return {
          holdings: state.holdings.map((h) => {
            if (h.symbol !== newHolding.symbol) return h;
            const newQty = h.quantity + newHolding.quantity;
            const newInvested = h.Invested + newHolding.Invested;
            const newCurrentValue = h.CurrentValue + newHolding.CurrentValue;
            return {
              ...h,
              quantity: newQty,
              Invested: newInvested,
              Value: newInvested / newQty,
              CurrentValue: newCurrentValue,
              TotalReturn: newCurrentValue - newInvested,
            };
          }),
        };
      }
      return { holdings: [...state.holdings, newHolding] };
    });
  },

  removeHolding: (targetSymbol) => {
    set((state) => ({
      holdings: state.holdings.filter((h) => h.symbol !== targetSymbol),
      // Auto-remove from comparison if deleted from portfolio
      compareList: state.compareList.filter((h) => h.symbol !== targetSymbol),
    }));
  },

  updateHolding: (targetSymbol, changes) => {
    set((state) => ({
      holdings: state.holdings.map((h) =>
        h.symbol === targetSymbol ? { ...h, ...changes, TotalReturn: (changes.CurrentValue ?? h.CurrentValue) - (changes.Invested ?? h.Invested) } : h
      ),
    }));
  },

  // --- Comparison Logic ---
  toggleCompare: (holding) => {
    set((state) => {
      const alreadyIn = state.compareList.some((h) => h.symbol === holding.symbol);

      if (alreadyIn) {
        return {
          compareList: state.compareList.filter((h) => h.symbol !== holding.symbol),
        };
      }

      if (state.compareList.length >= 4) {
        alert("You can compare up to 4 holdings at a time.");
        return state;
      }

      return {
        compareList: [...state.compareList, holding],
      };
    });
  },

  clearCompare: () => set({ compareList: [] }),
}));