import { create } from "zustand";
import type { Position } from "../types/stock.types";
import { positions } from "../data/stockData";

interface PositionStore{
    positions:Position[];
    compareList:Position[];

    toggleCompare:(pos:Position)=>void;
    clearCompare:()=>void;
}
export const usePositionStore=create<PositionStore>((set,get)=>({
    positions:positions,
    compareList:[],
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