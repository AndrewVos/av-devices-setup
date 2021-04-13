import Backdrop from '@material-ui/core/Backdrop'
import useCookie from 'react-use-cookie'
import AVDSTitle from './AVDSTitle'
import RequiredDevices from './RequiredDevices'
import DeviceSetup from '../DeviceSetup'
import { getMediaDevicesList } from '../helpers'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param show - Display component backdrop element
 * @param requiredDevices - [String] of device types, e.g. ['audioinput', 'videoinput', ...]
 * @param avDevices - Object { audioinput: deviceConfig, ... }
 * @param onComplete
 * @returns {JSX.Element}
 * @constructor
 */
const AVDevicesSetup = ({ show, requiredDevices, avDevices, onComplete, onCancel }) => {
  const multiple = requiredDevices?.length > 1
  const [configuredDevices, setConfiguredDevices] = useState(avDevices || [])
  const [currentDeviceType, setCurrentDeviceType] = useState(
    multiple ? null : requiredDevices[0]
  )
  const [userAvDevices, setUserAvDevices] = useCookie('avDevices')

  /** Lookup cookie to see if device config stored there */
  useEffect(() => {
    if (!avDevices && userAvDevices) {
      getMediaDevicesList().then((mediaDevices) => {
        JSON.parse(userAvDevices).forEach((config) => {
          if (
            mediaDevices
              .map((mediaDevice) => mediaDevice.deviceId)
              .includes(config.device.deviceId)
          ) {
            onDeviceConfigured(config)
          }
        })
      })
    }
  }, [userAvDevices])

  /** Fixes CSS document width flashing when show/hide component */
  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflow = show ? 'hidden' : 'scroll'
  }, [show])

  /** If requiredDevices has only one entry, returns configured devices to the parent component */
  /** If requiredDevices has multiple entries, shows the device selection component */
  useEffect(() => {
    const valid = requiredDevices.every((deviceType) =>
      configuredDevices.map((d) => d.device.kind).includes(deviceType)
    )
    if (valid && !multiple) {
      setUserAvDevices(JSON.stringify(configuredDevices))
      onComplete(configuredDevices)
    }
    if (valid && multiple) setCurrentDeviceType(null)
  }, [configuredDevices])

  /** Runs every time a device is configured within DeviceSetup component */
  const onDeviceConfigured = (deviceConfig, error) => {
    if (error || !deviceConfig) {
      // TODO: handle it
      console.error('Device setup failed for some reason')
    } else {
      setConfiguredDevices([deviceConfig])
    }
  }

  return (
    show && (
      <Backdrop open={show} classes={{ root: 'avds-backdrop' }}>
        <div className="avds-card">
          <AVDSTitle onClose={() => onCancel()} deviceType={currentDeviceType} />
          {currentDeviceType ? (
            <DeviceSetup
              deviceType={currentDeviceType}
              onComplete={onDeviceConfigured}
              configuredDevice={
                configuredDevices.filter(
                  (config) => config.device.kind === currentDeviceType
                )[0]
              }
            />
          ) : (
            <RequiredDevices {...{ configuredDevices, requiredDevices }} />
          )}
        </div>
      </Backdrop>
    )
  )
}

export default AVDevicesSetup
