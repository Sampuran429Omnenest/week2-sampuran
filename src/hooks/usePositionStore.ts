import { create } from "zustand";
import type { Position } from "../types/stock.types";
import { positions as initialPositions } from "../data/stockData";

interface PositionStore{
    positions:Position[];
    compareList:Position[];

    addPosition:(position:Position)=>void;
    removePosition:(position:Position)=>void;
    updatePosition:(id:string,changes:Partial<Position>)=>void;

    toggleCompare:(pos:Position)=>void;
    clearCompare:()=>void;
}
export const usePositionStore=create<PositionStore>((set)=>({
    positions:initialPositions,
    compareList:[],
    addPosition: function (position) {
      set(function (prev) {
        const existing = prev.positions.find(function (p) {
          return p.symbol === position.symbol;
        });

        if (existing) {
          return {
            positions: prev.positions.map(function (p) {
              if (p.symbol !== position.symbol) return p;
              const totalQty = p.quantity + position.quantity;
              const avgPrice =
                (p.avgPrice * p.quantity + position.avgPrice * position.quantity) /
                totalQty;
              return { ...p, quantity: totalQty, avgPrice };
            }),
          };
        }
        return { positions: [...prev.positions, position] };
      });
    },

      removePosition: function (position:Position) { // 1. Rename this to targetSymbol
      set(function (prev) {
        return {
          positions: prev.positions.filter(function (p) {
            // 2. Now comparing String vs String (p.symbol vs targetSymbol)
            return p.symbol !== position.symbol;
          }),
          compareList: prev.compareList.filter(function (p) {
            return p.symbol !== position.symbol;
          }),
        };
      });
    },

    updatePosition: function (targetSymbol: string, changes: Partial<Position>) {
      set(function (prev) {
        return {
          positions: prev.positions.map(function (p) {
            // 3. Now comparing String vs String
            return p.symbol === targetSymbol ? { ...p, ...changes } : p;
          }),
        };
      });
    },


    toggleCompare: function (position) {
      set(function (prev) {
        const alreadyIn = prev.compareList.some(function (p) {
          return p.symbol === position.symbol;
        });

        if (alreadyIn) {
          // Remove: filter() returns a NEW array without the matching item.
          // Never mutate the existing array directly — Zustand needs a new
          // reference to detect the change.
          return {
            compareList: prev.compareList.filter(function (p) {
              return p.symbol !== position.symbol;
            }),
          };
        }

        if (prev.compareList.length >= 4) {
          // Hard limit — the comparison panel works best with ≤ 4 columns
          alert('You can compare up to 4 stocks at a time.');
          return prev; // return unchanged state — no update
        }

        // Add: spread the old list into a new array, then append the stock
        return {
          compareList: [...prev.compareList, position],
        };
      });
    },
    clearCompare: function () {
      set({ compareList: [] });
    },
}))