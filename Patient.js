import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

function Patient() {
  const [currentToken, setCurrentToken] = useState(0);
  const [avgTime, setAvgTime] = useState(10);
  const [myToken, setMyToken] = useState("");
  const [doctorStatus, setDoctorStatus] = useState("Available");
  const [calledTime, setCalledTime] = useState("");
  const [queue, setQueue] = useState([]);
  const [prevToken, setPrevToken] = useState(0);

  const funFacts = [
    "🦷 Teeth are the strongest part of your body!",
    "❤️ Your heart beats around 100,000 times every day!",
    "🌟 Smiling can make you feel happier!",
    "🦴 Babies have more bones than adults!",
    "🐼 Pandas spend most of their day eating bamboo!"
  ];

  const [fact, setFact] = useState(funFacts[0]);
  const [message, setMessage] = useState("");

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    onValue(ref(db, "currentToken"), (snap) => {
      const val = snap.val() || 0;

      if (val > prevToken && prevToken !== 0) {
        speak(`Attention please. Token number ${val} is now being called.`);
      }

      setPrevToken(val);
      setCurrentToken(val);
    });

    onValue(ref(db, "avgTime"), (snap) => {
      setAvgTime(snap.val() || 10);
    });

    onValue(ref(db, "doctorStatus"), (snap) => {
      setDoctorStatus(snap.val() || "Available");
    });

    onValue(ref(db, "calledTime"), (snap) => {
      setCalledTime(snap.val() || "");
    });

    onValue(ref(db, "queue"), (snap) => {
      const data = snap.val();
      setQueue(data ? Object.values(data) : []);
    });

    setFact(
      funFacts[Math.floor(Math.random() * funFacts.length)]
    );
  }, []);

  const tokensAhead =
    myToken > currentToken
      ? myToken - currentToken - 1
      : 0;

  const waitTime = tokensAhead * avgTime;

  const progress =
    myToken > 0
      ? Math.min(
          Math.round((currentToken / myToken) * 100),
          100
        )
      : 0;

  const currentPatient = queue.find(
    (p) => p.token === currentToken
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: "url('/hospital-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "rgba(255,255,255,0.95)",
          padding: "25px",
          borderRadius: "25px",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#7c3aed"
          }}
        >
          🪑 Patient Waiting Room
        </h1>

        <div
          style={{
            background:
              doctorStatus === "Available"
                ? "#dcfce7"
                : "#fee2e2",
            padding: "15px",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          <h3>
            Doctor:
            {doctorStatus === "Available"
              ? " 🟢 Available"
              : " 🔴 Busy"}
          </h3>
        </div>

        <div
          style={{
            background: "#7c3aed",
            color: "white",
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          <p>Now Serving</p>

          <h1 style={{ fontSize: "50px" }}>
            Token {currentToken}
          </h1>

          {currentPatient && (
            <h2>👤 {currentPatient.name}</h2>
          )}

          {calledTime && (
            <p>🕐 Called at {calledTime}</p>
          )}

          <div
            style={{
              width: "100%",
              height: "20px",
              background: "#ddd",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "20px"
            }}
          >
            <div
              style={{
                width:
                  queue.length > 0
                    ? `${(currentToken /
                        queue.length) *
                        100}%`
                    : "0%",
                height: "100%",
                background: "#16a34a",
                transition: "0.5s"
              }}
            />
          </div>

          <p>
            Queue Progress:
            {queue.length > 0
              ? Math.round(
                  (currentToken /
                    queue.length) *
                    100
                )
              : 0}
            %
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px"
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#fef3c7",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h3>👥 Waiting</h3>
            <h2>
              {Math.max(
                0,
                queue.length - currentToken
              )}
            </h2>
          </div>

          <div
            style={{
              flex: 1,
              background: "#dcfce7",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center"
            }}
          >
            <h3>✅ Served</h3>
            <h2>{currentToken}</h2>
          </div>
        </div>

        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>Enter Your Token Number</h3>

          <input
            type="number"
            placeholder="Your Token"
            value={myToken}
            onChange={(e) =>
              setMyToken(Number(e.target.value))
            }
            style={{
              padding: "12px",
              width: "70%",
              fontSize: "18px",
              borderRadius: "10px",
              border: "2px solid #7c3aed"
            }}
          />
        </div>

        {myToken > 0 && (
          <div
            style={{
              background: "#eff6ff",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "20px"
            }}
          >
            <h3>
              👥 Tokens Ahead:
              {tokensAhead}
            </h3>

            <h3>
              ⏱ Estimated Wait:
              {waitTime} mins
            </h3>

            <h3>
              📍 Your Position:
              {tokensAhead + 1}
            </h3>

            <div
              style={{
                width: "100%",
                height: "20px",
                background: "#ddd",
                borderRadius: "20px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#7c3aed",
                  transition: "0.5s"
                }}
              />
            </div>

            <p>Progress: {progress}%</p>

            {tokensAhead <= 2 &&
              tokensAhead > 0 && (
                <h3 style={{ color: "red" }}>
                  ⚠️ Please proceed to the
                  waiting area.
                </h3>
              )}

            {myToken === currentToken && (
              <h2
                style={{
                  color: "#16a34a"
                }}
              >
                🎉 It's Your Turn!
              </h2>
            )}
          </div>
        )}

        <div
          style={{
            background: "#fff7ed",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px"
          }}
        >
          <h2>🎈 Kid Zone</h2>

          <p>
            🐼 Dr. Panda says:
            Don't worry! The doctor will
            see you soon.
          </p>

          <p>
            🎉 Fun Fact:
            <b>{fact}</b>
          </p>

          <button
            onClick={() =>
              setMessage(
                "🐻 Teddy says: You are very brave!"
              )
            }
            style={{
              padding: "10px 20px",
              background: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            😟 I am Nervous
          </button>

          <p
            style={{
              marginTop: "15px",
              fontWeight: "bold"
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Patient;