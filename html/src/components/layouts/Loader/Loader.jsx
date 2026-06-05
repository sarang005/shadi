/**
 * App.example.jsx
 *
 * Demonstrates every usage pattern for ShadiSampannaLoader.
 * Replace logoSrc with the actual path to your uploaded logo.
 *
 * Install nothing extra — zero external dependencies.
 */

import { useState } from "react";
import ShadiSampannaLoader from "./ShadiSampannaLoader";

/* ── Drop your logo image here ─────────────────────────────────────────── */
import logoSrc from "./assets/shasi_sampanna.png";
/* ── Or use a public-folder path: const logoSrc = "/shasi_sampanna.png"; ─ */

/* ─── Demo controls styling ─────────────────────────────────────────────── */
const demoStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#fff9f0 0%,#fdf0f0 100%)",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 32,
  padding: 40,
};
const btnStyle = (active) => ({
  padding: "10px 22px",
  borderRadius: 10,
  border: `1.5px solid ${active ? "#8B0000" : "#ddd"}`,
  background: active ? "#8B0000" : "#fff",
  color: active ? "#F5E6A0" : "#444",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: 14,
  transition: "all .2s",
});
const row = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  justifyContent: "center",
};

/* ─── Demo app ───────────────────────────────────────────────────────────── */
export default function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [theme, setTheme] = useState("auto");
  const [size, setSize] = useState("md");
  const [message, setMessage] = useState("Loading");

  const messages = [
    "Loading",
    "Please wait",
    "Setting things up",
    "Almost there",
  ];

  return (
    <div style={demoStyle}>
      {/* Full-screen overlay loader (triggered by button) */}
      {showOverlay && (
        <ShadiSampannaLoader
          logoSrc={logoSrc}
          message={message}
          subtext="Shadi Sampanna"
          theme={theme}
          overlay={true}
          size={size}
        />
      )}

      <h1
        style={{
          margin: 0,
          fontSize: 22,
          color: "#4a0000",
          fontFamily: "Georgia,serif",
        }}
      >
        ShadiSampannaLoader — Demo
      </h1>

      {/* ── Inline loader (always visible) ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid rgba(139,0,0,.1)",
          boxShadow: "0 4px 24px rgba(139,0,0,.08)",
          overflow: "hidden",
          width: "100%",
          maxWidth: 420,
        }}
      >
        <ShadiSampannaLoader
          logoSrc={logoSrc}
          message={message}
          subtext="Shadi Sampanna"
          theme="light"
          overlay={false}
          size={size}
        />
      </div>

      {/* ── Controls ── */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={row}>
          <strong
            style={{ color: "#8B0000", alignSelf: "center", minWidth: 60 }}
          >
            Size
          </strong>
          {["sm", "md", "lg"].map((s) => (
            <button
              key={s}
              style={btnStyle(size === s)}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={row}>
          <strong
            style={{ color: "#8B0000", alignSelf: "center", minWidth: 60 }}
          >
            Theme
          </strong>
          {["auto", "light", "dark"].map((t) => (
            <button
              key={t}
              style={btnStyle(theme === t)}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={row}>
          <strong
            style={{ color: "#8B0000", alignSelf: "center", minWidth: 60 }}
          >
            Text
          </strong>
          {messages.map((m) => (
            <button
              key={m}
              style={btnStyle(message === m)}
              onClick={() => setMessage(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          style={{
            ...btnStyle(false),
            background: "#8B0000",
            color: "#F5E6A0",
            border: "none",
            marginTop: 8,
            fontSize: 15,
            padding: "12px 32px",
          }}
          onClick={() => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
          }}
        >
          Preview full-screen overlay (3 s)
        </button>
      </section>

      {/* ── Usage snippets ── */}
      <pre
        style={{
          background: "#1a0505",
          color: "#F5E6A0",
          borderRadius: 14,
          padding: "24px 28px",
          fontSize: 13,
          lineHeight: 1.7,
          maxWidth: 520,
          width: "100%",
          overflowX: "auto",
          boxShadow: "0 8px 32px rgba(0,0,0,.25)",
        }}
      >
        {`// Full-screen overlay (e.g. route transition)
<ShadiSampannaLoader
  logoSrc={logo}
  message="Loading"
  theme="auto"       // "light" | "dark" | "auto"
  size="md"          // "sm"   | "md"   | "lg"
  overlay={true}     // covers entire screen
/>

// Inline (embedded inside a card / section)
<ShadiSampannaLoader
  logoSrc={logo}
  message="Please wait"
  overlay={false}
  size="sm"
/>`}
      </pre>
    </div>
  );
}

/* ─── Example: async data-fetch usage ───────────────────────────────────── */
export function PageWithLoader() {
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    await fetch("/api/your-endpoint").then((r) => r.json());
    setLoading(false);
  }

  return (
    <>
      {loading && (
        <ShadiSampannaLoader
          logoSrc={logoSrc}
          message="Setting things up"
          subtext="Shadi Sampanna"
          theme="auto"
          size="md"
        />
      )}
      {!loading && <div>Your page content here</div>}
    </>
  );
}
