import micSettingsImg from '../assets/microphone-settings.svg'
import webcamImg from '../assets/webcam.svg'

const DeviceTypeIcon = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'audioinput':
        return <img src={micSettingsImg} alt={type} />
      case 'videoinput':
        return <img src={webcamImg} alt={type} />
    }
  }
  return <div className="icon square-big">{getIcon()}</div>
}

export default DeviceTypeIcon
