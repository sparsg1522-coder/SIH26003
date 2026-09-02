import { useState } from 'react'
import ActionButton from '../components/ActionButton'

const initialReminders = [
  {
    id: 1,
    title: 'Medicine',
    time: '9:00 AM',
    detail: 'Take blood pressure tablet',
    icon: '💊',
    tone: 'care',
  },
  {
    id: 2,
    title: 'Drink Water',
    time: '11:00 AM',
    detail: 'Drink 1 glass of water',
    icon: '💧',
    tone: 'hydration',
  },
  {
    id: 3,
    title: 'Lunch',
    time: '12:30 PM',
    detail: 'Time for lunch',
    icon: '🍽️',
    tone: 'highlight',
  },
  {
    id: 4,
    title: 'Memory Activity',
    time: '4:00 PM',
    detail: 'Complete a 15 minute activity',
    icon: '🧠',
    tone: 'primary',
  },
  {
    id: 5,
    title: 'Family Check-in',
    time: '6:00 PM',
    detail: 'Talk with your family',
    icon: '📞',
    tone: 'primary',
  },
]

export default function RemindersPage({ onNavigate }) {
  const [reminders, setReminders] = useState(initialReminders)
  const [showAddForm, setShowAddForm] = useState(false)

  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    detail: '',
  })

  const toggleReminder = (id) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
            }
          : reminder
      )
    )
  }

  const handleAddReminder = (event) => {
    event.preventDefault()

    if (!newReminder.title || !newReminder.time) {
      return
    }

    const reminder = {
      id: Date.now(),
      title: newReminder.title,
      time: newReminder.time,
      detail:
        newReminder.detail || 'Personal reminder',
      icon: '🔔',
      tone: 'primary',
      completed: false,
    }

    setReminders((current) => [...current, reminder])

    setNewReminder({
      title: '',
      time: '',
      detail: '',
    })

    setShowAddForm(false)
  }

  const completedCount = reminders.filter(
    (reminder) => reminder.completed
  ).length

  return (
    <div className="page reminders-page">

      {/* PAGE HEADER */}

      <section className="page-card reminders-header">

        <div>
          <span className="eyebrow">
            TODAY
          </span>

          <h2>
            Your Reminders
          </h2>

          <p>
            Here are the things you may want to
            remember today.
          </p>
        </div>

        <div className="reminder-progress">

          <strong>
            {completedCount}/{reminders.length}
          </strong>

          <span>
            completed
          </span>

        </div>

      </section>


      {/* NEXT REMINDER */}

      <section className="next-reminder-card">

        <div className="next-reminder-icon">
          🔔
        </div>

        <div className="next-reminder-content">

          <span>
            NEXT REMINDER
          </span>

          <strong>
            {reminders.find(
              (reminder) => !reminder.completed
            )?.title || 'All done!'}
          </strong>

          <p>
            {reminders.find(
              (reminder) => !reminder.completed
            )?.time || 'You have completed everything for today.'}
          </p>

        </div>

      </section>


      {/* REMINDER LIST */}

      <section className="page-card">

        <div className="section-header">

          <div>
            <h2>
              Today's plan
            </h2>

            <span className="pill-tag">
              {reminders.length} reminders
            </span>
          </div>

        </div>


        <div className="reminders-list">

          {reminders.map((reminder) => (

            <div
              key={reminder.id}
              className={`reminder-item ${
                reminder.completed
                  ? 'completed'
                  : ''
              }`}
            >

              <div
                className={`reminder-icon ${reminder.tone}`}
              >
                {reminder.icon}
              </div>


              <div className="reminder-content">

                <span className="reminder-label">
                  {reminder.title}
                </span>

                <strong className="reminder-time">
                  {reminder.time}
                </strong>

                <p>
                  {reminder.detail}
                </p>

              </div>


              <button
                className={`reminder-done-button ${
                  reminder.completed
                    ? 'done'
                    : ''
                }`}
                onClick={() =>
                  toggleReminder(reminder.id)
                }
                aria-label={
                  reminder.completed
                    ? `Mark ${reminder.title} as not done`
                    : `Mark ${reminder.title} as done`
                }
              >
                {reminder.completed ? '✓' : '○'}
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ADD REMINDER */}

      <section className="page-card add-reminder-card">

        {!showAddForm ? (

          <button
            className="add-reminder-button"
            onClick={() =>
              setShowAddForm(true)
            }
          >
            <span>＋</span>

            <div>
              <strong>
                Add a Reminder
              </strong>

              <small>
                Create a personal reminder
              </small>
            </div>

          </button>

        ) : (

          <form
            className="reminder-form"
            onSubmit={handleAddReminder}
          >

            <div className="section-header">

              <h2>
                New Reminder
              </h2>

            </div>


            <label>
              What should we remember?
              <input
                type="text"
                placeholder="Example: Take medicine"
                value={newReminder.title}
                onChange={(event) =>
                  setNewReminder({
                    ...newReminder,
                    title: event.target.value,
                  })
                }
              />
            </label>


            <label>
              What time?
              <input
                type="time"
                value={newReminder.time}
                onChange={(event) =>
                  setNewReminder({
                    ...newReminder,
                    time: event.target.value,
                  })
                }
              />
            </label>


            <label>
              Extra details
              <input
                type="text"
                placeholder="Example: Take one tablet"
                value={newReminder.detail}
                onChange={(event) =>
                  setNewReminder({
                    ...newReminder,
                    detail: event.target.value,
                  })
                }
              />
            </label>


            <div className="reminder-form-actions">

              <button
                type="submit"
                className="action-button primary"
              >
                Save Reminder
              </button>

              <button
                type="button"
                className="reminder-cancel-button"
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                Cancel
              </button>

            </div>

          </form>

        )}

      </section>


      {/* HOME BUTTON */}

      <ActionButton
        onClick={() => onNavigate('home')}
      >
        Return Home
      </ActionButton>

    </div>
  )
}