import ActionButton from '../components/ActionButton'

export default function ProfilePage({ onNavigate }) {
  return (
    <div className="page profile-page">

      {/* Profile header */}
      <section className="page-card profile-hero">
        <div className="profile-large-avatar">
          M
        </div>

        <div className="profile-hero-info">
          <p className="eyebrow">MY PROFILE</p>
          <h2>Maria</h2>
          <p>MindCare member</p>
        </div>

        <span className="profile-status">
          ● Active
        </span>
      </section>

      {/* Personal information */}
      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Personal Information</h2>
            <span className="pill-tag">My details</span>
          </div>
        </div>

        <div className="profile-details">

          <div className="profile-detail-row">
            <span className="profile-detail-icon">👤</span>

            <div>
              <span className="profile-detail-label">Name</span>
              <strong>Maria</strong>
            </div>
          </div>

          <div className="profile-detail-row">
            <span className="profile-detail-icon">🎂</span>

            <div>
              <span className="profile-detail-label">Age</span>
              <strong>72 years</strong>
            </div>
          </div>

          <div className="profile-detail-row">
            <span className="profile-detail-icon">📞</span>

            <div>
              <span className="profile-detail-label">Family Contact</span>
              <strong>Available</strong>
            </div>
          </div>

        </div>
      </section>

      {/* Accessibility */}
      <section className="page-card">
        <div className="section-header">
          <div>
            <h2>Accessibility</h2>
            <span className="pill-tag">Comfort settings</span>
          </div>
        </div>

        <div className="profile-settings">

          <div className="profile-setting">
            <div>
              <h3>🔊 Voice Guidance</h3>
              <p>Use spoken instructions during activities.</p>
            </div>

            <span className="setting-enabled">
              On
            </span>
          </div>

          <div className="profile-setting">
            <div>
              <h3>🔤 Large Text</h3>
              <p>Keep important information easy to read.</p>
            </div>

            <span className="setting-enabled">
              On
            </span>
          </div>

          <div className="profile-setting">
            <div>
              <h3>🔔 Gentle Reminders</h3>
              <p>Receive simple reminders for daily activities.</p>
            </div>

            <span className="setting-enabled">
              On
            </span>
          </div>

        </div>
      </section>

      {/* Caregiver connection */}
      <section className="page-card caregiver-profile-card">

        <div className="caregiver-profile-icon">
          👩‍⚕️
        </div>

        <div>
          <p className="status-label">CAREGIVER CONNECTION</p>

          <h3>Family caregiver</h3>

          <p>
            Your caregiver can view your daily activities,
            reminders, and progress.
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