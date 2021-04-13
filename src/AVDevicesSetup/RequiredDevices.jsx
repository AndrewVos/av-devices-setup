import DeviceTypeButton from '../DeviceSetup/DeviceTypeButton'

// eslint-disable-next-line no-unused-vars
const RequiredDevices = ({ configuredDevices, requiredDevices }) => {
  return (
    <div>
      <div>Displays icon buttons of required devices</div>
      <div>
        <DeviceTypeButton />
      </div>
    </div>
  )
}

export default RequiredDevices
