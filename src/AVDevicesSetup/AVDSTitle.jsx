import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const getTitle = (deviceType) => {
  switch (deviceType) {
    case 'audioinput':
      return 'Set up your microphone'
    case 'videoinput':
      return 'Set up your webcam'
    default:
      return 'Setup your devices'
  }
}

const AVDSTitle = ({ deviceType = 'Device Setup', onClose }) => {
  return (
    <div className="box no-padding align-center avds-card-title">
      <h3 className="text-center full-width">{getTitle(deviceType)}</h3>
      <IconButton aria-label="close" className="avds-card-close-button" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default AVDSTitle
