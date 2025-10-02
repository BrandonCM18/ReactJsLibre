// Recibe solution y guess en MAYÚSCULAS, 5 letras cada una
export function checkGuess(solution, guess) {
  const result = Array(5).fill('absent') // 'correct' | 'present' | 'absent'
  const solutionChars = solution.split('')
  const guessChars = guess.split('')

  // 1) Marcar verdes
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = 'correct'
      solutionChars[i] = null
      guessChars[i] = null
    }
  }

  // 2) Marcar amarillos (present)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === null) continue
    const idx = solutionChars.indexOf(guessChars[i])
    if (idx !== -1) {
      result[i] = 'present'
      solutionChars[idx] = null
    }
  }

  return result
}

export function isValidWord(word, WORDS) {
  return WORDS.includes(word)
}