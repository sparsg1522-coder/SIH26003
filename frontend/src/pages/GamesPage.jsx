import { useEffect, useState } from 'react'
import ActionButton from '../components/ActionButton'
import SequenceGame from '../components/SequenceGame'
import ObjectRecallGame from '../components/ObjectRecallGame'

const cardPairs = [
  { name: 'Apple', emoji: '🍎' },
  { name: 'Sun', emoji: '☀️' },
  { name: 'Flower', emoji: '🌸' },
  { name: 'House', emoji: '🏠' },
  { name: 'Book', emoji: '📖' },
  { name: 'Cup', emoji: '☕' },
]

const createDeck = () => {
  const deck = cardPairs.flatMap((pair, index) => [
    {
      id: `${index}-a`,
      name: pair.name,
      emoji: pair.emoji,
    },
    {
      id: `${index}-b`,
      name: pair.name,
      emoji: pair.emoji,
    },
  ])

  return deck.sort(() => Math.random() - 0.5)
}

export default function GamesPage({ onNavigate }) {
  const [selectedGame, setSelectedGame] = useState('menu')

  const [cards, setCards] = useState(createDeck)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [message, setMessage] = useState(
    'Find the matching pairs!'
  )
  const [gameStarted, setGameStarted] = useState(false)

  const gameComplete = matched.length === cards.length

  useEffect(() => {
    if (!gameStarted || gameComplete) return

    const timer = setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameComplete])

  useEffect(() => {
    if (flipped.length !== 2) return

    const firstCard = cards.find(
      (card) => card.id === flipped[0]
    )

    const secondCard = cards.find(
      (card) => card.id === flipped[1]
    )

    if (!firstCard || !secondCard) return

    setMoves((current) => current + 1)

    if (firstCard.name === secondCard.name) {
      setMatched((current) => [
        ...current,
        firstCard.id,
        secondCard.id,
      ])

      setMessage('Wonderful! You found a pair! 🌟')
      setFlipped([])
    } else {
      setMessage('Take your time. Try another pair.')

      const timeout = setTimeout(() => {
        setFlipped([])
        setMessage('Find the matching pairs!')
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [flipped, cards])

  useEffect(() => {
    if (gameComplete && cards.length > 0) {
      setMessage('You completed the game! 🎉')
    }
  }, [gameComplete, cards.length])

  const handleCardClick = (card) => {
    if (
      flipped.length === 2 ||
      flipped.includes(card.id) ||
      matched.includes(card.id)
    ) {
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    setFlipped((current) => [...current, card.id])
  }

  const resetGame = () => {
    setCards(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setSeconds(0)
    setMessage('Find the matching pairs!')
    setGameStarted(false)
  }

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  /* ==============================
     SEQUENCE GAME
     ============================== */

  if (selectedGame === 'sequence') {
    return (
      <div className="page">
        <SequenceGame
          onBack={() => setSelectedGame('menu')}
        />
      </div>
    )
  }

  /* ==============================
     OBJECT RECALL GAME
     ============================== */

  if (selectedGame === 'recall') {
    return (
      <div className="page">
        <ObjectRecallGame
          onBack={() => setSelectedGame('menu')}
        />
      </div>
    )
  }

  /* ==============================
     MEMORY GAME
     ============================== */

  if (selectedGame === 'memory') {
    return (
      <div className="page">
        <section className="page-card memory-game">

          <div className="section-header">
            <div>
              <h2>Memory Game</h2>

              <span className="pill-tag">
                Cognitive Activity
              </span>
            </div>
          </div>

          <p className="game-instructions">
            Match the familiar pictures and exercise your
            memory. Take your time — there is no need to rush.
          </p>

          <div className="game-stats">

            <div>
              <span>Moves</span>
              <strong>{moves}</strong>
            </div>

            <div>
              <span>Time</span>
              <strong>{formatTime()}</strong>
            </div>

            <div>
              <span>Pairs</span>
              <strong>
                {matched.length / 2}/{cardPairs.length}
              </strong>
            </div>

          </div>

          <div
            className="game-message"
            aria-live="polite"
          >
            {message}
          </div>

          <div className="memory-grid">

            {cards.map((card) => {

              const isFlipped =
                flipped.includes(card.id)

              const isMatched =
                matched.includes(card.id)

              return (
                <button
                  key={card.id}
                  className={`memory-card ${
                    isFlipped || isMatched
                      ? 'revealed'
                      : ''
                  } ${
                    isMatched
                      ? 'matched'
                      : ''
                  }`}
                  onClick={() =>
                    handleCardClick(card)
                  }
                  disabled={isMatched}
                >

                  {isFlipped || isMatched ? (
                    <>
                      <span className="card-emoji">
                        {card.emoji}
                      </span>

                      <span className="card-name">
                        {card.name}
                      </span>
                    </>
                  ) : (
                    <span className="card-question">
                      ?
                    </span>
                  )}

                </button>
              )
            })}

          </div>

          {gameComplete && (
            <div className="game-complete">

              <div className="complete-icon">
                🎉
              </div>

              <h3>Well done!</h3>

              <p>
                You found all {cardPairs.length} pairs
                in {moves} moves.
              </p>

              <p>
                Your time:{' '}
                <strong>{formatTime()}</strong>
              </p>

            </div>
          )}

          <div className="game-actions">

            <ActionButton onClick={resetGame}>
              Restart Game
            </ActionButton>

            <ActionButton
              onClick={() => setSelectedGame('menu')}
            >
              Back to Games
            </ActionButton>

          </div>

        </section>
      </div>
    )
  }

  /* ==============================
     GAMES MENU
     ============================== */

  return (
    <div className="page">

      <section className="page-card games-menu">

        <div className="section-header">
          <div>
            <h2>Cognitive Activities</h2>

            <span className="pill-tag">
              Memory Care
            </span>
          </div>
        </div>

        <p className="game-instructions">
          Choose an activity and take your time.
          These exercises are designed to keep the mind
          active and engaged.
        </p>

        {/* MEMORY GAME */}

        <button
          className="game-choice"
          onClick={() => setSelectedGame('memory')}
        >

          <div className="game-choice-icon">
            🧩
          </div>

          <div className="game-choice-content">

            <h3>Memory Matching</h3>

            <p>
              Match familiar pictures and find
              all the pairs.
            </p>

            <span>
              Easy • Visual memory
            </span>

          </div>

          <div className="game-choice-arrow">
            →
          </div>

        </button>

        {/* SEQUENCE GAME */}

        <button
          className="game-choice"
          onClick={() => setSelectedGame('sequence')}
        >

          <div className="game-choice-icon">
            🔢
          </div>

          <div className="game-choice-content">

            <h3>Sequence Memory</h3>

            <p>
              Remember the order of familiar
              pictures and repeat it.
            </p>

            <span>
              Progressive difficulty
            </span>

          </div>

          <div className="game-choice-arrow">
            →
          </div>

        </button>

        {/* OBJECT RECALL */}

        <button
          className="game-choice"
          onClick={() => setSelectedGame('recall')}
        >

          <div className="game-choice-icon">
            👀
          </div>

          <div className="game-choice-content">

            <h3>Object Recall</h3>

            <p>
              Look carefully, remember what you
              saw, and test your visual recall.
            </p>

            <span>
              Progressive difficulty
            </span>

          </div>

          <div className="game-choice-arrow">
            →
          </div>

        </button>

      </section>

    </div>
  )
}