import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ClearIcon from '@material-ui/icons/Clear'
import PublishIcon from '@material-ui/icons/Publish'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import classNames from 'classnames'
import loadingSvg from '../assets/circ-loading.svg'
import loadingSvgWhite from '../assets/circ-loading-white.svg'

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
        startIcon = <FiberManualRecordIcon />
        break
      case 'cancel':
        startIcon = <ClearIcon />
        break
      case 'upload':
        startIcon = <PublishIcon />
        break
      case 'back':
        startIcon = <ArrowBackIcon />
    }
  }
  return (
    <a
      onClick={onClick}
      className={classNames('button', 'rr-button', type, { disabled })}
      style={style}
    >
      {icon && !loading && startIcon}
      {loading ? (
        <img
          src={type === 'primary' ? loadingSvgWhite : loadingSvg}
          className="svg"
          alt="loading"
        />
      ) : (
        toTitleCase(title)
      )}
    </a>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'cancel', '']),
}

export default Button
export { toTitleCase }
