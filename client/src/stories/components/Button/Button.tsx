import './button.css'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: () => void

  /**
   * Button Icon
   */
  icon?: React.ReactNode
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  icon,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  const classes = `storybook-button ${mode} storybook-button--${size} ${
    icon ? 'search_icon-container' : ''
  }`
  return (
    <button
      type="button"
      className={classes}
      style={{ backgroundColor }}
      {...props}
    >
      {icon ? <span className="search_icon">{icon}</span> : label}
    </button>
  )
}
