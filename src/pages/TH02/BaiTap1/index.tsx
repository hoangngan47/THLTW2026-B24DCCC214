import { useState } from "react";

export default function BaiTap1() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const choices = ["Kéo", "Búa", "Bao"];

  const play = (player: string) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    let kq = "";

    if (player === computer) {
      kq = "Hòa";
    } else if (
      (player === "Kéo" && computer === "Bao") ||
      (player === "Búa" && computer === "Kéo") ||
      (player === "Bao" && computer === "Búa")
    ) {
      kq = "Bạn thắng";
    } else {
      kq = "Bạn thua";
    }

    const text = `Bạn: ${player} | Máy: ${computer} → ${kq}`;
    setResult(text);
    setHistory([text, ...history]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: 10,
          padding: 30,
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          background: "#fafafa",
        }}
      >
        <h2>Game Oẳn Tù Tì</h2>

        <div style={{ marginBottom: 20 }}>
          <button style={btn} onClick={() => play("Kéo")}> Kéo</button>
          <button style={btn} onClick={() => play("Búa")}> Búa</button>
          <button style={btn} onClick={() => play("Bao")}> Bao</button>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 10,
            borderRadius: 6,
            marginBottom: 20,
            fontWeight: "bold",
            color: '#333',
          }}
        >
          {result || "Hãy chọn Kéo, Búa, Bao"}
        </div>

        <h3>Lịch sử</h3>

        <ul style={{ textAlign: "left", maxHeight: 150, overflowY: "auto" }}>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const btn = {
  padding: "10px 15px",
  margin: "5px",
  borderRadius: 6,
  border: "none",
  background: "#1677ff",
  color: "white",
  cursor: "pointer",
};