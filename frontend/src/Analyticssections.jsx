import { ChartCard, ScoreCard, KPICard, Timeline, card, cardTitle } from "./Ui.jsx";

// ─── Helper ───────────────────────────────────────────────────────────────────
function pct(data, value, total) {
  if (!data || !total) return "—";
  const item = data.find(d => d._id === value);
  return item ? `${Math.round((item.count / total) * 100)}%` : "0%";
}

// ─── Section grids ────────────────────────────────────────────────────────────
function Grid({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>{children}</div>;
}

// ─── KPI Bar ─────────────────────────────────────────────────────────────────
export function KPIBar({ stats }) {
  const { total, connaissances, confiance, engagement } = stats;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
      <KPICard label="Réponses totales" value={total} color="var(--primary)" />
      <KPICard
        label="Connaissance SR"
        value={connaissances?.Q9 ? `${connaissances.Q9.avg?.toFixed(1)} / 5` : "—"}
        sub="Niveau de connaissance (Q9)"
        color="#6ee7f7"
      />
      <KPICard
        label="Confiance plateforme"
        value={confiance?.Q30 ? `${confiance.Q30.avg?.toFixed(1)} / 5` : "—"}
        sub="Plateforme officielle (Q30)"
        color="#a78bfa"
      />
      <KPICard
        label="Prêts à tester"
        value={pct(engagement?.Q40, "Oui", total)}
        sub="Phase de test FAGARU"
        color="var(--accent)"
      />
    </div>
  );
}

// ─── TimelineCard ─────────────────────────────────────────────────────────────
export function TimelineCard({ data }) {
  if (!data?.length) return null;
  return (
    <div style={{ ...card, marginBottom: 28 }}>
      <p style={cardTitle}>Soumissions par jour</p>
      <Timeline data={data} />
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
export function OverviewTab({ stats }) {
  const t = stats.total;
  return (
    <Grid>
      <ChartCard title="Tranches d'âge (Q1)" data={stats.profil?.Q1} total={t} color="var(--primary)" />
      <ChartCard title="Sexe (Q2)" data={stats.profil?.Q2} total={t} color="#a78bfa" />
      <ChartCard title="Zone de résidence (Q3)" data={stats.profil?.Q3} total={t} color="#6ee7f7" />
      <ChartCard title="Facilité à parler de SR (Q16)" data={stats.freins?.Q16} total={t} color="#fcd34d" />
      <ChartCard title="Utiliserait une app FAGARU (Q20)" data={stats.attentes?.Q20} total={t} color="var(--accent)" />
      <ChartCard title="Participer aux tests (Q40)" data={stats.engagement?.Q40} total={t} color="#f9a8d4" />
    </Grid>
  );
}

// ─── Profil (Section 1) ───────────────────────────────────────────────────────
export function ProfilTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Âge (Q1)" data={data?.Q1} total={total} color="var(--primary)" />
      <ChartCard title="Sexe (Q2)" data={data?.Q2} total={total} color="#a78bfa" />
      <ChartCard title="Zone géographique (Q3)" data={data?.Q3} total={total} color="#6ee7f7" />
      <ChartCard title="Situation actuelle (Q4)" data={data?.Q4} total={total} color="var(--accent)" />
      <ChartCard title="Avec qui vis-tu (Q5)" data={data?.Q5} total={total} color="#fcd34d" />
      <ChartCard title="Langues parlées (Q6)" data={data?.Q6} total={total} color="#f9a8d4" />
    </Grid>
  );
}

// ─── Connaissances (Section 2) ────────────────────────────────────────────────
export function ConnaissancesTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Éducation SR reçue (Q7)" data={data?.Q7} total={total} color="var(--primary)" />
      <ChartCard title="Âge première info SR (Q8)" data={data?.Q8} total={total} color="#6ee7f7" />
      <ScoreCard title="Niveau de connaissance SR (Q9)" data={data?.Q9} color="var(--primary)" />
      <ChartCard title="Sujets souhaités (Q10)" data={data?.Q10} total={total} color="#fcd34d" />
    </Grid>
  );
}

// ─── Sources (Section 3) ─────────────────────────────────────────────────────
export function SourcesTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Sources consultées (Q11)" data={data?.Q11} total={total} color="var(--primary)" />
      <ChartCard title="Contenus internet consultés (Q14)" data={data?.Q14} total={total} color="#6ee7f7" />
      <ChartCard title="Info fausse reçue (Q15)" data={data?.Q15} total={total} color="var(--accent)" />
    </Grid>
  );
}

// ─── Freins (Section 4) ──────────────────────────────────────────────────────
export function FreinsTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Facilité à parler de SR (Q16)" data={data?.Q16} total={total} color="var(--primary)" />
      <ChartCard title="Freins à poser des questions (Q17)" data={data?.Q17} total={total} color="var(--red)" />
      <ChartCard title="Sujets jamais abordés (Q18)" data={data?.Q18} total={total} color="#fcd34d" />
      <ChartCard title="Endroit adapté connu (Q19)" data={data?.Q19} total={total} color="#a78bfa" />
    </Grid>
  );
}

// ─── Attentes FAGARU (Section 5) ─────────────────────────────────────────────
export function AttentesTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Utiliserait une app/site (Q20)" data={data?.Q20} total={total} color="var(--primary)" />
      <ChartCard title="Format d'info préféré (Q21)" data={data?.Q21} total={total} color="#6ee7f7" />
      <ChartCard title="Langue préférée (Q22)" data={data?.Q22} total={total} color="#a78bfa" />
      <ChartCard title="Canal d'accès préféré (Q23)" data={data?.Q23} total={total} color="var(--accent)" />
      <ChartCard title="Fréquence d'utilisation (Q24)" data={data?.Q24} total={total} color="#fcd34d" />
    </Grid>
  );
}

// ─── Module anonyme (Section 6) ──────────────────────────────────────────────
export function ModuleAnonymeTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Utilité du module anonyme (Q25)" data={data?.Q25} total={total} color="var(--primary)" />
      <ChartCard title="Confiance envers le répondant (Q26)" data={data?.Q26} total={total} color="#6ee7f7" />
      <ChartCard title="Délai de réponse souhaité (Q27)" data={data?.Q27} total={total} color="#fcd34d" />
      <ChartCard title="Conditions acceptées (Q28)" data={data?.Q28} total={total} color="var(--accent)" />
    </Grid>
  );
}

// ─── Confiance (Section 7) ───────────────────────────────────────────────────
export function ConfianceTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Inquiétudes plateforme (Q29)" data={data?.Q29} total={total} color="var(--red)" />
      <ScoreCard title="Confiance plateforme officielle (Q30)" data={data?.Q30} color="#a78bfa" />
      <ChartCard title="Acteurs de promotion souhaités (Q31)" data={data?.Q31} total={total} color="var(--primary)" />
    </Grid>
  );
}

// ─── Numérique (Section 8) ───────────────────────────────────────────────────
export function NumeriqueTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Type de téléphone (Q32)" data={data?.Q32} total={total} color="var(--primary)" />
      <ChartCard title="Mode de connexion internet (Q33)" data={data?.Q33} total={total} color="#6ee7f7" />
      <ChartCard title="Temps sur téléphone (Q34)" data={data?.Q34} total={total} color="#fcd34d" />
      <ChartCard title="Réseaux sociaux (Q35)" data={data?.Q35} total={total} color="var(--accent)" />
    </Grid>
  );
}

// ─── Engagement (Section 10) ─────────────────────────────────────────────────
export function EngagementTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Participer aux tests FAGARU (Q40)" data={data?.Q40} total={total} color="var(--primary)" />
    </Grid>
  );
}