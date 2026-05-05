import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`${API}/api/stats`)
      .then(r => r.json())
      .then(d => { setStats(d); setLoading(false); })
      .catch(() => { setError("Impossible de charger les statistiques."); setLoading(false); });
  }, []);

  if (loading) return <LoadState />;
  if (error) return <ErrorState msg={error} />;
  if (!stats || stats.total === 0) return <EmptyState />;

  const tabs = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "profil", label: "Profil" },
    { id: "acces", label: "Accès soins" },
    { id: "numerique", label: "Numérique" },
    { id: "teleconsultation", label: "Téléconsultation" },
    { id: "sang", label: "Don de sang" },
    { id: "confiance", label: "Confiance" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        <KPICard label="Réponses totales" value={stats.total} icon="📊" color="var(--primary)" />
        <KPICard label="Confiance diagnostic" value={stats.teleconsultation?.Q22 ? `${stats.teleconsultation.Q22.avg?.toFixed(1)}/5` : "—"} icon="🩺" color="#6ee7f7" />
        <KPICard label="Confiance données" value={stats.confiance?.Q39 ? `${stats.confiance.Q39.avg?.toFixed(1)}/5` : "—"} icon="🔒" color="#a78bfa" />
        <KPICard label="Pilote Dakar" value={pct(stats.engagement?.Q44, "Oui", stats.total)} icon="🚀" color="var(--accent)" />
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
      {activeTab === "acces" && <AccesTab data={stats.acces} total={stats.total} />}
      {activeTab === "numerique" && <NumeriqueTab data={stats.numerique} total={stats.total} />}
      {activeTab === "teleconsultation" && <TeleconsultTab data={stats.teleconsultation} total={stats.total} />}
      {activeTab === "sang" && <SangTab data={stats.sang} total={stats.total} />}
      {activeTab === "confiance" && <ConfianceTab data={stats.confiance} total={stats.total} />}
    </div>
  );
}

function OverviewTab({ stats }) {
  const total = stats.total;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Tranches d'âge" data={stats.profil?.Q1} total={total} color="var(--primary)" />
      <ChartCard title="Sexe" data={stats.profil?.Q2} total={total} color="#a78bfa" />
      <ChartCard title="Zone de résidence" data={stats.profil?.Q3} total={total} color="#6ee7f7" />
      <ChartCard title="Téléconsultation" data={stats.teleconsultation?.Q18} total={total} color="var(--accent)" />
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
      <ChartCard title="Profession" data={data?.Q4} total={total_entries} color="var(--accent)" />
      <ChartCard title="Niveau d'études" data={data?.Q5} total={total_entries} color="#fcd34d" />
      <ChartCard title="Langues parlées" data={data?.Q6} total={total_entries} color="#f9a8d4" />
    </div>
  );
}

function AccesTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Fréquence consultation" data={data?.Q7} total={total} color="var(--primary)" />
      <ChartCard title="Distance structure santé" data={data?.Q8} total={total} color="#6ee7f7" />
      <ChartCard title="Temps d'attente" data={data?.Q9} total={total} color="#fcd34d" />
      <ChartCard title="Freins à la consultation" data={data?.Q10} total={total} color="var(--red)" />
      <ChartCard title="Coût consultation" data={data?.Q11} total={total} color="var(--accent)" />
      <ChartCard title="Assurance santé" data={data?.Q12} total={total} color="#a78bfa" />
    </div>
  );
}

function NumeriqueTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Type de téléphone" data={data?.Q13} total={total} color="var(--primary)" />
      <ChartCard title="Accès internet" data={data?.Q14} total={total} color="#6ee7f7" />
      <ChartCard title="Services paiement mobile" data={data?.Q15} total={total} color="#fcd34d" />
      <ChartCard title="Fréquence apps mobiles" data={data?.Q16} total={total} color="var(--accent)" />
      <ChartCard title="App santé déjà utilisée" data={data?.Q17} total={total} color="#a78bfa" />
    </div>
  );
}

function TeleconsultTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Prêt(e) pour téléconsultation" data={data?.Q18} total={total} color="var(--primary)" />
      <ChartCard title="Motifs acceptés" data={data?.Q19} total={total} color="#6ee7f7" />
      <ChartCard title="Mode préféré" data={data?.Q20} total={total} color="#fcd34d" />
      <ChartCard title="Prix acceptable" data={data?.Q21} total={total} color="var(--accent)" />
      {data?.Q22 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Confiance diagnostic à distance</h3>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "var(--primary)" }}>{data.Q22.avg?.toFixed(2)}<span style={{ fontSize: 24 }}>/5</span></div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{data.Q22.count} réponses</div>
          </div>
        </div>
      )}
    </div>
  );
}

function SangTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Groupe sanguin connu" data={data?.Q29} total={total} color="var(--red)" />
      <ChartCard title="Déjà donné son sang" data={data?.Q30} total={total} color="var(--accent)" />
      <ChartCard title="Raisons de non-don" data={data?.Q31} total={total} color="#fcd34d" />
      <ChartCard title="Urgence sang vécue" data={data?.Q32} total={total} color="#a78bfa" />
      <ChartCard title="Notifications urgences" data={data?.Q33} total={total} color="var(--primary)" />
      <ChartCard title="Avis anonymisation" data={data?.Q34} total={total} color="#6ee7f7" />
    </div>
  );
}

function ConfianceTab({ data, total }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <ChartCard title="Préoccupations" data={data?.Q38} total={total} color="var(--red)" />
      {data?.Q39 && (
        <div style={cardStyle}>
          <h3 style={cardTitle}>Confiance sécurité des données</h3>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#a78bfa" }}>{data.Q39.avg?.toFixed(2)}<span style={{ fontSize: 24 }}>/5</span></div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{data.Q39.count} réponses</div>
          </div>
        </div>
      )}
      <ChartCard title="Garant sécurité données" data={data?.Q40} total={total} color="var(--primary)" />
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