import { useEffect, useState } from 'react'

const ITEMS = [
  { name: 'Apple', emoji: '🍎' },
  { name: 'House', emoji: '🏠' },
  { name: 'Flower', emoji: '🌸' },
  { name: 'Sun', emoji: '☀️' },
  { name: 'Book', emoji: '📖' },
  { name: 'Cup', emoji: '☕' },
]

const createSequence = (length) => {
  const shuffled = [...ITEMS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, length)
}



export default function SequenceGame({ onBack }) {
  const [sequence, setSequence] = useState([])
  const [userSequence, setUserSequence] = useState([])
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(0)

  const [phase, setPhase] = useState('ready')
  const [message, setMessage] = useState(
    'When you are ready, press Start Activity.'
  )

  const [feedback, setFeedback] = useState('')

  const sequenceLength = Math.min(3 + round - 1, 6)

  const startRound = () => {
    const newSequence = createSequence(sequenceLength)

    setSequence(newSequence)
    setUserSequence([])
    setFeedback('')
    setPhase('showing')

    setMessage(
      `Remember these ${sequenceLength} pictures in order.`
    )

    setTimeout(() => {
      setPhase('playing')
      setMessage('Now tap the pictures in the same order.')
    }, 3500)
  }

  const handleItemClick = (item) => {
    if (phase !== 'playing') return

    const nextPosition = userSequence.length
    const expectedItem = sequence[nextPosition]

    if (!expectedItem) return

    if (item.name === expectedItem.name) {
      const updatedSequence = [...userSequence, item]

      setUserSequence(updatedSequence)
      setFeedback('correct')

      if (updatedSequence.length === sequence.length) {
        setScore((current) => current + 1)
        setPhase('success')
        setMessage('Wonderful! You remembered the whole sequence! 🎉')

        setTimeout(() => {
          setRound((current) => current + 1)
          setUserSequence([])
          setFeedback('')
          setPhase('next')
          setMessage('You are doing great. Ready for the next round?')
        }, 1200)
      } else {
        setMessage(
          `${updatedSequence.length} of ${sequence.length} correct. Keep going!`
        )

        setTimeout(() => {
          setFeedback('')
        }, 400)
      }
    } else {
      setFeedback('wrong')
      setPhase('mistake')

      setMessage(
        `That's okay. The next picture was ${expectedItem.name}.`
      )

      setTimeout(() => {
        setUserSequence([])
        setFeedback('')
        setPhase('playing')
        setMessage("Let's try the sequence again.")
      }, 1600)
    }
  }

  const restartGame = () => {
    setSequence([])
    setUserSequence([])
    setRound(1)
    setScore(0)
    setPhase('ready')
    setFeedback('')
    setMessage(
      'When you are ready, press Start Activity.'
    )
  }

  return (
    <section className="page-card sequence-game">

      {/* Header */}
      <div className="sequence-header">
        <div>
          <span className="eyebrow">
            Cognitive Activity
          </span>

          <h2>Remember the Sequence</h2>
        </div>

        <div className="sequence-brain-icon">
          🧠
        </div>
      </div>

      {/* Instructions */}
      <div className="sequence-instructions">
        <p>
          Watch the pictures carefully, remember their order,
          and then tap them in the same order.
        </p>
      </div>

      {/* Stats */}
      <div className="sequence-stats">

        <div className="sequence-stat">
          <span>ROUND</span>
          <strong>{round}</strong>
        </div>

        <div className="sequence-stat">
          <span>SCORE</span>
          <strong>{score}</strong>
        </div>

        <div className="sequence-stat">
          <span>MEMORY</span>
          <strong>{sequenceLength} items</strong>
        </div>

      </div>

      {/* Message */}
      <div
        className={`sequence-message ${feedback}`}
        aria-live="polite"
      >
        {message}
      </div>

      {/* Remembered sequence */}
      {sequence.length > 0 && (
        <div className="sequence-area">

          <div className="sequence-area-title">
            {phase === 'showing'
              ? '👀 Remember this order'
              : '🧠 Your memory'}
          </div>

          <div className="sequence-display">

            {sequence.map((item, index) => {
              const isCompleted =
                index < userSequence.length

              return (
                <div
                  className={`sequence-item ${
                    phase === 'showing'
                      ? 'visible'
                      : ''
                  } ${
                    isCompleted
                      ? 'selected'
                      : ''
                  }`}
                  key={`${item.name}-${index}`}
                >

                  {phase === 'showing' ? (
                    <>
                      <span className="sequence-item-emoji">
                        {item.emoji}
                      </span>

                      <strong>
                        {item.name}
                      </strong>
                    </>
                  ) : (
                    <>
                      <span className="sequence-number">
                        {isCompleted
                          ? '✓'
                          : index + 1}
                      </span>
                    </>
                  )}

                </div>
              )
            })}

          </div>

        </div>
      )}

      {/* Start */}
      {phase === 'ready' && (
        <button
          className="sequence-start-button"
          onClick={startRound}
        >
          ▶ Start Activity
        </button>
      )}

      {/* Next round */}
      {phase === 'next' && (
        <button
          className="sequence-start-button"
          onClick={startRound}
        >
          ⭐ Start Next Round
        </button>
      )}

      {/* Options */}
      {(phase === 'playing' || phase === 'mistake') && (
        <div className="sequence-options">

          <h3>
            Tap the picture that comes next
          </h3>

          <div className="sequence-options-grid">

            {ITEMS.map((item) => (
              <button
                key={item.name}
                className="sequence-option"
                onClick={() => handleItemClick(item)}
                disabled={phase === 'mistake'}
              >

                <span className="sequence-option-emoji">
                  {item.emoji}
                </span>

                <strong>
                  {item.name}
                </strong>

              </button>
            ))}

          </div>

        </div>
      )}

      {/* Success */}
      {phase === 'success' && (
        <div className="sequence-success">
          <div className="success-icon">
            🎉
          </div>

          <h3>Excellent!</h3>

          <p>
            You remembered all {sequence.length} pictures
            correctly.
          </p>
        </div>
      )}

      {/* Bottom actions */}
      <div className="game-actions sequence-actions">

        <button
          className="sequence-secondary-button"
          onClick={restartGame}
        >
          🔄 Restart
        </button>

        <button
          className="sequence-secondary-button"
          onClick={onBack}
        >
          ← Back to Games
        </button>

      </div>

    </section>
  )
}
 