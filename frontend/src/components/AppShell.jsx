export default function AppShell({ navItems, activeView, onNavigate, children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="MindCare brand">
          <div className="brand-mark" aria-hidden="true">
            M
          </div>
          <div>
            <p className="brand-kicker">Care companion</p>
            <h1>MindCare</h1>
          </div>
        </div>

        <button
          type="button"
          className="assistant-pill"
          onClick={() => onNavigate('voice')}
        >
          🎙️ Voice help
        </button>
      </header>

      <main className="page-body">{children}</main>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-button ${activeView === item.id ? 'active' : ''}`}
            aria-current={activeView === item.id ? 'page' : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
