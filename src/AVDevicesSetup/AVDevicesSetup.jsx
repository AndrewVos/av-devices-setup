import useCookie from 'react-use-cookie'
import DeviceSetup from '../DeviceSetup'
import DeviceError from './DeviceError'
import { getMediaDevicesList } from '../web_audio'
import { cookieGetDevices } from '../helpers'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param show - Display component backdrop element
 * @param requiredDevices - [String] of device types, e.g. ['audioinput', 'videoinput', ...]
 * @param avDevices - Object { audioinput: deviceConfig, ... }
 * @param onChange - Function, runs every time a new device is selected
 * @returns {JSX.Element}
 * @constructor
 */
const AVDevicesSetup = ({ show, requiredDevices, avDevices, onChange, persist }) => {
  const multiple = requiredDevices?.length > 1
  const [configuredDevices, setConfiguredDevices] = useState(avDevices || [])
  const [currentDeviceType, setCurrentDeviceType] = useState(
    multiple ? null : requiredDevices[0]
  )
  const [savedConfig, setSavedConfig] = useCookie('avDevices')
  const [deviceError, setDeviceError] = useState()

  /** Lookup cookie to see if device config stored there */
  useEffect(() => {
    if (persist && !avDevices && savedConfig)
      cookieGetDevices(savedConfig, onDeviceSelected)
  }, [savedConfig])

  /** Save configuration to cookie on unmount */
  useEffect(() => {
    return () => {
      if (persist) setSavedConfig(JSON.stringify(configuredDevices))
    }
  }, [])

  /** TEMP: load first required device */
  useEffect(() => {
    setCurrentDeviceType(requiredDevices[0])
  }, [])

  /** Runs every time a device is selected within a DeviceSetup component */
  const onDeviceSelected = (deviceConfig, error) => {
    if (error || !deviceConfig) {
      if (multiple) setCurrentDeviceType(null)
      setDeviceError(error)
    } else {
      setConfiguredDevices(
        configuredDevices
          .filter((item) => item.device.kind !== deviceConfig.device.kind)
          .concat([deviceConfig])
      )
      if (multiple) setCurrentDeviceType(null)
    }
  }

  return (
    show && (
      <div className="avds-card">
        {deviceError ? (
          <DeviceError
            error={deviceError.toString()}
            onClear={() => setDeviceError(null)}
          />
        ) : (
          <DeviceSetup
            deviceType={currentDeviceType}
            onComplete={onDeviceSelected}
            configuredDevice={
              configuredDevices.filter(
                (config) => config.device.kind === currentDeviceType
              )[0]
            }
          />
        )}
      </div>
    )
  )
}

export default AVDevicesSetup
