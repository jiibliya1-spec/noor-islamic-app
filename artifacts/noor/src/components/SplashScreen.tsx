import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2000);
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <img src="/logo.png" style={styles.logo} />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#2b0a5c",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  logo: {
    width: "120px",
    animation: "zoomFade 1.5s ease-in-out",
  },
};