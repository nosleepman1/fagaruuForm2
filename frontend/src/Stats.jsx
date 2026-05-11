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
      .catch(e => { setError(e.message || "Impossible de charger les statistiques."); setLoading(false); });
  }, []);

  if (loading) return <LoadState />;
  if (error) return <ErrorState msg={error} />;
  if (!stats || stats.total === 0) return <EmptyState />;

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: "📊" },
    { id: "profil", label: "Profil", icon: "👤" },
    { id: "connaissances", label: "Connaissances", icon: "📚" },
    { id: "sources", label: "Sources & Freins", icon: "🔍" },
    { id: "attentes", label: "Attentes FAGARU", icon: "✨" },
    { id: "confiance", label: "Confiance", icon: "🔒" },
    { id: "numerique", label: "Numérique", icon: "📱" },
    { id: "engagement", label: "Engagement", icon: "🚀" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        <KPICard label="Réponses totales" value={stats.total} icon="📊" color="var(--primary)" />
        <KPICard
          label="Connaissance SR"
          value={stats.connaissances?.Q9 ? `${stats.connaissances.Q9.avg?.toFixed(1)}/5` : "—"}
          icon="📚" color="#6ee7f7"
        />
        <KPICard
          label="Confiance plateforme"
          value={stats.confiance?.Q30 ? `${stats.confiance.Q30.avg?.toFixed(1)}/5` : "—"}
          icon="🔒" color="#a78bfa"
        />
        <KPICard
          label="Prêts à tester"
          value={pct(stats.engagement?.Q40, "Oui", stats.total)}
          icon="🚀" color="var(--accent)"
        />
      </div>

      {/* Timeline */}
      {stats.timeline?.length > 0 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Réponses par jour</h3>
          <Timeline data={stats.timeline} />
        </div>
      )}

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap", marginTop: 24 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: 12, fontWeight: 500, transition: "all 0.2s",
            background: activeTab === t.id ? "var(--primary-dim)" : "var(--surface2)",
            color: activeTab === t.id ? "var(--primary)" : "var(--text-muted)",
            borderBottom: activeTab === t.id ? "2px solid var(--primary)" : "2px solid transparent"
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab stats={stats} />}
      {activeTab === "profil" && <ProfilTab data={stats.profil} total={stats.total} />}
      {activeTab === "connaissances" && <ConnaissancesTab data={stats.connaissances} total={stats.total} />}
      {activeTab === "sources" && <SourcesFreinsTab sources={stats.sources} freins={stats.freins} total={stats.total} />}
      {activeTab === "attentes" && <AttentesTab attentes={stats.attentes} moduleAnonyme={stats.moduleAnonyme} total={stats.total} />}
      {activeTab === "confiance" && <ConfianceTab data={stats.confiance} total={stats.total} />}
      {activeTab === "numerique" && <NumeriqueTab data={stats.numerique} total={stats.total} />}
      {activeTab === "engagement" && <EngagementTab data={stats.engagement} total={stats.total} />}
    </div>
  );
}

// ─── Tab Components ──────────────────────────────────────────────────────────

function OverviewTab({ stats }) {
  const t = stats.total;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Tranches d'âge (Q1)" data={stats.profil?.Q1} total={t} color="var(--primary)" />
      <ChartCard title="Sexe (Q2)" data={stats.profil?.Q2} total={t} color="#a78bfa" />
      <ChartCard title="Zone de résidence (Q3)" data={stats.profil?.Q3} total={t} color="#6ee7f7" />
      <ChartCard title="Facilité à parler de SR (Q16)" data={stats.freins?.Q16} total={t} color="var(--accent)" />
      <ChartCard title="Utiliserait une app FAGARU (Q20)" data={stats.attentes?.Q20} total={t} color="#fcd34d" />
      <ChartCard title="Participer aux tests (Q40)" data={stats.engagement?.Q40} total={t} color="#f9a8d4" />
    </div>
  );
}

// Section 1 - Toi en quelques mots
function ProfilTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Âge (Q1)" data={data?.Q1} total={total} color="var(--primary)" />
      <ChartCard title="Sexe (Q2)" data={data?.Q2} total={total} color="#a78bfa" />
      <ChartCard title="Zone de résidence (Q3)" data={data?.Q3} total={total} color="#6ee7f7" />
      <ChartCard title="Situation actuelle (Q4)" data={data?.Q4} total={total} color="var(--accent)" />
      <ChartCard title="Avec qui vis-tu (Q5)" data={data?.Q5} total={total} color="#fcd34d" />
      <ChartCard title="Langues parlées (Q6)" data={data?.Q6} total={total} color="#f9a8d4" />
    </div>
  );
}

// Section 2 - Ce que tu sais déjà
function ConnaissancesTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Éducation SR reçue (Q7)" data={data?.Q7} total={total} color="var(--primary)" />
      <ChartCard title="Âge première info SR (Q8)" data={data?.Q8} total={total} color="#6ee7f7" />
      {data?.Q9 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Niveau de connaissance SR (Q9)</h3>
          <ScoreDisplay data={data.Q9} color="var(--primary)" label="connaissance" />
        </div>
      )}
      <ChartCard title="Sujets souhaités (Q10)" data={data?.Q10} total={total} color="#fcd34d" />
    </div>
  );
}

// Section 3 + 4 - Sources & Freins
function SourcesFreinsTab({ sources, freins, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Sources consultées (Q11)" data={sources?.Q11} total={total} color="var(--primary)" />
      <ChartCard title="Contenus internet consultés (Q14)" data={sources?.Q14} total={total} color="#6ee7f7" />
      <ChartCard title="Info fausse reçue (Q15)" data={sources?.Q15} total={total} color="var(--accent)" />
      <ChartCard title="Facilité à parler de SR (Q16)" data={freins?.Q16} total={total} color="#a78bfa" />
      <ChartCard title="Freins à poser ses questions (Q17)" data={freins?.Q17} total={total} color="var(--red)" />
      <ChartCard title="Sujets jamais abordés (Q18)" data={freins?.Q18} total={total} color="#fcd34d" />
      <ChartCard title="Endroit adapté connu (Q19)" data={freins?.Q19} total={total} color="#f9a8d4" />
    </div>
  );
}

// Section 5 + 6 - Attentes FAGARU + Module anonyme
function AttentesTab({ attentes, moduleAnonyme, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Utiliserait une app/site (Q20)" data={attentes?.Q20} total={total} color="var(--primary)" />
      <ChartCard title="Format d'info préféré (Q21)" data={attentes?.Q21} total={total} color="#6ee7f7" />
      <ChartCard title="Langue préférée (Q22)" data={attentes?.Q22} total={total} color="#a78bfa" />
      <ChartCard title="Canal d'accès préféré (Q23)" data={attentes?.Q23} total={total} color="var(--accent)" />
      <ChartCard title="Fréquence d'utilisation (Q24)" data={attentes?.Q24} total={total} color="#fcd34d" />
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ ...cardTitle, color: "var(--primary)", fontSize: 14, marginBottom: 16, marginTop: 8, letterSpacing: 0 }}>
          📝 Module « Pose ta question » anonyme
        </h3>
      </div>
      <ChartCard title="Utilité du module (Q25)" data={moduleAnonyme?.Q25} total={total} color="var(--primary)" />
      <ChartCard title="Confiance envers le répondant (Q26)" data={moduleAnonyme?.Q26} total={total} color="#6ee7f7" />
      <ChartCard title="Délai de réponse souhaité (Q27)" data={moduleAnonyme?.Q27} total={total} color="#a78bfa" />
      <ChartCard title="Conditions acceptées (Q28)" data={moduleAnonyme?.Q28} total={total} color="var(--accent)" />
    </div>
  );
}

// Section 7 - Confiance et confidentialité
function ConfianceTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Inquiétudes plateforme (Q29)" data={data?.Q29} total={total} color="var(--red)" />
      {data?.Q30 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Confiance plateforme officielle (Q30)</h3>
          <ScoreDisplay data={data.Q30} color="#a78bfa" label="confiance" />
        </div>
      )}
      <ChartCard title="Acteurs de promotion souhaités (Q31)" data={data?.Q31} total={total} color="var(--primary)" />
    </div>
  );
}

// Section 8 - Ton accès au numérique
function NumeriqueTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Type de téléphone (Q32)" data={data?.Q32} total={total} color="var(--primary)" />
      <ChartCard title="Mode de connexion internet (Q33)" data={data?.Q33} total={total} color="#6ee7f7" />
      <ChartCard title="Temps sur téléphone/internet (Q34)" data={data?.Q34} total={total} color="#fcd34d" />
      <ChartCard title="Réseaux sociaux (Q35)" data={data?.Q35} total={total} color="var(--accent)" />
    </div>
  );
}

// Section 10 - Et après ?
function EngagementTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Participer aux tests FAGARU (Q40)" data={data?.Q40} total={total} color="var(--primary)" />
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

function ScoreDisplay({ data, color, label }) {
  if (!data) return null;
  const filled = Math.round(data.avg || 0);
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{
            width: 28, height: 28, borderRadius: 6,
            background: n <= filled ? color : "var(--border)",
            opacity: n <= filled ? 1 : 0.4,
            transition: "background 0.3s"
          }} />
        ))}
      </div>
      <div style={{ fontSize: 48, fontWeight: 700, color }}>
        {data.avg?.toFixed(2)}<span style={{ fontSize: 24 }}>/5</span>
      </div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
        {data.count} réponse{data.count > 1 ? "s" : ""} · niveau de {label}
      </div>
    </div>
  );
}

function KPICard({ label, value, icon, color }) {
  return (
    <div style={{ ...cardStyle, textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
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
      <p style={{ color: "var(--red)" }}>❌ {msg}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", gap: 12 }}>
      <div style={{ fontSize: 48 }}>📭</div>
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