import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 1900);
    const t3 = setTimeout(() => onFinish(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const opacity = phase === "in" ? 0 : phase === "hold" ? 1 : 0;
  const transition = phase === "in"
    ? "opacity 0.6s ease-out"
    : phase === "out"
    ? "opacity 0.65s ease-in"
    : "opacity 0.6s ease-out";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "hsl(156 51% 10%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity,
        transition,
        gap: "0px",
      }}
    >
      <svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "20px", filter: "drop-shadow(0 0 18px rgba(212,175,55,0.45))" }}
      >
        <circle cx="50" cy="55" r="38" fill="hsl(45 70% 52%)" />
        <circle cx="66" cy="45" r="31" fill="hsl(156 51% 10%)" />
        <polygon
          points="88,18 90.5,25.5 98.5,25.5 92,30 94.5,37.5 88,33 81.5,37.5 84,30 77.5,25.5 85.5,25.5"
          fill="hsl(45 70% 52%)"
        />
      </svg>

      <p
        style={{
          fontFamily: "'Amiri', serif",
          fontSize: "68px",
          color: "hsl(45 70% 52%)",
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "0.02em",
          textShadow: "0 0 24px rgba(212,175,55,0.35)",
        }}
        dir="rtl"
        lang="ar"
      >
        نُور
      </p>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "18px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          margin: "8px 0 0 0",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        Noor
      </p>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.28)",
          margin: "6px 0 0 0",
          letterSpacing: "0.15em",
        }}
      >
        Your Islamic Companion
      </p>
    </div>
  );
}
