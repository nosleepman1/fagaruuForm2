// ─── Shared style tokens ────────────────────────────────────────────────────
export const card = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "22px 22px 18px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.22)"
};

export const cardTitle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text-muted)",
  marginBottom: 16,
  textTransform: "uppercase",
  letterSpacing: "1.2px",
  fontFamily: "'DM Mono', monospace"
};

// ─── HorizontalBar ───────────────────────────────────────────────────────────
export function HorizontalBar({ label, count, total, max, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const barW = max > 0 ? (count / max) * 100 : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: "var(--text-dim)", maxWidth: "72%", lineHeight: 1.35 }}>{label}</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
          {count} · {pct}%
        </span>
      </div>
      <div style={{ height: 5, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${barW}%`,
          background: color, borderRadius: 4,
          transition: "width 0.7s cubic-bezier(.22,.68,0,1.2)",
          opacity: 0.9
        }} />
      </div>
    </div>
  );
}

// ─── ChartCard ───────────────────────────────────────────────────────────────
export function ChartCard({ title, data, total, color }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count));
  return (
    <div style={card}>
      <p style={cardTitle}>{title}</p>
      {data.map(item => (
        <HorizontalBar
          key={item._id}
          label={item._id}
          count={item.count}
          total={total}
          max={max}
          color={color}
        />
      ))}
    </div>
  );
}

// ─── ScoreCard ───────────────────────────────────────────────────────────────
export function ScoreCard({ title, data, color }) {
  if (!data) return null;
  const filled = Math.round(data.avg || 0);
  return (
    <div style={{ ...card, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <p style={cardTitle}>{title}</p>
      <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{
              width: 28, height: 28, borderRadius: 6,
              background: n <= filled ? color : "var(--border)",
              opacity: n <= filled ? 1 : 0.4,
              transition: "background 0.3s"
            }} />
          ))}
        </div>
        <div style={{ fontSize: 38, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>
          {data.avg?.toFixed(2)}
          <span style={{ fontSize: 18, color: "var(--text-muted)", fontWeight: 400 }}> / 5</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
          {data.count} réponse{data.count > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

// ─── KPICard ─────────────────────────────────────────────────────────────────
export function KPICard({ label, value, sub, color, trend }) {
  return (
    <div style={{ ...card, padding: "20px 20px 16px" }}>
      <p style={cardTitle}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{value}</span>
        {trend !== undefined && (
          <span style={{ fontSize: 12, color: trend >= 0 ? "var(--primary)" : "var(--red)", fontWeight: 600 }}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────
export function Timeline({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count));
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      {hovered && (
        <div style={{
          position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)",
          background: "var(--surface2)", border: "1px solid var(--border)",
          padding: "4px 10px", borderRadius: 6, fontSize: 12, color: "var(--text)",
          fontFamily: "'DM Mono', monospace", pointerEvents: "none", whiteSpace: "nowrap"
        }}>
          {hovered.date} — {hovered.count} réponse{hovered.count > 1 ? "s" : ""}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64 }}>
        {data.map(d => (
          <div
            key={d._id}
            onMouseEnter={() => setHovered({ date: d._id, count: d.count })}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1, minWidth: 6,
              height: `${Math.max(8, (d.count / max) * 100)}%`,
              background: hovered?._id === d._id ? "var(--accent)" : "var(--primary)",
              borderRadius: "3px 3px 0 0",
              opacity: hovered && hovered.date !== d._id ? 0.4 : 0.9,
              cursor: "default", transition: "all 0.15s"
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{data[0]?._id}</span>
        <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{data[data.length - 1]?._id}</span>
      </div>
    </div>
  );
}

// import useState needed for Timeline hover
import { useState } from "react";

// ─── Loader / Error / Empty ───────────────────────────────────────────────────
export function LoadState({ text = "Chargement…" }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", flexDirection: "column", gap: 14 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 36, height: 36, border: "2px solid var(--border)", borderTop: "2px solid var(--primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      <p style={{ color: "var(--text-muted)", fontSize: 13 }}>{text}</p>
    </div>
  );
}

export function ErrorState({ msg, onRetry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "40vh", gap: 12 }}>
      <p style={{ color: "var(--red)", fontSize: 14 }}>Erreur : {msg}</p>
      {onRetry && <button onClick={onRetry} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Réessayer</button>}
    </div>
  );
}

export function EmptyState({ title = "Aucune donnée", subtitle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "40vh", gap: 8 }}>
      <div style={{ width: 48, height: 48, border: "2px dashed var(--border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 20, height: 2, background: "var(--border)", borderRadius: 2 }} />
      </div>
      <p style={{ color: "var(--text-dim)", fontSize: 15, fontWeight: 600 }}>{title}</p>
      {subtitle && <p style={{ color: "var(--text-muted)", fontSize: 13 }}>{subtitle}</p>}
    </div>
  );
}