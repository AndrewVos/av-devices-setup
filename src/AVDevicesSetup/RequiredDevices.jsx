import DeviceTypeButton from '../DeviceSetup/DeviceTypeButton'
import DeviceTypeIcon from '../DeviceSetup/DeviceTypeIcon'

// eslint-disable-next-line no-unused-vars
const RequiredDevices = ({ configuredDevices, requiredDevices, onSelectDevice }) => {
  return (
    <div className="box clear">
      <div className="row justify-center">
        {requiredDevices.map((device) => (
          <div className="column horizontal-padding" key={device}>
            <a href="#" className="icon-button" onClick={() => onSelectDevice(device)}>
              <DeviceTypeIcon type={device} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequiredDevices
