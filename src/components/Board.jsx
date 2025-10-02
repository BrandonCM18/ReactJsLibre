import React from "react";

export default function Board({ guesses, evaluations, currentGuess, maxAttempts }) {
  const rows = Array.from({ length: maxAttempts }, (_, i) => {
    const guess = guesses[i] || (i === guesses.length ? currentGuess : "");
    const evals = evaluations[i] || [];
    return { guess, evals };
  });

  const getColor = (status) => {
    switch (status) {
      case "correct":
        return "#00FF00"; // verde
      case "present":
        return "#FFD700"; // amarillo
      case "absent":
        return "#555"; // gris oscuro
      default:
        return "#222"; // fondo de celda
    }
  };

  return (
    <div style={{ display: "grid", gap: "5px" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "5px" }}>
          {Array.from({ length: 5 }, (_, j) => (
            <div
              key={j}
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: getColor(row.evals[j]),
                color: "#000",
                fontWeight: "bold",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              {row.guess[j] || ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}