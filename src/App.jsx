import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { SOLUTIONS, WORDS } from "./utils/words";
import { checkGuess, isValidWord } from "./utils/gameLogic";

function pickSolution() {
  const clean = SOLUTIONS.filter((w) => w && w.length === 5);
  return clean[Math.floor(Math.random() * clean.length)];
}

export default function App() {
  const [solution, setSolution] = useState(() => pickSolution());
  const [guesses, setGuesses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      const k = e.key.toUpperCase();
      if (k === "BACKSPACE") return setCurrentGuess((prev) => prev.slice(0, -1));
      if (k === "ENTER") return submitGuess();
      if (/^[A-Z]$/.test(k)) {
        if (currentGuess.length < 5) setCurrentGuess((prev) => prev + k);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, gameOver]);

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      flashMessage("La palabra debe tener 5 letras");
      return;
    }
    const guess = currentGuess.toUpperCase();
    if (!isValidWord(guess, WORDS)) {
      flashMessage("Palabra no válida");
      return;
    }

    const evalResult = checkGuess(solution, guess);
    setGuesses([...guesses, guess]);
    setEvaluations([...evaluations, evalResult]);
    setCurrentGuess("");

    if (evalResult.every((s) => s === "correct")) {
      setGameOver(true);
      flashMessage("¡Ganaste!");
      return;
    }

    if (guesses.length + 1 >= maxAttempts) {
      setGameOver(true);
      flashMessage(`Fin del juego. La palabra era: ${solution}`);
    }
  };

  const flashMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const resetGame = () => {
    setSolution(pickSolution());
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess("");
    setMessage("");
    setGameOver(false);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>Wordle Clone</h1>
        <button onClick={resetGame} style={styles.button}>
          Reiniciar
        </button>
      </header>

      <Board
        guesses={guesses}
        evaluations={evaluations}
        currentGuess={currentGuess}
        maxAttempts={maxAttempts}
      />

      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#FFD700", // amarillo
    border: "none",
    borderRadius: "5px",
    color: "#000",
    fontWeight: "bold",
  },
  message: {
    marginTop: "20px",
    fontWeight: "bold",
  },
};