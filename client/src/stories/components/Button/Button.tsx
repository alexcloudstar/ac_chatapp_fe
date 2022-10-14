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

  classes?: string
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
  classes,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  const localClasses = `storybook-button ${mode} storybook-button--${size} ${
    icon ? 'search_icon-container' : ''
  } ${classes ? classes : ''}`

  return (
    <button
      type="button"
      className={localClasses}
      style={{ backgroundColor }}
      {...props}
    >
      {icon ? <span className="search_icon">{icon}</span> : label}
    </button>
  )
}
