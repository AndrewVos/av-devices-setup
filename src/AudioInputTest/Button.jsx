import classNames from 'classnames'
import AVIcon from './AVIcon'

const toTitleCase = (str) => {
  str = str.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}

/**
 *
 * @param title
 * @param type - null, 'reverse', 'cancel'
 * @param icon
 * @param onClick
 * @param muiProps
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({ title, type = '', icon, onClick, disabled, loading, style }) => {
  let startIcon
  if (icon) {
    switch (icon) {
      case 'record':
        startIcon = <AVIcon iconName="record" color="white" />
        break
      case 'cancel':
        startIcon = <AVIcon iconName="close" color="white" />
        break
    }
  }
  return (
    <a
      onClick={onClick}
      className={classNames('button', type, { disabled })}
      style={style}
    >
      {icon && !loading && startIcon}
      {toTitleCase(title)}
    </a>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'cancel', '']),
}

export default Button
export { toTitleCase }
