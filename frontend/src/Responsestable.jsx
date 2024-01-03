import { useState } from "react";
import { useResponses } from "./useData.jsx";
import { LoadState, ErrorState, EmptyState } from "./Ui.jsx";

// ─── Label maps for clean display ────────────────────────────────────────────
const SECTION_LABELS = {
  // Section 1 - Toi en quelques mots
  Q1: "Âge", Q2: "Sexe", Q3: "Zone", Q3_ville: "Ville/commune",
  Q4: "Situation actuelle", Q5: "Avec qui vis-tu", Q5_autre: "Autre (logement)",
  Q6: "Langues parlées",
  // Section 2 - Connaissances SR
  Q7: "Éducation SR reçue", Q8: "Âge première info SR", Q9: "Niveau connaissance SR",
  Q10: "Sujets souhaités", Q10_autre: "Autre sujet",
  // Section 3 - Sources
  Q11: "Sources consultées", Q12: "Source la plus fiable", Q13: "Source la plus utilisée",
  Q14: "Contenus internet", Q15: "Info fausse reçue", Q15_detail: "Sujet info fausse",
  // Section 4 - Freins
  Q16: "Facilité à parler de SR", Q17: "Freins à poser des questions",
  Q18: "Sujets jamais abordés", Q18_detail: "Détail sujets",
  Q19: "Endroit adapté connu", Q19_detail: "Lequel",
  // Section 5 - Attentes FAGARU
  Q20: "Utiliserait une app", Q21: "Format info préféré",
  Q22: "Langue préférée", Q22_autre: "Autre langue",
  Q23: "Canal d'accès", Q24: "Fréquence d'utilisation",
  // Section 6 - Module anonyme
  Q25: "Utilité module anonyme", Q26: "Confiance répondant",
  Q27: "Délai réponse souhaité", Q28: "Conditions acceptées",
  // Section 7 - Confiance
  Q29: "Inquiétudes plateforme", Q30: "Confiance officielle",
  Q31: "Acteurs promotion",
  // Section 8 - Numérique
  Q32: "Type téléphone", Q33: "Mode connexion", Q34: "Temps écran",
  Q35: "Réseaux sociaux", Q35_autre: "Autre réseau",
  // Section 9 - Idées
  Q36: "Question à un médecin", Q37: "Ce qui ferait adopter FAGARU",
  Q38: "Ce qui freinerait l'adoption", Q39: "Message / suggestion",
  // Section 10 - Et après
  Q40: "Participer aux tests", Q40_prenom: "Prénom", Q40_contact: "Contact"
};

const SECTIONS = [
  { label: "Profil", keys: ["Q1","Q2","Q3","Q3_ville","Q4","Q5","Q5_autre","Q6"] },
  { label: "Connaissances", keys: ["Q7","Q8","Q9","Q10","Q10_autre"] },
  { label: "Sources", keys: ["Q11","Q12","Q13","Q14","Q15","Q15_detail"] },
  { label: "Freins", keys: ["Q16","Q17","Q18","Q18_detail","Q19","Q19_detail"] },
  { label: "Attentes", keys: ["Q20","Q21","Q22","Q22_autre","Q23","Q24"] },
  { label: "Module anonyme", keys: ["Q25","Q26","Q27","Q28"] },
  { label: "Confiance", keys: ["Q29","Q30","Q31"] },
  { label: "Numérique", keys: ["Q32","Q33","Q34","Q35","Q35_autre"] },
  { label: "Idées", keys: ["Q36","Q37","Q38","Q39"] },
  { label: "Engagement", keys: ["Q40","Q40_prenom","Q40_contact"] },
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
              Réponse — {response.Q40_prenom || "Anonyme"}
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
      <td style={td}><span style={{ fontSize: 13 }}>{response.Q40_prenom || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Anonyme</span>}</span></td>
      <td style={td}><Badge text={response.Q1} /></td>
      <td style={td}><Badge text={response.Q2} color="#a78bfa" /></td>
      <td style={td}><span style={{ fontSize: 12, color: "var(--text-dim)" }}>{response.Q3 || "—"}</span></td>
      <td style={td}>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
          background: response.Q20?.includes("Oui") ? "rgba(0,200,150,0.15)" :
                      response.Q20?.includes("Non") ? "rgba(255,77,109,0.12)" : "var(--surface2)",
          color: response.Q20?.includes("Oui") ? "var(--primary)" :
                 response.Q20?.includes("Non") ? "var(--red)" : "var(--text-muted)"
        }}>
          {response.Q20 ? response.Q20.substring(0, 28) + (response.Q20.length > 28 ? "…" : "") : "—"}
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
          background: response.Q40 === "Oui" ? "rgba(0,200,150,0.12)" : "var(--surface2)",
          color: response.Q40 === "Oui" ? "var(--primary)" : "var(--text-muted)"
        }}>{response.Q40 || "—"}</span>
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
                  {["#","Prénom","Âge","Sexe","Zone","App FAGARU","Date","Durée","Test"].map(h => (
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