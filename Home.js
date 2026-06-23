import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      {/* Animated background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRing}>
          <span style={styles.logoEmoji}>🏥</span>
        </div>

        {/* Heading */}
        <h1 style={styles.title}>Queue<span style={styles.titleAccent}>Cure</span></h1>
        <p style={styles.subtitle}>Smart Hospital Queue Management</p>

        <div style={styles.divider} />

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <span style={styles.statNum}>⚡</span>
            <span style={styles.statLabel}>Real-time</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>🔔</span>
            <span style={styles.statLabel}>Voice Alerts</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>📊</span>
            <span style={styles.statLabel}>Live Queue</span>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Navigation buttons */}
        <p style={styles.chooseText}>Choose your role to continue</p>

        <div style={styles.btnRow}>
          <button
            style={styles.receptionistBtn}
            onClick={() => navigate("/receptionist")}
            onMouseEnter={e => e.target.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            <span style={styles.btnIcon}>👩‍⚕️</span>
            <span style={styles.btnTitle}>Receptionist</span>
            <span style={styles.btnDesc}>Manage patients & queue</span>
          </button>

          <button
            style={styles.patientBtn}
            onClick={() => navigate("/patient")}
            onMouseEnter={e => e.target.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            <span style={styles.btnIcon}>🪑</span>
            <span style={styles.btnTitle}>Patient</span>
            <span style={styles.btnDesc}>Track your token & wait time</span>
          </button>
        </div>

        <p style={styles.footer}>Powered by Firebase • Real-time sync across all devices</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(-45deg, #dbeafe, #bfdbfe, #e0f2fe, #f0f9ff)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-80px", left: "-80px",
    width: "320px", height: "320px",
    background: "rgba(147,197,253,0.35)",
    borderRadius: "50%", filter: "blur(60px)", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "-60px", right: "-60px",
    width: "280px", height: "280px",
    background: "rgba(196,181,253,0.3)",
    borderRadius: "50%", filter: "blur(60px)", zIndex: 0,
  },
  blob3: {
    position: "fixed", top: "40%", left: "50%",
    width: "200px", height: "200px",
    background: "rgba(167,243,208,0.2)",
    borderRadius: "50%", filter: "blur(50px)", zIndex: 0,
  },
  card: {
    position: "relative", zIndex: 1,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    padding: "48px 40px",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(37,99,235,0.15)",
    textAlign: "center",
  },
  logoRing: {
    width: "90px", height: "90px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
  },
  logoEmoji: { fontSize: "42px" },
  title: {
    fontSize: "42px", fontWeight: "800",
    margin: "0 0 8px",
    color: "#1e3a5f",
    letterSpacing: "-1px",
  },
  titleAccent: { color: "#2563eb" },
  subtitle: {
    color: "#64748b", fontSize: "16px",
    margin: "0 0 24px", fontWeight: "500",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
    margin: "20px 0",
  },
  statsRow: {
    display: "flex", justifyContent: "space-around",
    margin: "16px 0",
  },
  stat: {
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "4px",
  },
  statNum: { fontSize: "28px" },
  statLabel: { fontSize: "12px", color: "#64748b", fontWeight: "600" },
  chooseText: {
    color: "#94a3b8", fontSize: "13px",
    fontWeight: "600", letterSpacing: "0.5px",
    textTransform: "uppercase", margin: "0 0 20px",
  },
  btnRow: {
    display: "flex", gap: "16px",
    marginBottom: "28px",
  },
  receptionistBtn: {
    flex: 1,
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white", border: "none",
    borderRadius: "20px", padding: "20px 12px",
    cursor: "pointer",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "6px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 8px 20px rgba(37,99,235,0.35)",
  },
  patientBtn: {
    flex: 1,
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "white", border: "none",
    borderRadius: "20px", padding: "20px 12px",
    cursor: "pointer",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "6px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
  },
  btnIcon: { fontSize: "32px" },
  btnTitle: { fontSize: "16px", fontWeight: "700" },
  btnDesc: { fontSize: "11px", opacity: 0.85, lineHeight: "1.3" },
  footer: {
    color: "#94a3b8", fontSize: "12px", margin: 0,
  },
};