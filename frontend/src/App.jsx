import { useState } from "react";
import Form from "./Form";
import Stats from "./Stats";

export default function App() {
  const [view, setView] = useState("form"); // "form" | "stats" | "thanks"

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');
        :root {
          --bg: #0a0e1a;
          --surface: #111827;
          --surface2: #1a2235;
          --border: #1e2d45;
          --primary: #00c896;
          --primary-dim: rgba(0,200,150,0.12);
          --accent: #ff6b35;
          --accent-dim: rgba(255,107,53,0.12);
          --text: #e8edf5;
          --text-muted: #6b7c9a;
          --text-dim: #8fa0bc;
          --red: #ff4d6d;
          --radius: 12px;
          --shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); }
        ::selection { background: var(--primary); color: #000; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>

      {/* Header */}
      <header style={{
        background: "rgba(17,24,39,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 24px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--primary), #00a876)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "#000"
            }}>F</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.5px" }}>FAGARUU</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: -2 }}>Plateforme de Santé Digitale</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: 4 }}>
            {[
              { id: "form", label: "📋 Questionnaire" },
              { id: "stats", label: "📊 Statistiques" }
            ].map(tab => (
              <button key={tab.id} onClick={() => setView(tab.id)} style={{
                padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                background: view === tab.id ? "var(--primary-dim)" : "transparent",
                color: view === tab.id ? "var(--primary)" : "var(--text-muted)",
                borderBottom: view === tab.id ? "2px solid var(--primary)" : "2px solid transparent"
              }}>{tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      {view === "form" && <Form onDone={() => setView("thanks")} />}
      {view === "stats" && <Stats />}
      {view === "thanks" && <Thanks onBack={() => setView("form")} onStats={() => setView("stats")} />}
    </div>
  );
}

function Thanks({ onBack, onStats }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--primary)" }}>Merci pour votre participation !</h1>
      <p style={{ color: "var(--text-dim)", maxWidth: 480, lineHeight: 1.6, marginBottom: 32 }}>
        Vos réponses contribuent directement à construire une solution de santé adaptée aux besoins réels du Sénégal.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack} style={btnStyle("secondary")}>Soumettre une autre réponse</button>
        <button onClick={onStats} style={btnStyle("primary")}>Voir les statistiques →</button>
      </div>
      <p style={{ marginTop: 24, fontSize: 13, color: "var(--text-muted)" }}>FAGARUU · Groupe AMBO TECH · Keur Massar, Dakar</p>
    </div>
  );
}

function btnStyle(variant) {
  return {
    padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer",
    fontFamily: "inherit", fontSize: 14, fontWeight: 600, transition: "all 0.2s",
    background: variant === "primary" ? "var(--primary)" : "var(--surface2)",
    color: variant === "primary" ? "#000" : "var(--text)",
  };
}
