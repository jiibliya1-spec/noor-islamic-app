function QiblaCompass({ qiblaAngle, deviceHeading, isLive, t }: QiblaCompassProps) {
  const bearing = Math.round(((qiblaAngle % 360) + 360) % 360);
  const [showQr, setShowQr] = useState(false);
  const appUrl = typeof window !== "undefined" ? window.location.href : "";

  if (isLive) {
    // الزاوية التي يجب أن يدور بها السهم ليشير إلى الكعبة
    const needleAngle = deviceHeading !== null 
      ? (qiblaAngle - deviceHeading + 360) % 360 
      : qiblaAngle;
    
    const isAligned = needleAngle <= 5 || needleAngle >= 355;
    const alignedColor = "#22c55e";
    const needleColor = isAligned ? alignedColor : "hsl(var(--primary))";
    const ringStroke = isAligned ? "rgba(34,197,94,0.55)" : "rgba(255,255,255,0.10)";

    return (
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {t("liveCompass")}
        </div>

        <div className="relative w-64 h-64 select-none">
          <svg viewBox="0 0 240 240" className="w-full h-full" aria-label="Qibla live compass">
            <defs>
              <radialGradient id="dialBg" cx="40%" cy="30%">
                <stop offset="0%" stopColor="hsl(156,40%,14%)" />
                <stop offset="100%" stopColor="hsl(156,50%,7%)" />
              </radialGradient>
              <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="78%" stopColor="transparent" />
                <stop offset="100%" stopColor={isAligned ? "#22c55e" : "hsl(var(--primary))"} stopOpacity="0.20" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="120" r="118" fill="url(#outerGlow)" />
            <circle cx="120" cy="120" r="108" fill="url(#dialBg)"
              stroke={ringStroke} strokeWidth={isAligned ? 3 : 1.5}
              style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }} />
            {Array.from({ length: 72 }).map((_, i) => {
              const deg = i * 5;
              const isCardinal = deg % 90 === 0;
              const isMajor = deg % 30 === 0;
              const rad = (deg - 90) * (Math.PI / 180);
              const r1 = 100, r2 = isCardinal ? 78 : isMajor ? 86 : 93;
              return (
                <line key={i}
                  x1={120 + r1 * Math.cos(rad)} y1={120 + r1 * Math.sin(rad)}
                  x2={120 + r2 * Math.cos(rad)} y2={120 + r2 * Math.sin(rad)}
                  stroke={isCardinal ? "rgba(255,255,255,0.50)" : isMajor ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isCardinal ? 2 : isMajor ? 1.5 : 1}
                />
              );
            })}
            <text x="120" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize="16" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
            <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
            <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
            <text x="27" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.40)" fontSize="13" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
            
            {/* الكعبة ثابتة في الأعلى (عند N) */}
            <circle cx="120" cy="28" r="13" fill="hsl(var(--primary))" opacity="0.18" />
            <rect x="111" y="20" width="18" height="15" rx="2" fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1.6" />
            <rect x="111" y="26" width="18" height="4" fill="hsl(var(--primary))" opacity="0.75" />
            <path d={`M114,35 Q120,30 126,35 L126,36 L114,36 Z`} fill="hsl(var(--primary))" opacity="0.55" />
            
            {/* السهم المتحرك */}
            <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: "120px 120px", transition: "transform 0.10s linear" }}>
              <ellipse cx="120" cy="50" rx="5" ry="9" fill={needleColor} opacity="0.22"
                style={{ transition: "fill 0.4s ease" }} />
              <polygon points="120,28 127,82 113,82" fill={needleColor} opacity="0.95"
                style={{ transition: "fill 0.4s ease" }} />
              <polygon points="120,212 125,162 115,162" fill="rgba(255,255,255,0.15)" />
              <circle cx="120" cy="120" r="6" fill="hsl(var(--background))" stroke={needleColor} strokeWidth="2"
                style={{ transition: "stroke 0.4s ease" }} />
              <circle cx="120" cy="120" r="3" fill={needleColor}
                style={{ transition: "fill 0.4s ease" }} />
            </g>
          </svg>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold font-mono leading-none"
            style={{ color: isAligned ? "#22c55e" : "hsl(var(--primary))", transition: "color 0.4s ease" }}>
            {bearing}°
          </p>
          {isAligned ? (
            <p className="text-base font-bold mt-2 animate-pulse flex items-center justify-center gap-2" style={{ color: "#22c55e" }} dir="rtl">
              هذه هي القبلة
              <CheckCircle2 className="w-4 h-4 inline-block" />
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-2 max-w-[240px] leading-relaxed">{t("rotateToAlign")}</p>
          )}
        </div>
      </div>
    );
  }

  // باقي الكود للوضع الثابت (غير المباشر) يبقى كما هو دون تغيير
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appUrl)}&bgcolor=0d1a0f&color=c9a84c&qzone=2`;
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-primary/15 border-primary/25 text-primary">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {t("qiblaDirection")}
      </div>

      <p className="text-base font-semibold text-foreground text-center leading-snug">
        {t("qiblaDesktopPre")}{" "}
        <span className="text-primary font-bold font-mono text-xl">{bearing}°</span>{" "}
        {t("qiblaDesktopSuf")}
      </p>

      <div className="relative w-64 h-64 select-none">
        <svg viewBox="0 0 240 240" className="w-full h-full" aria-label="Qibla direction compass">
          <defs>
            <radialGradient id="roseBg" cx="40%" cy="30%">
              <stop offset="0%" stopColor="hsl(156,40%,14%)" />
              <stop offset="100%" stopColor="hsl(156,50%,7%)" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="120" r="118" fill="hsl(var(--primary))" opacity="0.07" />
          <circle cx="120" cy="120" r="108" fill="url(#roseBg)" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const deg = i * 22.5;
            const isCard = deg % 90 === 0;
            const rad = (deg - 90) * (Math.PI / 180);
            const r1 = 100, r2 = isCard ? 76 : 90;
            return (
              <line key={i}
                x1={120 + r1 * Math.cos(rad)} y1={120 + r1 * Math.sin(rad)}
                x2={120 + r2 * Math.cos(rad)} y2={120 + r2 * Math.sin(rad)}
                stroke={isCard ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isCard ? 2 : 1}
              />
            );
          })}
          <text x="120" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ef4444" fontSize="17" fontWeight="800" fontFamily="Inter,system-ui,sans-serif">N</text>
          <text x="120" y="212" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">S</text>
          <text x="213" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">E</text>
          <text x="27" y="121" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.35)" fontSize="14" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">W</text>
          <text x="120" y="145" textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="Inter,system-ui,sans-serif">
            {bearing}°
          </text>
          <circle cx="120" cy="120" r="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
          <g style={{ transform: `rotate(${bearing}deg)`, transformOrigin: "120px 120px" }}>
            <line x1="120" y1="120" x2="120" y2="36"
              stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" opacity="0.10" />
            <line x1="120" y1="120" x2="120" y2="44"
              stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <polygon points="120,18 110,46 130,46" fill="hsl(var(--primary))" opacity="0.95" />
            <rect x="111" y="14" width="18" height="14" rx="2"
              fill="#0d0d0d" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <rect x="111" y="19" width="18" height="3.5"
              fill="hsl(var(--primary))" opacity="0.75" />
            <rect x="116" y="22" width="8" height="6" rx="1"
              fill="hsl(var(--primary))" opacity="0.45" />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-sm bg-card border border-border rounded-2xl px-4 py-3 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("findNorthPre")}{" "}
          <span className="text-primary font-bold font-mono">{bearing}°</span>{" "}
          {t("findNorthSuf")}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 w-full max-w-sm">
        <button
          onClick={() => setShowQr(q => !q)}
          className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/>
            <rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="17" width="3" height="3"/>
            <rect x="19" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="1"/>
          </svg>
          {t("openOnPhone")}
        </button>
        {showQr && (
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <img src={qr} alt="QR code" width={140} height={140} className="rounded-xl border border-primary/20" />
            <p className="text-xs text-muted-foreground">{t("scanQr")}</p>
          </div>
        )}
      </div>
    </div>
  );
}