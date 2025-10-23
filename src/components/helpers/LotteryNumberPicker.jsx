/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useMemo, useState } from "react";

export default function LotteryNumberPicker({
  poolSize = 49,
  minPicks = 1,
  picksCount = 6,
  sorted = true,
  initialSelection = [],
  disabled = [],
  onChange = () => {},
  className = "",
}) {
  const safeDisabled = useMemo(
    () => new Set((disabled || []).map(Number)),
    [disabled]
  );

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const minCount = clamp(Number(minPicks) || 1, 1, poolSize);
  const maxCount = clamp(Number(picksCount) || 6, minCount, poolSize);

  const [selected, setSelected] = useState(() =>
    (initialSelection || [])
      .map(Number)
      .filter((n) => n >= 1 && n <= poolSize && !safeDisabled.has(n))
      .slice(0, maxCount)
  );

  useEffect(() => {
    const out = sorted ? [...selected].sort((a, b) => a - b) : selected;
    onChange(out);
  }, [onChange, selected, sorted]);

  const minReached = selected.length >= minCount;
  const maxReached = selected.length >= maxCount;

  function toggleNumber(n) {
    if (safeDisabled.has(n)) return;
    setSelected((prev) => {
      const has = prev.includes(n);
      if (has) return prev.filter((x) => x !== n);
      if (prev.length >= maxCount) return prev; // stop when at max
      return prev.concat(n);
    });
  }

  function secureRandomInts(count, maxExclusive) {
    const cryptoObj = typeof crypto !== "undefined" ? crypto : null;
    const outSet = new Set();
    while (outSet.size < count) {
      let r;
      if (cryptoObj?.getRandomValues) {
        const buf = new Uint32Array(1);
        cryptoObj.getRandomValues(buf);
        r = buf[0] % maxExclusive;
      } else {
        r = Math.floor(Math.random() * maxExclusive);
      }
      outSet.add(r);
      if (outSet.size === maxExclusive) break;
    }
    return Array.from(outSet);
  }

  function quickPick() {
    const available = [];
    for (let i = 1; i <= poolSize; i++) {
      if (!safeDisabled.has(i)) available.push(i);
    }
    const indices = secureRandomInts(maxCount, available.length);
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

  const styles = {
    wrapper: {
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      width: "100%",
      boxSizing: "border-box",
      padding: "0 1rem",
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
      transition: "all 0.15s ease",
    },
    selected: {
      background: "#156064",
      color: "white",
      borderColor: "#1669c7",
    },
    disabledStyle: {
      opacity: 0.4,
      cursor: "not-allowed",
      pointerEvents: "none",
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
    invalidText: {
      color: "#c62828",
      fontSize: 13,
      marginTop: 6,
    },
  };

  return (
    <div className={`lottery-picker ${className}`} style={styles.wrapper}>
      <div
        style={
          {
            //display: "flex",
            //   justifyContent: "space-around",
            //   gap: 12,
            //   alignItems: "center",
          }
        }
      >
        <div className="mb-5">
          <div>
            <strong>
              Pick between {minCount} and {maxCount} numbers
            </strong>
          </div>
          <div style={styles.hint} aria-hidden>
            Click numbers to toggle. Quick-pick to randomize.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            margin: "10px 0",
          }}
        >
          <button
            type="button"
            onClick={quickPick}
            style={{
              ...styles.btn,
              flex: 1,
              ...(maxReached ? styles.disabledStyle : {}),
            }}
            disabled={maxReached}
          >
            Quick pick
          </button>
          <button
            type="button"
            onClick={clearSelection}
            style={{...styles.btn, flex: 1}}
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
          const isDisabled = safeDisabled.has(n) || (maxReached && !isSelected); // 🔥 disables when full

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

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 14 }}>
          Selected:{" "}
          <strong>
            {(sorted ? [...selected].sort((a, b) => a - b) : selected).join(
              ", "
            ) || "—"}
          </strong>
        </div>

        {!minReached && (
          <div style={styles.invalidText}>
            Please select at least {minCount} number
            {minCount > 1 ? "s" : ""}.
          </div>
        )}
      </div>
    </div>
  );
}
