export default function StatusCard({
  title,
  value,
  detail,
  icon,
  tone = 'primary',
}) {
  return (
    <article className={`status-card ${tone}`}>
      <div className="status-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="status-copy">
        <p className="status-label">{title}</p>
        <p className="status-value">{value}</p>
        {detail ? <p className="status-detail">{detail}</p> : null}
      </div>
    </article>
  )
}
