import { useEffect, useState } from 'react'

const OBJECTS = [
  { name: 'Apple', emoji: '🍎' },
  { name: 'Cup', emoji: '☕' },
  { name: 'Book', emoji: '📖' },
  { name: 'House', emoji: '🏠' },
  { name: 'Flower', emoji: '🌸' },
  { name: 'Sun', emoji: '☀️' },
]

const createRound = () => {
  const shuffled = [...OBJECTS].sort(() => Math.random() - 0.5)

  return {
    target: shuffled.slice(0, 3),
    options: [...OBJECTS].sort(() => Math.random() - 0.5),
  }
}

export default function ObjectRecallGame({ onBack }) {
  const [roundData, setRoundData] = useState(createRound)
  const [showingObjects, setShowingObjects] = useState(true)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [message, setMessage] = useState(
    'Look carefully and remember the objects.'
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowingObjects(false)
      setMessage('Which object did you see?')
    }, 4000)

    return () => clearTimeout(timer)
  }, [roundData])

  const handleObjectClick = (object) => {
    if (showingObjects || selected) {
      return
    }

    setSelected(object.name)

    const wasShown = roundData.target.some(
      (item) => item.name === object.name
    )

    if (wasShown) {
      setScore((current) => current + 1)
      setMessage('Wonderful! You remembered it! 🌟')
    } else {
      setMessage(
        `That's okay. Keep practicing!`
      )
    }

    setTimeout(() => {
      const nextRound = createRound()

      setRoundData(nextRound)
      setSelected(null)
      setRound((current) => current + 1)
      setShowingObjects(true)
      setMessage('Look carefully and remember the objects.')
    }, 1500)
  }

  const restartGame = () => {
    setRoundData(createRound())
    setShowingObjects(true)
    setSelected(null)
    setScore(0)
    setRound(1)
    setMessage('Look carefully and remember the objects.')
  }

  return (
    <section className="page-card object-recall-game">

      <div className="section-header">
        <div>
          <h2>Object Recall</h2>
          <span className="pill-tag">
            Visual Memory
          </span>
        </div>
      </div>

      <p className="game-instructions">
        Look at the objects carefully. After they disappear,
        choose an object that you remember seeing.
      </p>

      <div className="object-recall-stats">

        <div>
          <span>Round</span>
          <strong>{round}</strong>
        </div>

        <div>
          <span>Score</span>
          <strong>{score}</strong>
        </div>

      </div>

      <div
        className="object-recall-message"
        aria-live="polite"
      >
        {message}
      </div>

      {/* Objects shown during memory phase */}
      {showingObjects && (
        <div className="recall-display">
          {roundData.target.map((object) => (
            <div
              className="recall-object"
              key={object.name}
            >
              <span className="recall-object-emoji">
                {object.emoji}
              </span>

              <strong>
                {object.name}
              </strong>
            </div>
          ))}
        </div>
      )}

      {/* Choice phase */}
      {!showingObjects && (
        <div className="recall-options">

          {roundData.options.map((object) => {
            const isSelected = selected === object.name

            return (
              <button
                key={object.name}
                className={`recall-option ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => handleObjectClick(object)}
              >
                <span className="recall-option-emoji">
                  {object.emoji}
                </span>

                <strong>
                  {object.name}
                </strong>
              </button>
            )
          })}

        </div>
      )}

      <div className="game-actions">

        <button
          className="sequence-secondary-button"
          onClick={restartGame}
        >
          Restart
        </button>

        <button
          className="sequence-secondary-button"
          onClick={onBack}
        >
          Back to Games
        </button>

      </div>

    </section>
  )
}