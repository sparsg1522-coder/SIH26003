import ActionButton from '../components/ActionButton'
import StatusCard from '../components/StatusCard'

const reminderCards = [
  {
    title: 'Medicine reminder',
    value: '9:00 AM',
    detail: 'Take blood pressure tablet',
    icon: '💊',
    tone: 'care',
  },
  {
    title: 'Hydration reminder',
    value: '1 glass',
    detail: 'Drink water now',
    icon: '💧',
    tone: 'hydration',
  },
]

const progressSegments = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
]

export default function HomePage({ onNavigate }) {
  return (
    <div className="page home-page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Good morning</p>
          <h2>Hello, Maria</h2>
        </div>

        <div className="hero-summary">
          <span className="hero-label">Today&apos;s focus</span>
          <strong>Memory care</strong>
        </div>
      </section>

      <section className="page-card activity-card">
        <div className="section-header">
          <h3>Today&apos;s cognitive activity</h3>
          <span className="pill-tag">15 min</span>
        </div>

        <p>
          Match picture cards and repeat the names of familiar objects to keep your
          mind active and calm.
        </p>

        <ActionButton onClick={() => onNavigate('games')}>
          Start Memory Game
        </ActionButton>
      </section>

      <section className="reminder-grid" aria-label="Daily reminders">
        {reminderCards.map((card) => (
          <StatusCard
            key={card.title}
            title={card.title}
            value={card.value}
            detail={card.detail}
            icon={card.icon}
            tone={card.tone}
          />
        ))}
      </section>

      <section className="page-card progress-card" aria-label="Daily progress">
        <div className="section-header">
          <h3>Daily cognitive progress</h3>
          <span className="pill-tag">72%</span>
        </div>

        <div className="progress-track" role="img" aria-label="72 percent complete">
          {progressSegments.map((filled, index) => (
            <span
              key={`segment-${index}`}
              className={`progress-segment ${filled ? 'filled' : ''}`}
            />
          ))}
        </div>

        <div className="progress-meta">
          <div>
            <strong>8</strong>
            <span>Activities</span>
          </div>
          <div>
            <strong>5</strong>
            <span>Wins</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Goals</span>
          </div>
        </div>
      </section>

      <ActionButton
        onClick={() => onNavigate('voice')}
        className="voice-action"
        fullWidth
      >
        🎙️ Talk to Voice Assistant
      </ActionButton>
    </div>
  )
}
