import React from 'react'

const LAYOUT = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  ['ENTER','Z','X','C','V','B','N','M','BACK']
]

export default function Keyboard({ onKey, usedKeys = {} }) {
  return (
    <div className="keyboard" role="application" aria-label="Teclado">
      {LAYOUT.map((row, i) => (
        <div className="kb-row" key={i}>
          {row.map((k) => {
            const keyLabel = k === 'BACK' ? '⌫' : k
            const status = usedKeys[k] || ''
            return (
              <button
                key={k}
                className={`key ${status}`.trim()}
                onClick={() => onKey(k === 'BACK' ? 'BACKSPACE' : k === 'ENTER' ? 'ENTER' : k)}
              >
                {keyLabel}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}