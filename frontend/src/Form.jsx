import { useState, useRef } from "react";
import QUESTIONS from "./questions.json";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Form({ onDone }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const startTime = useRef(Date.now());
  const topRef = useRef(null);

  const totalSections = QUESTIONS.length;
  const section = QUESTIONS[currentSection];

  const set = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setErrors(prev => { const e = { ...prev }; delete e[id]; return e; });
  };

  const toggleCheckbox = (id, option) => {
    const prev = answers[id] || [];
    const next = prev.includes(option) ? prev.filter(x => x !== option) : [...prev, option];
    set(id, next);
  };

  const validateSection = () => {
    const errs = {};
    section.questions.forEach(q => {
      if (q.required) {
        const val = answers[q.id];
        if (q.type === "checkbox") {
          if (!val || val.length === 0) errs[q.id] = "Veuillez sélectionner au moins une option.";
        } else if (q.type === "scale") {
          if (!val) errs[q.id] = "Veuillez donner une note.";
        } else {
          if (!val || val === "") errs[q.id] = "Ce champ est obligatoire.";
        }
      }
    });
    return errs;
  };

  const next = () => {
    const errs = validateSection();
    if (Object.keys(errs).length > 0) { setErrors(errs); topRef.current?.scrollIntoView({ behavior: "smooth" }); return; }
    if (currentSection < totalSections - 1) {
      setCurrentSection(s => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prev = () => {
    if (currentSection > 0) { setCurrentSection(s => s - 1); topRef.current?.scrollIntoView({ behavior: "smooth" }); }
  };

  const submit = async () => {
    const errs = validateSection();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const payload = { ...answers, _duration: Math.round((Date.now() - startTime.current) / 1000) };
      const res = await fetch(`${API}/api/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erreur serveur");
      onDone();
    } catch (e) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((currentSection) / totalSections) * 100;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 80px" }} ref={topRef}>
      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Section {currentSection + 1} / {totalSections}</span>
          <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 600 }}>{Math.round(progress)}% complété</span>
        </div>
        <div style={{ height: 4, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--primary), #00e6a8)", borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
        {/* Section pills */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {QUESTIONS.map((s, i) => (
            <div key={i} style={{
              height: 6, flex: 1, minWidth: 20, borderRadius: 3,
              background: i < currentSection ? "var(--primary)" : i === currentSection ? "rgba(0,200,150,0.5)" : "var(--border)",
              transition: "background 0.3s"
            }} />
          ))}
        </div>
      </div>

      {/* Section card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow)" }}>
        {/* Section header */}
        <div style={{
          padding: "20px 28px",
          background: "linear-gradient(135deg, rgba(0,200,150,0.08), rgba(0,200,150,0.02))",
          borderBottom: "1px solid var(--border)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--primary-dim)",
              color: "var(--primary)", fontWeight: 700, fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0
            }}>{currentSection + 1}</span>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>{section.section}</h2>
          </div>
          {section.sectionNote && (
            <p style={{ marginTop: 10, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5, padding: "10px 12px", background: "rgba(0,200,150,0.06)", borderRadius: 8, borderLeft: "3px solid var(--primary)" }}>
              ℹ️ {section.sectionNote}
            </p>
          )}
        </div>

        {/* Questions */}
        <div style={{ padding: "28px" }}>
          {section.questions.map((q, qi) => (
            <QuestionField
              key={q.id}
              q={q}
              answers={answers}
              errors={errors}
              set={set}
              toggle={toggleCheckbox}
              isLast={qi === section.questions.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
        <button onClick={prev} disabled={currentSection === 0} style={{
          padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border)",
          background: "transparent", color: currentSection === 0 ? "var(--text-muted)" : "var(--text)",
          cursor: currentSection === 0 ? "not-allowed" : "pointer",
          fontFamily: "inherit", fontSize: 14, fontWeight: 500, transition: "all 0.2s"
        }}>← Précédent</button>

        {currentSection < totalSections - 1 ? (
          <button onClick={next} style={{
            padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "var(--primary)", color: "#000", fontFamily: "inherit",
            fontSize: 14, fontWeight: 700, transition: "all 0.2s",
            boxShadow: "0 4px 16px rgba(0,200,150,0.3)"
          }}>Suivant →</button>
        ) : (
          <button onClick={submit} disabled={submitting} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
            background: submitting ? "var(--border)" : "linear-gradient(135deg, var(--primary), #00a876)",
            color: submitting ? "var(--text-muted)" : "#000", fontFamily: "inherit",
            fontSize: 14, fontWeight: 700, transition: "all 0.2s",
            boxShadow: submitting ? "none" : "0 4px 20px rgba(0,200,150,0.4)"
          }}>{submitting ? "Envoi en cours…" : "✓ Soumettre mes réponses"}</button>
        )}
      </div>
    </div>
  );
}

function QuestionField({ q, answers, errors, set, toggle, isLast }) {
  const val = answers[q.id];
  const err = errors[q.id];

  return (
    <div style={{ marginBottom: isLast ? 0 : 32, paddingBottom: isLast ? 0 : 32, borderBottom: isLast ? "none" : "1px solid var(--border)" }}>
      <label style={{ display: "block", marginBottom: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
          {q.label}
          {q.required && <span style={{ color: "var(--accent)", marginLeft: 4 }}>*</span>}
          {!q.required && <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 6, fontWeight: 400 }}>(facultatif)</span>}
        </span>
      </label>

      {q.type === "radio" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map(opt => (
            <RadioOption key={opt} label={opt} checked={val === opt} onChange={() => set(q.id, opt)} />
          ))}
        </div>
      )}

      {q.type === "checkbox" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map(opt => (
            <CheckboxOption key={opt} label={opt} checked={(val || []).includes(opt)} onChange={() => toggle(q.id, opt)} />
          ))}
        </div>
      )}

      {q.type === "scale" && (
        <ScaleInput value={val} min={q.min} max={q.max} onChange={v => set(q.id, v)} />
      )}

      {q.type === "text" && (
        <input
          value={val || ""}
          onChange={e => set(q.id, e.target.value)}
          style={inputStyle(err)}
          placeholder="Votre réponse..."
        />
      )}

      {q.type === "textarea" && (
        <textarea
          value={val || ""}
          onChange={e => set(q.id, e.target.value)}
          rows={4}
          style={{ ...inputStyle(err), resize: "vertical", lineHeight: 1.6 }}
          placeholder="Votre réponse..."
        />
      )}

      {err && <p style={{ marginTop: 6, fontSize: 12, color: "var(--red)" }}>⚠ {err}</p>}

      {/* Extra text field */}
      {q.extra && (
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{q.extra.label}</label>
          <input
            value={answers[q.extra.id] || ""}
            onChange={e => set(q.extra.id, e.target.value)}
            style={inputStyle()}
            placeholder="Précisez..."
          />
        </div>
      )}

      {/* Conditional fields (Q44) */}
      {q.conditionals && q.conditionals.map(cond => (
        val === cond.condition && cond.fields.map(f => (
          <div key={f.id} style={{ marginTop: 12 }}>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{f.label}</label>
            <input
              value={answers[f.id] || ""}
              onChange={e => set(f.id, e.target.value)}
              style={inputStyle()}
              placeholder="..."
            />
          </div>
        ))
      ))}
    </div>
  );
}

function RadioOption({ label, checked, onChange }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
      borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
      background: checked ? "var(--primary-dim)" : "var(--surface2)",
      border: `1px solid ${checked ? "var(--primary)" : "var(--border)"}`,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${checked ? "var(--primary)" : "var(--border)"}`,
        background: checked ? "var(--primary)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s"
      }}>
        {checked && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#000" }} />}
      </div>
      <input type="radio" checked={checked} onChange={onChange} style={{ display: "none" }} />
      <span style={{ fontSize: 13, color: checked ? "var(--text)" : "var(--text-dim)", fontWeight: checked ? 500 : 400 }}>{label}</span>
    </label>
  );
}

function CheckboxOption({ label, checked, onChange }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
      borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
      background: checked ? "var(--primary-dim)" : "var(--surface2)",
      border: `1px solid ${checked ? "var(--primary)" : "var(--border)"}`,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
        border: `2px solid ${checked ? "var(--primary)" : "var(--border)"}`,
        background: checked ? "var(--primary)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s"
      }}>
        {checked && <span style={{ fontSize: 11, color: "#000", fontWeight: 700 }}>✓</span>}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: "none" }} />
      <span style={{ fontSize: 13, color: checked ? "var(--text)" : "var(--text-dim)", fontWeight: checked ? 500 : 400 }}>{label}</span>
    </label>
  );
}

function ScaleInput({ value, min, max, onChange }) {
  const labels = { [min]: "Très faible", [max]: "Très élevée" };
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => (
          <button key={n} onClick={() => onChange(n)} style={{
            flex: 1, padding: "12px 0", borderRadius: 8, border: `2px solid ${value === n ? "var(--primary)" : "var(--border)"}`,
            background: value === n ? "var(--primary)" : "var(--surface2)",
            color: value === n ? "#000" : "var(--text-dim)",
            cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700,
            transition: "all 0.15s"
          }}>{n}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>1 – {labels[min]}</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>5 – {labels[max]}</span>
      </div>
    </div>
  );
}

function inputStyle(err) {
  return {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: `1px solid ${err ? "var(--red)" : "var(--border)"}`,
    background: "var(--surface2)", color: "var(--text)",
    fontFamily: "inherit", fontSize: 13, outline: "none",
    transition: "border-color 0.2s"
  };
}
