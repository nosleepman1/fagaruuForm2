import { useState } from "react";
import { useResponses } from "../hooks/useData.js";
import { LoadState, ErrorState, EmptyState } from "./ui.jsx";

// ─── Label maps for clean display ────────────────────────────────────────────
const SECTION_LABELS = {
  Q1: "Âge", Q2: "Sexe", Q3: "Zone", Q3_ville: "Ville/commune",
  Q4: "Profession", Q4_autre: "Profession (autre)", Q5: "Niveau d'études",
  Q6: "Langues", Q6_autre: "Langue (autre)",
  Q7: "Fréq. consultation", Q8: "Distance soin", Q9: "Temps d'attente",
  Q10: "Freins consultation", Q10_autre: "Frein (autre)", Q11: "Coût consultation", Q12: "Assurance",
  Q13: "Type téléphone", Q14: "Accès internet", Q15: "Paiement mobile",
  Q16: "Fréq. apps", Q17: "App santé", Q17_detail: "App santé (détail)",
  Q18: "Téléconsultation", Q19: "Motifs téléconsult.", Q20: "Mode préféré",
  Q21: "Prix téléconsult.", Q22: "Confiance diagnostic",
  Q23: "Conservation docs", Q23_autre: "Docs (autre)", Q24: "Dossier numérique", Q25: "Partage dossier",
  Q26: "Paiement mobile soins", Q27: "Mode paiement", Q28: "Paiement pharmacie",
  Q29: "Groupe sanguin", Q29_groupe: "Groupe (valeur)", Q30: "Don de sang",
  Q31: "Raisons non-don", Q31_autre: "Raison (autre)", Q32: "Urgence sang", Q32_detail: "Urgence (détail)",
  Q33: "Notifications sang", Q34: "Avis anonymisation",
  Q35: "Langue app", Q35_autre: "Autre langue", Q36: "Assistant auto", Q37: "Usages assistant",
  Q38: "Préoccupations", Q39: "Confiance données", Q40: "Garant données",
  Q41: "Fonctionnalité utile", Q42: "Faire connaître FAGARUU", Q43: "Suggestions",
  Q44: "Phase pilote", Q44_prenom: "Prénom", Q44_telephone: "Téléphone"
};

const SECTIONS = [
  { label: "Profil", keys: ["Q1","Q2","Q3","Q3_ville","Q4","Q4_autre","Q5","Q6","Q6_autre"] },
  { label: "Accès soins", keys: ["Q7","Q8","Q9","Q10","Q10_autre","Q11","Q12"] },
  { label: "Numérique", keys: ["Q13","Q14","Q15","Q16","Q17","Q17_detail"] },
  { label: "Téléconsult.", keys: ["Q18","Q19","Q20","Q21","Q22"] },
  { label: "Dossier", keys: ["Q23","Q23_autre","Q24","Q25"] },
  { label: "Paiement", keys: ["Q26","Q27","Q28"] },
  { label: "Don sang", keys: ["Q29","Q29_groupe","Q30","Q31","Q31_autre","Q32","Q32_detail","Q33","Q34"] },
  { label: "Assistant", keys: ["Q35","Q35_autre","Q36","Q37"] },
  { label: "Confiance", keys: ["Q38","Q39","Q40"] },
  { label: "Suggestions", keys: ["Q41","Q42","Q43"] },
  { label: "Engagement", keys: ["Q44","Q44_prenom"] },
];

function formatValue(v) {
  if (v === null || v === undefined || v === "") return <span style={{ color: "var(--border)", fontStyle: "italic" }}>—</span>;
  if (Array.isArray(v)) {
    if (v.length === 0) return <span style={{ color: "var(--border)", fontStyle: "italic" }}>—</span>;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {v.map((item, i) => (
          <span key={i} style={{
            padding: "2px 8px", borderRadius: 4,
            background: "var(--primary-dim)", color: "var(--primary)",
            fontSize: 11, fontWeight: 500
          }}>{item}</span>
        ))}
      </div>
    );
  }
  if (typeof v === "number") return (
    <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}>{v}</span>
  );
  return <span>{String(v)}</span>;
}

// ─── Detail drawer ────────────────────────────────────────────────────────────
function ResponseDrawer({ response, onClose }) {
  const [activeSection, setActiveSection] = useState(0);
  if (!response) return null;

  const submittedAt = new Date(response.submittedAt || response.createdAt);

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 200 }}
      />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(680px, 100vw)",
        background: "var(--surface)", borderLeft: "1px solid var(--border)",
        zIndex: 201, display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.5)"
      }}>
        {/* Drawer header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>
              Réponse — {response.Q44_prenom || "Anonyme"}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
              {submittedAt.toLocaleDateString("fr-FR", { day:"2-digit", month:"long", year:"numeric" })}
              {" · "}
              {response.metadata?.duration ? `${Math.round(response.metadata.duration / 60)} min` : "durée inconnue"}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)",
            background: "transparent", color: "var(--text-muted)", cursor: "pointer",
            fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
          }}>×</button>
        </div>

        {/* Section tabs */}
        <div style={{
          display: "flex", gap: 4, padding: "12px 16px", borderBottom: "1px solid var(--border)",
          overflowX: "auto", flexShrink: 0
        }}>
          {SECTIONS.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              padding: "5px 11px", borderRadius: 6, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
              background: activeSection === i ? "var(--primary-dim)" : "transparent",
              color: activeSection === i ? "var(--primary)" : "var(--text-muted)",
              borderBottom: activeSection === i ? "2px solid var(--primary)" : "2px solid transparent",
              transition: "all 0.15s"
            }}>{s.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {SECTIONS[activeSection].keys.map(key => {
            const val = response[key];
            const hasValue = val !== null && val !== undefined && val !== "" && !(Array.isArray(val) && val.length === 0);
            return (
              <div key={key} style={{
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                opacity: hasValue ? 1 : 0.45
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 5 }}>
                  {key} · {SECTION_LABELS[key] || key}
                </div>
                <div style={{ fontSize: 13, color: "var(--text)" }}>{formatValue(val)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Table row ────────────────────────────────────────────────────────────────
function TableRow({ response, onClick, index }) {
  const [hov, setHov] = useState(false);
  const date = new Date(response.submittedAt || response.createdAt);

  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer", transition: "background 0.12s",
        background: hov ? "var(--surface2)" : "transparent"
      }}
    >
      <td style={td}><span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text-muted)" }}>#{String(index).padStart(3, "0")}</span></td>
      <td style={td}><span style={{ fontSize: 13 }}>{response.Q44_prenom || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Anonyme</span>}</span></td>
      <td style={td}><Badge text={response.Q1} /></td>
      <td style={td}><Badge text={response.Q2} color="#a78bfa" /></td>
      <td style={td}><span style={{ fontSize: 12, color: "var(--text-dim)" }}>{response.Q3 || "—"}</span></td>
      <td style={td}>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
          background: response.Q18?.includes("sans hésitation") ? "rgba(0,200,150,0.15)" :
                      response.Q18?.includes("physique") ? "rgba(255,77,109,0.12)" : "var(--surface2)",
          color: response.Q18?.includes("sans hésitation") ? "var(--primary)" :
                 response.Q18?.includes("physique") ? "var(--red)" : "var(--text-muted)"
        }}>
          {response.Q18 ? response.Q18.substring(0, 24) + (response.Q18.length > 24 ? "…" : "") : "—"}
        </span>
      </td>
      <td style={td}><span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{date.toLocaleDateString("fr-FR")}</span></td>
      <td style={td}>
        <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
          {response.metadata?.duration ? `${Math.round(response.metadata.duration / 60)}m` : "—"}
        </span>
      </td>
      <td style={td}>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
          background: response.Q44 === "Oui" ? "rgba(0,200,150,0.12)" : "var(--surface2)",
          color: response.Q44 === "Oui" ? "var(--primary)" : "var(--text-muted)"
        }}>{response.Q44 || "—"}</span>
      </td>
    </tr>
  );
}

function Badge({ text, color = "var(--primary)" }) {
  if (!text) return <span style={{ color: "var(--border)" }}>—</span>;
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 7px", borderRadius: 4,
      background: `${color}18`, color
    }}>{text}</span>
  );
}

const td = {
  padding: "10px 14px",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "middle",
  fontSize: 13,
  color: "var(--text)"
};

const th = {
  padding: "10px 14px",
  borderBottom: "1px solid var(--border)",
  fontSize: 11, fontWeight: 700,
  color: "var(--text-muted)", textAlign: "left",
  textTransform: "uppercase", letterSpacing: "0.8px",
  whiteSpace: "nowrap", background: "var(--surface)"
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function ResponsesTable() {
  const { responses, total, pages, page, setPage, search, setSearch, loading, error } = useResponses();
  const [selected, setSelected] = useState(null);

  if (loading && responses.length === 0) return <LoadState text="Chargement des réponses…" />;
  if (error) return <ErrorState msg={error} />;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 80px" }}>
      {selected && <ResponseDrawer response={selected} onClose={() => setSelected(null)} />}

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Réponses individuelles</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{total} réponse{total > 1 ? "s" : ""} collectée{total > 1 ? "s" : ""}</div>
        </div>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Rechercher par prénom…"
          style={{
            padding: "9px 14px", borderRadius: 8, border: "1px solid var(--border)",
            background: "var(--surface2)", color: "var(--text)", fontFamily: "inherit",
            fontSize: 13, outline: "none", width: 220
          }}
        />
      </div>

      {responses.length === 0 ? (
        <EmptyState title="Aucune réponse" subtitle="Les réponses soumises via le formulaire apparaîtront ici." />
      ) : (
        <>
          <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--border)", boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
              <thead>
                <tr>
                  {["#","Prénom","Âge","Sexe","Zone","Téléconsult.","Date","Durée","Pilote"].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.map((r, i) => (
                  <TableRow
                    key={r._id}
                    response={r}
                    index={(page - 1) * 15 + i + 1}
                    onClick={() => setSelected(r)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              <PaginationBtn label="←" disabled={page === 1} onClick={() => setPage(p => p - 1)} />
              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) => (
                  p === "…"
                    ? <span key={`ellipsis-${i}`} style={{ padding: "0 4px", color: "var(--text-muted)", lineHeight: "32px" }}>…</span>
                    : <PaginationBtn key={p} label={p} active={p === page} onClick={() => setPage(p)} />
                ))
              }
              <PaginationBtn label="→" disabled={page === pages} onClick={() => setPage(p => p + 1)} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PaginationBtn({ label, onClick, active, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 32, height: 32, borderRadius: 7, border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
      background: active ? "var(--primary-dim)" : "transparent",
      color: active ? "var(--primary)" : disabled ? "var(--border)" : "var(--text-muted)",
      cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit",
      fontSize: 13, fontWeight: active ? 700 : 400, transition: "all 0.15s"
    }}>{label}</button>
  );
}