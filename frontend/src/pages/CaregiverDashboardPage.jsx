import ActionButton from '../components/ActionButton'

const activities = [
  {
    title: 'Memory Game',
    detail: 'Completed today',
    icon: '🧠',
    status: 'Completed',
  },
  {
    title: 'Sequence Memory',
    detail: 'Completed today',
    icon: '🔢',
    status: 'Completed',
  },
  {
    title: 'Object Recall',
    detail: 'Not completed',
    icon: '👀',
    status: 'Pending',
  },
]

const reminders = [
  {
    title: 'Medication',
    time: '9:00 AM',
    detail: 'Blood pressure tablet',
    icon: '💊',
  },
  {
    title: 'Drink Water',
    time: '11:00 AM',
    detail: '1 glass of water',
    icon: '💧',
  },
  {
    title: 'Family Check-in',
    time: '6:00 PM',
    detail: 'Talk with family',
    icon: '📞',
  },
]

export default function CaregiverDashboardPage({ onNavigate }) {
  return (
    <div className="page caregiver-page">

      {/* Header */}
      <section className="page-card caregiver-header">
        <div>
          <p className="eyebrow">CAREGIVER VIEW</p>
          <h2>Maria's Care Dashboard</h2>
          <p>
            A simple overview of today's wellbeing and activities.
          </p>
        </div>

        <div className="care-status">
          <span className="care-status-dot">●</span>
          <strong>Doing well</strong>
        </div>
      </section>

      {/* Quick overview */}
      <section className="caregiver-overview">

        <div className="care-overview-card">
          <span className="care-overview-icon">🧠</span>
          <div>
            <span>Cognitive Progress</span>
            <strong>72%</strong>
            <small>Today's progress</small>
          </div>
        </div>

        <div className="care-overview-card">
          <span className="care-overview-icon">💊</span>
          <div>
            <span>Medication</span>
            <strong>1 / 2</strong>
            <small>Doses completed</small>
          </div>
        </div>

        <div className="care-overview-card">
          <span className="care-overview-icon">💧</span>
          <div>
            <span>Hydration</span>
            <strong>4 glasses</strong>
            <small>Today's intake</small>
          </div>
        </div>

      </section>

      {/* Alerts */}
      <section className="page-card caregiver-alert">
        <div className="caregiver-alert-icon">
          🔔
        </div>

        <div>
          <span className="status-label">NEXT REMINDER</span>
          <h3>Medication at 9:00 AM</h3>
          <p>Blood pressure tablet</p>
        </div>
      </section>

      {/* Cognitive activity */}
      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Today's Activities</h2>
            <span className="pill-tag">3 activities</span>
          </div>
        </div>

        <div className="care-activity-list">
          {activities.map((activity) => (
            <div
              className="care-activity"
              key={activity.title}
            >
              <div className="care-activity-icon">
                {activity.icon}
              </div>

              <div className="care-activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.detail}</p>
              </div>

              <span
                className={`care-activity-status ${
                  activity.status === 'Completed'
                    ? 'completed'
                    : 'pending'
                }`}
              >
                {activity.status === 'Completed'
                  ? '✓ Done'
                  : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming reminders */}
      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Upcoming Reminders</h2>
            <span className="pill-tag">Today</span>
          </div>
        </div>

        <div className="care-reminder-list">
          {reminders.map((reminder) => (
            <div
              className="care-reminder"
              key={reminder.title}
            >
              <div className="care-reminder-icon">
                {reminder.icon}
              </div>

              <div className="care-reminder-content">
                <h3>{reminder.title}</h3>
                <strong>{reminder.time}</strong>
                <p>{reminder.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Caregiver note */}
      <section className="page-card caregiver-note">
        <div className="caregiver-note-icon">
          💚
        </div>

        <div>
          <h3>Caregiver Note</h3>
          <p>
            Maria has completed her morning cognitive activities.
            Remember to check the next medication reminder.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <ActionButton
        onClick={() => onNavigate('home')}
        fullWidth
      >
        Return Home
      </ActionButton>

    </div>
  )
}