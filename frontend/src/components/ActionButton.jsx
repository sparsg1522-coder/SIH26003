export default function ActionButton({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = '',
}) {
  const classes = ['action-button', variant, fullWidth ? 'full-width' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
