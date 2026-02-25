import type React from "react";
import type { Position } from "../types/stock.types";
import { usePositionStore } from "../hooks/usePositionStore";
import { useShallow } from "zustand/react/shallow";

const COMPARE_ROWS: {
  label: string;
  key: keyof Position;
  format?: (v: unknown) => string;
}[] = [
  {
    label: 'Qty',
    key: 'quantity',
    format: (v) => Number(v).toLocaleString(),
  },
  {
    label: 'Avg Price',
    key: 'avgPrice',
    format: (v) => '$' + Number(v).toFixed(2),
  },
  {
    label: 'LTP',
    key: 'ltp',
    format: (v) => '$' + Number(v).toFixed(2),
  },
  {
    label: 'Total P&L',
    key: 'pnl',
    format: (v) => (Number(v) >= 0 ? '+' : '') + '$' + Number(v).toFixed(2),
  },
  {
    label: 'P&L %',
    key: 'pnlPercent',
    format: (v) => (Number(v) >= 0 ? '+' : '') + Number(v).toFixed(2) + '%',
  },
];

const PositionComparePanel: React.FC = () => {
  const compareList = usePositionStore(useShallow((s) => s.compareList));
  const clearCompare = usePositionStore((s) => s.clearCompare);
  const toggleCompare = usePositionStore((s) => s.toggleCompare);

  if (compareList.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '2px solid #065F46', // Emerald theme for Positions
        padding: '16px 24px',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, color: '#064E3B', fontSize: 16 }}>
          Comparing {compareList.length} Position{compareList.length > 1 ? 's' : ''}
        </h3>

        <button
          onClick={clearCompare}
          style={{
            background: '#DCFCE7',
            color: '#166534',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      {/* ── Comparison Table ────────────────────────────────────────── */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#065F46', color: '#fff' }}>
            <th
              style={{
                padding: '8px 12px',
                textAlign: 'left',
                width: 130,
                fontWeight: 'bold',
              }}
            >
              Metric
            </th>

            {compareList.map(function (pos) {
              return (
                <th
                  key={pos.symbol}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    minWidth: 110,
                  }}
                >
                  <span>{pos.symbol}</span>
                  <button
                    onClick={function () { toggleCompare(pos); }}
                    style={{
                      marginLeft: 8,
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: 3,
                      padding: '1px 5px',
                      cursor: 'pointer',
                      fontSize: 10,
                      lineHeight: '14px',
                    }}
                  >
                    ✕
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {COMPARE_ROWS.map(function (row, rowIndex) {
            return (
              <tr
                key={row.key}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F0FDF4',
                }}
              >
                <td
                  style={{
                    padding: '7px 12px',
                    fontWeight: 'bold',
                    color: '#374151',
                    borderRight: '1px solid #E5E7EB',
                  }}
                >
                  {row.label}
                </td>

                {compareList.map(function (pos) {
                  const rawValue = pos[row.key];
                  const displayText = row.format
                    ? row.format(rawValue)
                    : String(rawValue);

                  // ── Best-value highlight logic (Same as Stock Panel) ──
                  const isNumeric = typeof rawValue === 'number';
                  const allNums = isNumeric
                    ? compareList.map(function (p) { return p[row.key] as number; })
                    : [];
                  const maxVal = isNumeric ? Math.max(...allNums) : null;
                  const isBest = isNumeric && rawValue === maxVal;

                  return (
                    <td
                      key={pos.symbol}
                      style={{
                        padding: '7px 12px',
                        textAlign: 'center',
                        color: isBest ? '#166534' : '#111827',
                        fontWeight: isBest ? 'bold' : 'normal',
                        backgroundColor: isBest ? '#D1FAE5' : 'transparent',
                        borderRight: '1px solid #F3F4F6',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      {isBest && <span style={{ marginRight: 4 }}>▲</span>}
                      {displayText}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;
