/**
 * ShadiSampannaLoader.jsx
 *
 * Premium, production-ready loading component for Shadi Sampanna.
 * Zero external dependencies — pure React + injected CSS keyframes.
 *
 * Props:
 *   logoSrc   {string}   Path/URL to the logo image (required)
 *   message   {string}   Loading message text       (default: "Loading")
 *   subtext   {string}   Optional sub-message       (default: "Shadi Sampanna")
 *   theme     {string}   "light" | "dark" | "auto"  (default: "auto")
 *   overlay   {boolean}  Full-screen overlay mode   (default: true)
 *   size      {string}   "sm" | "md" | "lg"         (default: "md")
 */

import { useEffect, useRef } from "react";

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const B = {
  crimson: "#8B0000",
  crimsonMid: "#B22222",
  crimsonLow: "#5C0000",
  gold: "#E8C870",
  goldLight: "#F5E6A0",
};

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes ss-spinCW   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
  @keyframes ss-spinCCW  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
  @keyframes ss-pulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.07);opacity:.9} }
  @keyframes ss-glow {
    0%,100%{ box-shadow:0 0 18px 4px rgba(139,0,0,.55),0 0 36px 8px rgba(232,200,112,.22),0 8px 32px rgba(0,0,0,.3); }
    50%    { box-shadow:0 0 30px 10px rgba(139,0,0,.75),0 0 60px 18px rgba(232,200,112,.38),0 8px 32px rgba(0,0,0,.3); }
  }
  @keyframes ss-orbit {
    from { transform: rotate(var(--ss-s,0deg)) translateX(var(--ss-r,80px)) rotate(calc(-1 * var(--ss-s,0deg))); }
    to   { transform: rotate(calc(var(--ss-s,0deg) + 360deg)) translateX(var(--ss-r,80px)) rotate(calc(-1 * (var(--ss-s,0deg) + 360deg))); }
  }
  @keyframes ss-dot-bounce { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }
  @keyframes ss-shimmer    { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes ss-fadein     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ss-cardin     { from{opacity:0;transform:translateY(24px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes ss-ring-pulse { 0%,100%{opacity:.3} 50%{opacity:.65} }

  .ss-overlay {
    position:fixed; inset:0; z-index:9999;
    display:flex; align-items:center; justify-content:center;
    animation: ss-fadein .35s ease both;
  }
  .ss-overlay-bg {
    position:absolute; inset:0;
    backdrop-filter:blur(7px); -webkit-backdrop-filter:blur(7px);
  }
  .ss-overlay-bg.lt { background:rgba(253,246,227,.78); }
  .ss-overlay-bg.dk { background:rgba(8,3,3,.82); }

  .ss-card {
    position:relative; z-index:1;
    display:flex; flex-direction:column; align-items:center;
    border-radius:28px;
    animation: ss-cardin .55s cubic-bezier(.22,.68,0,1.2) .08s both;
  }
  .ss-card.lt { background:rgba(255,255,255,.85); border:1px solid rgba(139,0,0,.11); box-shadow:0 24px 80px rgba(139,0,0,.13),0 2px 8px rgba(0,0,0,.07); }
  .ss-card.dk { background:rgba(16,5,5,.90); border:1px solid rgba(232,200,112,.11); box-shadow:0 24px 80px rgba(0,0,0,.65),0 2px 8px rgba(139,0,0,.18); }
  .ss-card.sm { width:230px; padding:34px 28px; gap:22px; }
  .ss-card.md { width:300px; padding:46px 38px; gap:30px; }
  .ss-card.lg { width:380px; padding:58px 50px; gap:38px; }

  .ss-rig {
    position:relative; display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .ss-rig.sm { width:124px; height:124px; }
  .ss-rig.md { width:172px; height:172px; }
  .ss-rig.lg { width:222px; height:222px; }

  .ss-rings { position:absolute; inset:0; width:100%; height:100%; overflow:visible; }

  .ss-logo-wrap {
    position:relative; z-index:5; border-radius:50%; overflow:hidden; flex-shrink:0;
    animation: ss-pulse 3s ease-in-out infinite, ss-glow 3s ease-in-out infinite;
  }
  .ss-logo-wrap.sm { width:64px;  height:64px;  }
  .ss-logo-wrap.md { width:90px;  height:90px;  }
  .ss-logo-wrap.lg { width:114px; height:114px; }
  .ss-logo { width:100%; height:100%; object-fit:cover; display:block; border-radius:50%; }

  .ss-orbit-dot {
    position:absolute; top:50%; left:50%; border-radius:50%;
    transform-origin:0 0;
    animation: ss-orbit var(--ss-dur,4s) linear infinite;
  }

  .ss-text-area {
    display:flex; flex-direction:column; align-items:center; gap:7px;
    animation: ss-fadein .6s ease .4s both;
  }
  .ss-msg {
    margin:0; font-family:Georgia,'Times New Roman',serif;
    letter-spacing:.08em; font-weight:400; line-height:1.3;
  }
  .ss-msg.lt { color:#4a0000; }
  .ss-msg.dk { color:#F5E6A0; }
  .ss-msg.sm { font-size:13px; }
  .ss-msg.md { font-size:15px; }
  .ss-msg.lg { font-size:17px; }

  .ss-sub {
    margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    font-weight:400; letter-spacing:.04em;
  }
  .ss-sub.lt { color:rgba(92,0,0,.52); }
  .ss-sub.dk { color:rgba(245,230,160,.48); }
  .ss-sub.sm { font-size:11px; }
  .ss-sub.md { font-size:12px; }
  .ss-sub.lg { font-size:13px; }

  .ss-dots { display:inline-flex; align-items:center; gap:4px; margin-left:4px; vertical-align:middle; }
  .ss-dot  { display:inline-block; border-radius:50%; animation:ss-dot-bounce 1.4s ease-in-out infinite both; }
  .ss-dot.lt { background:#8B0000; }
  .ss-dot.dk { background:#E8C870; }
  .ss-dot.sm { width:4px; height:4px; }
  .ss-dot.md { width:5px; height:5px; }
  .ss-dot.lg { width:6px; height:6px; }

  .ss-track { width:100%; border-radius:99px; overflow:hidden; flex-shrink:0; }
  .ss-track.lt { background:rgba(139,0,0,.10); }
  .ss-track.dk { background:rgba(232,200,112,.10); }
  .ss-track.sm { height:2px; }
  .ss-track.md { height:2.5px; }
  .ss-track.lg { height:3px; }

  .ss-bar { height:100%; border-radius:99px; background-size:400px 100%; animation:ss-shimmer 1.8s linear infinite; }
  .ss-bar.lt { background-image:linear-gradient(90deg,rgba(139,0,0,0) 0%,rgba(139,0,0,.6) 40%,rgba(232,200,112,.85) 55%,rgba(139,0,0,.6) 70%,rgba(139,0,0,0) 100%); }
  .ss-bar.dk { background-image:linear-gradient(90deg,rgba(232,200,112,0) 0%,rgba(232,200,112,.6) 40%,rgba(245,230,160,.95) 55%,rgba(232,200,112,.6) 70%,rgba(232,200,112,0) 100%); }

  .ss-inline { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:28px; padding:48px 20px; animation:ss-fadein .4s ease both; }

  @media(max-width:480px){
    .ss-card.lg{width:300px;padding:44px 32px;}
    .ss-card.md{width:260px;padding:36px 28px;}
    .ss-rig.lg{width:172px;height:172px;}
    .ss-logo-wrap.lg{width:90px;height:90px;}
  }
`;

/* ─── Ring SVG ───────────────────────────────────────────────────────────── */
function RingSet({ sz, tk }) {
  const dim = { sm: 124, md: 172, lg: 222 }[sz];
  const cx = dim / 2;
  const R1 = cx * 0.76;
  const R2 = cx * 0.6;
  const R3 = cx * 0.47;
  const C1 = 2 * Math.PI * R1;
  const C2 = 2 * Math.PI * R2;
  const sc = tk === "dk" ? B.gold : B.crimson;
  const ac = tk === "dk" ? B.goldLight : B.crimsonMid;
  const sw = sz === "lg" ? 1.8 : sz === "md" ? 1.6 : 1.3;

  return (
    <svg
      className="ss-rings"
      viewBox={`0 0 ${dim} ${dim}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Static guide rings */}
      <circle
        cx={cx}
        cy={cx}
        r={R1}
        stroke={sc}
        strokeWidth=".55"
        opacity=".16"
      />
      <circle
        cx={cx}
        cy={cx}
        r={R3}
        stroke={sc}
        strokeWidth=".45"
        opacity=".14"
        style={{ animation: "ss-ring-pulse 2.4s ease-in-out infinite" }}
      />

      {/* Dashed middle ring — slow spin */}
      <circle
        cx={cx}
        cy={cx}
        r={R2}
        stroke={sc}
        strokeWidth=".5"
        strokeDasharray="3 7"
        opacity=".22"
        style={{
          transformOrigin: `${cx}px ${cx}px`,
          animation: "ss-spinCW 22s linear infinite",
        }}
      />

      {/* Outer arc CW */}
      <circle
        cx={cx}
        cy={cx}
        r={R1}
        stroke={ac}
        strokeWidth={sw}
        strokeDasharray={`${C1 * 0.28} ${C1 * 0.72}`}
        strokeLinecap="round"
        opacity=".88"
        style={{
          transformOrigin: `${cx}px ${cx}px`,
          animation: "ss-spinCW 3.2s linear infinite",
        }}
      />

      {/* Outer arc CCW (smaller, offset) */}
      <circle
        cx={cx}
        cy={cx}
        r={R1}
        stroke={sc}
        strokeWidth={sw * 0.7}
        strokeDasharray={`${C1 * 0.11} ${C1 * 0.89}`}
        strokeLinecap="round"
        opacity=".5"
        style={{
          transformOrigin: `${cx}px ${cx}px`,
          animation: "ss-spinCCW 5.5s linear infinite",
        }}
      />

      {/* Inner arc CCW */}
      <circle
        cx={cx}
        cy={cx}
        r={R2}
        stroke={ac}
        strokeWidth={sw * 0.85}
        strokeDasharray={`${C2 * 0.22} ${C2 * 0.78}`}
        strokeLinecap="round"
        opacity=".72"
        style={{
          transformOrigin: `${cx}px ${cx}px`,
          animation: "ss-spinCCW 2.5s linear infinite",
        }}
      />

      {/* Tick marks on outer ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const isMaj = i % 3 === 0;
        const x1 = cx + (R1 - (isMaj ? 5 : 3)) * Math.cos(a);
        const y1 = cx + (R1 - (isMaj ? 5 : 3)) * Math.sin(a);
        const x2 = cx + (R1 + (isMaj ? 5 : 3)) * Math.cos(a);
        const y2 = cx + (R1 + (isMaj ? 5 : 3)) * Math.sin(a);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={sc}
            strokeWidth={isMaj ? "1.1" : ".55"}
            opacity={isMaj ? ".42" : ".18"}
          />
        );
      })}
    </svg>
  );
}

/* ─── Orbit dot ──────────────────────────────────────────────────────────── */
function OrbitDot({ radius, start, dur, ds, color, delay }) {
  return (
    <span
      className="ss-orbit-dot"
      style={{
        "--ss-r": `${radius}px`,
        "--ss-s": `${start}deg`,
        "--ss-dur": `${dur}s`,
        width: ds,
        height: ds,
        marginTop: -(ds / 2),
        marginLeft: -(ds / 2),
        background: color,
        animationDelay: `${delay}s`,
        boxShadow: `0 0 7px 2px ${color}88`,
      }}
    />
  );
}

/* ─── Loading dots ───────────────────────────────────────────────────────── */
function Dots({ tk, sz }) {
  return (
    <span className="ss-dots" aria-hidden="true">
      {["0s", "0.18s", "0.36s"].map((d, i) => (
        <span
          key={i}
          className={`ss-dot ${tk} ${sz}`}
          style={{ animationDelay: d }}
        />
      ))}
    </span>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function ShadiSampannaLoader({
  logoSrc,
  message = "Loading",
  subtext = "Shadi Sampanna",
  theme = "auto",
  overlay = true,
  size = "md",
}) {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    const el = document.createElement("style");
    el.id = "ss-loader-css";
    el.textContent = STYLES;
    document.head.appendChild(el);
    injected.current = true;
  }, []);

  const tk =
    theme === "auto"
      ? typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dk"
        : "lt"
      : theme === "dark"
        ? "dk"
        : "lt";

  const dim = { sm: 124, md: 172, lg: 222 }[size];
  const cx = dim / 2;

  const orbitDots = [
    {
      radius: cx * 0.76,
      start: 0,
      dur: 4.0,
      ds: size === "lg" ? 8 : 6,
      color: B.gold,
      delay: 0,
    },
    {
      radius: cx * 0.76,
      start: 180,
      dur: 4.0,
      ds: size === "lg" ? 7 : 5,
      color: B.crimson,
      delay: 0,
    },
    {
      radius: cx * 0.6,
      start: 90,
      dur: 2.8,
      ds: size === "lg" ? 7 : 5,
      color: B.goldLight,
      delay: 0.4,
    },
    {
      radius: cx * 0.6,
      start: 270,
      dur: 2.8,
      ds: size === "lg" ? 5 : 4,
      color: B.crimsonMid,
      delay: 0.4,
    },
  ];

  const body = (
    <>
      {/* Animated rig */}
      <div className={`ss-rig ${size}`}>
        <RingSet sz={size} tk={tk} />
        {orbitDots.map((o, i) => (
          <OrbitDot key={i} {...o} />
        ))}
        <div className={`ss-logo-wrap ${size}`}>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Shadi Sampanna"
              className="ss-logo"
              draggable={false}
            />
          ) : (
            <div
              className="ss-logo"
              style={{
                background: B.crimson,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Georgia,serif",
                fontSize: size === "lg" ? 36 : size === "md" ? 28 : 22,
                fontWeight: 700,
                color: B.goldLight,
              }}
            >
              S
            </div>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="ss-text-area">
        <p className={`ss-msg ${tk} ${size}`}>
          {message}
          <Dots tk={tk} sz={size} />
        </p>
        {subtext && <p className={`ss-sub ${tk} ${size}`}>{subtext}</p>}
      </div>

      {/* Shimmer bar */}
      <div className={`ss-track ${tk} ${size}`}>
        <div className={`ss-bar ${tk}`} />
      </div>
    </>
  );

  if (!overlay)
    return (
      <div
        className="ss-inline"
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        {body}
      </div>
    );

  return (
    <div
      className="ss-overlay"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className={`ss-overlay-bg ${tk}`} />
      <div className={`ss-card ${tk} ${size}`}>{body}</div>
    </div>
  );
}
