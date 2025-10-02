import React from 'react'

export default function Tile({ letter = '', status = '' }) {
  return (
    <div className={`tile ${status}`.trim()} role="gridcell" aria-label={letter}>
      {letter}
    </div>
  )
}