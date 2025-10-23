/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useMemo, useState } from "react";

/**
 * Props:
 * - poolSize (number) : highest number in the pool (default 49)
 * - picksCount (number): how many numbers to pick (default 6)
 * - sorted (bool)      : whether to return sorted selections (default true)
 * - initialSelection (array<number>) : optional initial selected numbers
 * - disabled (array<number>) : optional numbers disabled (can't be selected)
 * - onChange (fn)      : callback(selectedNumbers: number[])
 * - className (string) : extra class for wrapper
 */
export default function LotteryNumberPicker({
  poolSize = 49,
  picksCount = 6,
  sorted = true,
  initialSelection = [],
  disabled = [],
  onChange = () => {},
  className = "",
}) {
  // normalize props
  const safeDisabled = useMemo(
    () => new Set((disabled || []).map(Number)),
    [disabled]
  );

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const pickCount = clamp(Number(picksCount) || 6, 1, poolSize);

  // internal state
  const [selected, setSelected] = useState(() =>
    (initialSelection || [])
      .map(Number)
      .filter((n) => n >= 1 && n <= poolSize && !safeDisabled.has(n))
      .slice(0, pickCount)
  );

  useEffect(() => {
    // notify parent whenever selection updates
    const out = sorted ? [...selected].sort((a, b) => a - b) : selected;
    onChange(out);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, sorted]);

  // helper: toggle a number
  function toggleNumber(n) {
    if (safeDisabled.has(n)) return;
    setSelected((prev) => {
      const has = prev.includes(n);
      if (has) return prev.filter((x) => x !== n);
      if (prev.length >= pickCount) {
        // If maximum reached, replace oldest selected or ignore — we'll replace the first
        const next = prev.slice(1).concat(n);
        return next;
      }
      return prev.concat(n);
    });
  }

  // helper: generate secure random integers
  function secureRandomInts(count, maxExclusive) {
    // returns array of unique ints in [0, maxExclusive)
    const arr = [];
    // Use crypto if available
    const cryptoObj = typeof crypto !== "undefined" ? crypto : null;
    const outSet = new Set();
    while (outSet.size < count) {
      let r;
      if (cryptoObj?.getRandomValues) {
        // generate 4 bytes and convert
        const buf = new Uint32Array(1);
        cryptoObj.getRandomValues(buf);
        r = buf[0] % maxExclusive;
      } else {
        r = Math.floor(Math.random() * maxExclusive);
      }
      outSet.add(r);
      // avoid infinite loop if count > maxExclusive handled outside
      if (outSet.size === maxExclusive) break;
    }
    return Array.from(outSet);
  }

  // quick-pick: generate random unique numbers using secureRandomInts
  function quickPick() {
    const available = [];
    for (let i = 1; i <= poolSize; i++) {
      if (!safeDisabled.has(i)) available.push(i);
    }
    if (available.length <= pickCount) {
      setSelected(available.slice(0, pickCount));
      return;
    }
    // map pool indices to available list
    const indices = secureRandomInts(pickCount, available.length);
    const picks = indices.map((idx) => available[idx]);
    setSelected(picks);
  }

  function clearSelection() {
    setSelected([]);
  }

  const gridNumbers = useMemo(() => {
    const list = [];
    for (let i = 1; i <= poolSize; i++) list.push(i);
    return list;
  }, [poolSize]);

  // minimal inline styles — you can override via className
  const styles = {
    wrapper: {
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      maxWidth: 520,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(44px, 1fr))",
      gap: 8,
      marginTop: 8,
    },
    ball: {
      userSelect: "none",
      padding: "10px 6px",
      borderRadius: 999,
      border: "1px solid #ddd",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: 600,
    },
    selected: {
      background: "#156064",
      color: "white",
      borderColor: "#1669c7",
    },
    disabledStyle: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    controls: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      alignItems: "center",
      flexWrap: "wrap",
    },
    hint: { fontSize: 13, color: "#444" },
    btn: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #ddd",
      cursor: "pointer",
      background: "white",
    },
  };

  return (
    <div className={`lottery-picker ${className}`} style={styles.wrapper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div>
          <div>
            <strong>
              Pick {pickCount} of {poolSize}
            </strong>
          </div>
          <div style={styles.hint} aria-hidden>
            Click numbers to toggle. Quick-pick to randomize.
          </div>
        </div>

        <div style={{ display: "flex", gap: 15 }}>
          <button
            type="button"
            onClick={quickPick}
            style={styles.btn}
            aria-label="Quick pick random numbers"
          >
            Quick pick
          </button>
          <button
            type="button"
            onClick={clearSelection}
            style={styles.btn}
            aria-label="Clear selection"
          >
            Clear
          </button>
        </div>
      </div>
      <div style={{ height: 20 }}></div>
      <div style={styles.grid} role="list" aria-label="lottery numbers">
        {gridNumbers.map((n) => {
          const isSelected = selected.includes(n);
          const isDisabled = safeDisabled.has(n);
          return (
            <div
              key={n}
              role="listitem"
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                  e.preventDefault();
                  toggleNumber(n);
                }
              }}
              onClick={() => !isDisabled && toggleNumber(n)}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
              style={{
                ...styles.ball,
                ...(isSelected ? styles.selected : {}),
                ...(isDisabled ? styles.disabledStyle : {}),
              }}
            >
              {n}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 14 }}>
          Selected:{" "}
          <strong>
            {(sorted ? [...selected].sort((a, b) => a - b) : selected).join(
              ", "
            ) || "—"}
          </strong>
        </div>
      </div>
    </div>
  );
}
