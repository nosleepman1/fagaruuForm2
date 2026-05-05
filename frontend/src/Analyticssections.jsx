import { ChartCard, ScoreCard, KPICard, Timeline, card, cardTitle } from "./ui.jsx";

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
  const { total, teleconsultation, confiance, engagement } = stats;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
      <KPICard label="Réponses totales" value={total} color="var(--primary)" />
      <KPICard
        label="Confiance diagnostic"
        value={teleconsultation?.Q22 ? `${teleconsultation.Q22.avg?.toFixed(1)} / 5` : "—"}
        sub="Téléconsultation (Q22)"
        color="#6ee7f7"
      />
      <KPICard
        label="Confiance données"
        value={confiance?.Q39 ? `${confiance.Q39.avg?.toFixed(1)} / 5` : "—"}
        sub="Sécurité (Q39)"
        color="#a78bfa"
      />
      <KPICard
        label="Inscription pilote"
        value={pct(engagement?.Q44, "Oui", total)}
        sub="Phase pilote Dakar"
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
      <ChartCard title="Tranches d'âge" data={stats.profil?.Q1} total={t} color="var(--primary)" />
      <ChartCard title="Sexe" data={stats.profil?.Q2} total={t} color="#a78bfa" />
      <ChartCard title="Zone de résidence" data={stats.profil?.Q3} total={t} color="#6ee7f7" />
      <ChartCard title="Accès internet" data={stats.numerique?.Q14} total={t} color="#fcd34d" />
      <ChartCard title="Ouverture téléconsultation" data={stats.teleconsultation?.Q18} total={t} color="var(--accent)" />
      <ChartCard title="Couverture assurance" data={stats.acces?.Q12} total={t} color="#f9a8d4" />
    </Grid>
  );
}

// ─── Profil ───────────────────────────────────────────────────────────────────
export function ProfilTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Âge" data={data?.Q1} total={total} color="var(--primary)" />
      <ChartCard title="Sexe" data={data?.Q2} total={total} color="#a78bfa" />
      <ChartCard title="Zone géographique" data={data?.Q3} total={total} color="#6ee7f7" />
      <ChartCard title="Situation professionnelle" data={data?.Q4} total={total} color="var(--accent)" />
      <ChartCard title="Niveau d'études" data={data?.Q5} total={total} color="#fcd34d" />
      <ChartCard title="Langues parlées" data={data?.Q6} total={total} color="#f9a8d4" />
    </Grid>
  );
}

// ─── Accès soins ──────────────────────────────────────────────────────────────
export function AccesTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Fréquence de consultation" data={data?.Q7} total={total} color="var(--primary)" />
      <ChartCard title="Distance structure de santé" data={data?.Q8} total={total} color="#6ee7f7" />
      <ChartCard title="Temps d'attente moyen" data={data?.Q9} total={total} color="#fcd34d" />
      <ChartCard title="Freins à la consultation" data={data?.Q10} total={total} color="var(--red)" />
      <ChartCard title="Coût d'une consultation" data={data?.Q11} total={total} color="var(--accent)" />
      <ChartCard title="Couverture assurance / mutuelle" data={data?.Q12} total={total} color="#a78bfa" />
    </Grid>
  );
}

// ─── Numérique ────────────────────────────────────────────────────────────────
export function NumeriqueTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Type de téléphone" data={data?.Q13} total={total} color="var(--primary)" />
      <ChartCard title="Accès internet" data={data?.Q14} total={total} color="#6ee7f7" />
      <ChartCard title="Services de paiement mobile utilisés" data={data?.Q15} total={total} color="#fcd34d" />
      <ChartCard title="Fréquence d'utilisation des apps" data={data?.Q16} total={total} color="var(--accent)" />
      <ChartCard title="Application de santé déjà utilisée" data={data?.Q17} total={total} color="#a78bfa" />
    </Grid>
  );
}

// ─── Téléconsultation ─────────────────────────────────────────────────────────
export function TeleconsultTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Disposition à la téléconsultation" data={data?.Q18} total={total} color="var(--primary)" />
      <ChartCard title="Motifs acceptés" data={data?.Q19} total={total} color="#6ee7f7" />
      <ChartCard title="Mode de consultation préféré" data={data?.Q20} total={total} color="#fcd34d" />
      <ChartCard title="Prix acceptable" data={data?.Q21} total={total} color="var(--accent)" />
      <ScoreCard title="Confiance envers le diagnostic à distance" data={data?.Q22} color="var(--primary)" />
    </Grid>
  );
}

// ─── Dossier médical ─────────────────────────────────────────────────────────
export function DossierTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Conservation actuelle des documents" data={data?.Q23} total={total} color="var(--primary)" />
      <ChartCard title="Intérêt pour le dossier numérique" data={data?.Q24} total={total} color="#6ee7f7" />
      <ChartCard title="Partage avec un professionnel de santé" data={data?.Q25} total={total} color="#fcd34d" />
    </Grid>
  );
}

// ─── Paiement ─────────────────────────────────────────────────────────────────
export function PaiementTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Aisance avec le paiement mobile" data={data?.Q26} total={total} color="var(--primary)" />
      <ChartCard title="Mode de paiement préféré" data={data?.Q27} total={total} color="#6ee7f7" />
      <ChartCard title="Paiement médicaments via l'app" data={data?.Q28} total={total} color="#fcd34d" />
    </Grid>
  );
}

// ─── Don de sang ─────────────────────────────────────────────────────────────
export function SangTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Groupe sanguin connu" data={data?.Q29} total={total} color="var(--red)" />
      <ChartCard title="Historique de don" data={data?.Q30} total={total} color="var(--accent)" />
      <ChartCard title="Raisons de non-don" data={data?.Q31} total={total} color="#fcd34d" />
      <ChartCard title="Urgence de besoin de sang vécue" data={data?.Q32} total={total} color="#a78bfa" />
      <ChartCard title="Acceptation de notifications urgentes" data={data?.Q33} total={total} color="var(--primary)" />
      <ChartCard title="Avis sur le système d'anonymisation" data={data?.Q34} total={total} color="#6ee7f7" />
    </Grid>
  );
}

// ─── Assistant ────────────────────────────────────────────────────────────────
export function AssistantTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Langue d'interaction préférée" data={data?.Q35} total={total} color="var(--primary)" />
      <ChartCard title="Aisance avec l'assistant automatique" data={data?.Q36} total={total} color="#6ee7f7" />
      <ChartCard title="Usages envisagés pour l'assistant" data={data?.Q37} total={total} color="#fcd34d" />
    </Grid>
  );
}

// ─── Confiance ────────────────────────────────────────────────────────────────
export function ConfianceTab({ data, total }) {
  return (
    <Grid>
      <ChartCard title="Préoccupations principales" data={data?.Q38} total={total} color="var(--red)" />
      <ScoreCard title="Confiance dans la sécurité des données" data={data?.Q39} color="#a78bfa" />
      <ChartCard title="Garant de la sécurité des données" data={data?.Q40} total={total} color="var(--primary)" />
    </Grid>
  );
}