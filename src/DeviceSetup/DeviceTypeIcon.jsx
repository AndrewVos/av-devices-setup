import micSettingsImg from '../assets/microphone-settings.svg'

const DeviceTypeIcon = ({ type = 'audioinput' }) => {
  return (
    <div className="icon square-big">
      <img src={micSettingsImg} alt={type} />
    </div>
  )
}

export default DeviceTypeIcon
