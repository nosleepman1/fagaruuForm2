import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`${API}/api/responses/stats`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => { setError("Impossible de charger les statistiques."); setLoading(false); });
  }, []);

  if (loading) return <LoadState />;
  if (error) return <ErrorState msg={error} />;
  if (!stats || stats.total === 0) return <EmptyState />;

  const tabs = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "profil", label: "Profil" },
    { id: "connaissances", label: "Connaissances SR" },
    { id: "sources", label: "Sources d'info" },
    { id: "freins", label: "Freins" },
    { id: "attentes", label: "Attentes FAGARU" },
    { id: "anonyme", label: "Module anonyme" },
    { id: "confiance", label: "Confiance" },
    { id: "numerique", label: "Numérique" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        <KPICard label="Réponses totales" value={stats.total} color="var(--primary)" />
        <KPICard label="Connaissance SR" value={stats.connaissances?.Q9 ? `${stats.connaissances.Q9.avg?.toFixed(1)}/5` : "—"} color="#6ee7f7" />
        <KPICard label="Confiance plateforme" value={stats.confiance?.Q30 ? `${stats.confiance.Q30.avg?.toFixed(1)}/5` : "—"} color="#a78bfa" />
        <KPICard label="Prêts à tester" value={pct(stats.engagement?.Q40, "Oui", stats.total)} color="var(--accent)" />
      </div>

      {/* Timeline */}
      {stats.timeline?.length > 0 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Réponses par jour</h3>
          <Timeline data={stats.timeline} />
        </div>
      )}

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, transition: "all 0.2s",
            background: activeTab === t.id ? "var(--primary-dim)" : "var(--surface2)",
            color: activeTab === t.id ? "var(--primary)" : "var(--text-muted)",
            borderBottom: activeTab === t.id ? "2px solid var(--primary)" : "2px solid transparent"
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab stats={stats} />}
      {activeTab === "profil" && <ProfilTab data={stats.profil} />}
      {activeTab === "connaissances" && <ConnaissancesTab data={stats.connaissances} total={stats.total} />}
      {activeTab === "sources" && <SourcesTab data={stats.sources} total={stats.total} />}
      {activeTab === "freins" && <FreinsTab data={stats.freins} total={stats.total} />}
      {activeTab === "attentes" && <AttentesTab data={stats.attentes} total={stats.total} />}
      {activeTab === "anonyme" && <ModuleAnonymeTab data={stats.moduleAnonyme} total={stats.total} />}
      {activeTab === "confiance" && <ConfianceTab data={stats.confiance} total={stats.total} />}
      {activeTab === "numerique" && <NumeriqueTab data={stats.numerique} total={stats.total} />}
    </div>
  );
}

// ─── Section 1: Profil ────────────────────────────────────────────────────────

function OverviewTab({ stats }) {
  const total = stats.total;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Tranches d'âge" data={stats.profil?.Q1} total={total} color="var(--primary)" />
      <ChartCard title="Sexe" data={stats.profil?.Q2} total={total} color="#a78bfa" />
      <ChartCard title="Zone de résidence" data={stats.profil?.Q3} total={total} color="#6ee7f7" />
      <ChartCard title="Utiliserait FAGARU" data={stats.attentes?.Q20} total={total} color="var(--accent)" />
    </div>
  );
}

function ProfilTab({ data }) {
  const total_entries = data?.Q1?.reduce((s, r) => s + r.count, 0) || 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Âge" data={data?.Q1} total={total_entries} color="var(--primary)" />
      <ChartCard title="Sexe" data={data?.Q2} total={total_entries} color="#a78bfa" />
      <ChartCard title="Zone" data={data?.Q3} total={total_entries} color="#6ee7f7" />
      <ChartCard title="Situation actuelle" data={data?.Q4} total={total_entries} color="var(--accent)" />
      <ChartCard title="Avec qui vis-tu" data={data?.Q5} total={total_entries} color="#fcd34d" />
      <ChartCard title="Langues parlées" data={data?.Q6} total={total_entries} color="#f9a8d4" />
    </div>
  );
}

// ─── Section 2: Connaissances SR ──────────────────────────────────────────────

function ConnaissancesTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Éducation SR reçue" data={data?.Q7} total={total} color="var(--primary)" />
      <ChartCard title="Âge première info" data={data?.Q8} total={total} color="#6ee7f7" />
      {data?.Q9 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Niveau de connaissance SR</h3>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "var(--primary)" }}>{data.Q9.avg?.toFixed(2)}<span style={{ fontSize: 24 }}>/5</span></div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{data.Q9.count} réponses</div>
          </div>
        </div>
      )}
      <ChartCard title="Sujets souhaités" data={data?.Q10} total={total} color="#fcd34d" />
    </div>
  );
}

// ─── Section 3: Sources d'info ────────────────────────────────────────────────

function SourcesTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Sources consultées en premier" data={data?.Q11} total={total} color="var(--primary)" />
      <ChartCard title="Contenus internet consultés" data={data?.Q14} total={total} color="#6ee7f7" />
      <ChartCard title="Info fausse reçue" data={data?.Q15} total={total} color="var(--accent)" />
    </div>
  );
}

// ─── Section 4: Freins ────────────────────────────────────────────────────────

function FreinsTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Facilité à en parler" data={data?.Q16} total={total} color="var(--primary)" />
      <ChartCard title="Freins principaux" data={data?.Q17} total={total} color="var(--red)" />
      <ChartCard title="Sujets jamais abordés" data={data?.Q18} total={total} color="#fcd34d" />
      <ChartCard title="Endroit adapté connu" data={data?.Q19} total={total} color="#a78bfa" />
    </div>
  );
}

// ─── Section 5: Attentes FAGARU ───────────────────────────────────────────────

function AttentesTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Utiliserait FAGARU" data={data?.Q20} total={total} color="var(--primary)" />
      <ChartCard title="Format d'info préféré" data={data?.Q21} total={total} color="#6ee7f7" />
      <ChartCard title="Langue préférée" data={data?.Q22} total={total} color="#a78bfa" />
      <ChartCard title="Canal d'accès préféré" data={data?.Q23} total={total} color="var(--accent)" />
      <ChartCard title="Fréquence d'utilisation" data={data?.Q24} total={total} color="#fcd34d" />
    </div>
  );
}

// ─── Section 6: Module anonyme ────────────────────────────────────────────────

function ModuleAnonymeTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Utilité du module" data={data?.Q25} total={total} color="var(--primary)" />
      <ChartCard title="Confiance envers le répondant" data={data?.Q26} total={total} color="#6ee7f7" />
      <ChartCard title="Délai de réponse souhaité" data={data?.Q27} total={total} color="#fcd34d" />
      <ChartCard title="Conditions acceptées" data={data?.Q28} total={total} color="var(--accent)" />
    </div>
  );
}

// ─── Section 7: Confiance ─────────────────────────────────────────────────────

function ConfianceTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Inquiétudes" data={data?.Q29} total={total} color="var(--red)" />
      {data?.Q30 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Confiance plateforme officielle</h3>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#a78bfa" }}>{data.Q30.avg?.toFixed(2)}<span style={{ fontSize: 24 }}>/5</span></div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{data.Q30.count} réponses</div>
          </div>
        </div>
      )}
      <ChartCard title="Acteurs de promotion souhaités" data={data?.Q31} total={total} color="var(--primary)" />
    </div>
  );
}

// ─── Section 8: Numérique ─────────────────────────────────────────────────────

function NumeriqueTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Type de téléphone" data={data?.Q32} total={total} color="var(--primary)" />
      <ChartCard title="Mode de connexion" data={data?.Q33} total={total} color="#6ee7f7" />
      <ChartCard title="Temps sur écran par jour" data={data?.Q34} total={total} color="#fcd34d" />
      <ChartCard title="Réseaux sociaux" data={data?.Q35} total={total} color="var(--accent)" />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChartCard({ title, data, total, color }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count));
  return (
    <div style={cardStyle}>
      <h3 style={cardTitle}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map(item => {
          const pct_val = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item._id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "var(--text-dim)", maxWidth: "75%", lineHeight: 1.3 }}>{item._id}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{item.count} ({pct_val}%)</span>
              </div>
              <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(item.count / max) * 100}%`,
                  background: color,
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                  opacity: 0.85
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KPICard({ label, value, color }) {
  return (
    <div style={{ ...cardStyle, textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Timeline({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
      {data.map(d => (
        <div key={d._id} title={`${d._id}: ${d.count}`} style={{
          flex: 1, minWidth: 8,
          height: `${(d.count / max) * 100}%`,
          background: "var(--primary)", borderRadius: "3px 3px 0 0",
          opacity: 0.8, cursor: "pointer", transition: "opacity 0.2s"
        }} />
      ))}
    </div>
  );
}

function pct(data, value, total) {
  if (!data || !total) return "—";
  const item = data.find(d => d._id === value);
  return item ? `${Math.round((item.count / total) * 100)}%` : "0%";
}

function LoadState() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTop: "3px solid var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Chargement des statistiques…</p>
    </div>
  );
}

function ErrorState({ msg }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <p style={{ color: "var(--red)" }}>{msg}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", gap: 12 }}>
      <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Aucune réponse encore soumise.</p>
      <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Les statistiques apparaîtront ici dès la première réponse.</p>
    </div>
  );
}

const cardStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "20px 20px 16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.2)"
};

const cardTitle = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-dim)",
  marginBottom: 14,
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};