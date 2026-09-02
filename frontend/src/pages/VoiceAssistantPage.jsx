import { useState } from 'react'
import ActionButton from '../components/ActionButton'

const voiceExamples = [
  {
    icon: '💊',
    text: 'Remind me to take my medicine',
  },
  {
    icon: '🧠',
    text: 'Start a memory game',
  },
  {
    icon: '💧',
    text: 'Remind me to drink water',
  },
  {
    icon: '📞',
    text: 'Call my family',
  },
]

export default function VoiceAssistantPage({ onNavigate }) {
  const [listening, setListening] = useState(false)
  const [message, setMessage] = useState(
    'What would you like help with?'
  )

  const handleVoiceClick = () => {
    if (listening) {
      setListening(false)
      setMessage('I stopped listening. Tap the button when you are ready.')
      return
    }

    setListening(true)
    setMessage('I’m listening... Tell me what you need.')
  }

  return (
    <div className="page voice-page">

      {/* Header */}

      <section className="page-card voice-header">

        <div>
          <span className="eyebrow">
            CARE COMPANION
          </span>

          <h2>
            Voice Assistant
          </h2>

          <p>
            You can talk to MindCare instead of typing.
            Just speak naturally.
          </p>
        </div>

        <span className="pill-tag">
          Voice help
        </span>

      </section>


      {/* Main voice area */}

      <section className="voice-card">

        <div
          className={`voice-orb ${
            listening ? 'listening' : ''
          }`}
        >
          <span>
            🎙️
          </span>
        </div>

        <div className="voice-status">

          <span className="voice-status-label">
            {listening ? 'LISTENING' : 'READY'}
          </span>

          <h2>
            {listening
              ? 'I’m listening...'
              : 'How can I help?'}
          </h2>

          <p>
            {message}
          </p>

        </div>


        <button
          className={`voice-main-button ${
            listening ? 'active' : ''
          }`}
          onClick={handleVoiceClick}
          aria-label={
            listening
              ? 'Stop listening'
              : 'Start voice assistant'
          }
        >

          <span className="voice-main-icon">
            🎙️
          </span>

          <span>
            {listening
              ? 'Stop Listening'
              : 'Tap to Talk'}
          </span>

        </button>

      </section>


      {/* Example commands */}

      <section className="page-card voice-examples">

        <div className="section-header">

          <div>
            <h2>
              You can say...
            </h2>

            <span className="pill-tag">
              Examples
            </span>
          </div>

        </div>


        <div className="voice-example-list">

          {voiceExamples.map((example) => (

            <button
              key={example.text}
              className="voice-example"
              onClick={() => {
                setMessage(
                  `You said: "${example.text}"`
                )
              }}
            >

              <span className="voice-example-icon">
                {example.icon}
              </span>

              <span>
                {example.text}
              </span>

              <strong>
                →
              </strong>

            </button>

          ))}

        </div>

      </section>


      {/* Safety / explanation */}

      <section className="voice-help-card">

        <div className="voice-help-icon">
          💚
        </div>

        <div>

          <h3>
            Need help?
          </h3>

          <p>
            Speak slowly and clearly. You don't need
            to use special words.
          </p>

        </div>

      </section>


      <ActionButton
        onClick={() => onNavigate('home')}
        fullWidth
      >
        Return Home
      </ActionButton>

    </div>
  )
}