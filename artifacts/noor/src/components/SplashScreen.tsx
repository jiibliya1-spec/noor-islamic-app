import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#064e3b] overflow-hidden">
      <div
        className={`flex flex-col items-center transition-all duration-1000 ease-out ${
          animate
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-24 opacity-0 scale-90"
        }`}
      >
        <h1
          className="text-7xl mb-2"
          style={{
            color: "#facc15",
            fontFamily: "'Amiri', serif",
          }}
        >
          نور
        </h1>

        <p className="text-2xl font-bold tracking-widest text-yellow-400">
          NOOR
        </p>
      </div>
    </div>
  );
}