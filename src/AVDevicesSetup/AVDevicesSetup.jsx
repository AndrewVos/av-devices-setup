import useCookie from 'react-use-cookie'
import DeviceSetup from '../DeviceSetup'
import DeviceError from './DeviceError'
import { cookieGetDevices } from '../helpers'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param requiredDevices - [String] of device types, e.g. ['audioinput', 'videoinput', ...]
 * @param avDevices - Object { audioinput: deviceConfig, ... }
 * @param onChange - Function, runs every time a new device is selected
 * @param persist - Boolean, sets whether setup is stored and retrieved from cookie
 * @param options - Object { styles: { soundmeterColor: '#xxxxxx' } }
 * @returns {JSX.Element}
 * @constructor
 */
const AVDevicesSetup = ({ requiredDevices, avDevices, onChange, persist, options }) => {
  const [configuredDevices, setConfiguredDevices] = useState(avDevices || [])
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

  /** Runs every time a device is selected within a DeviceSetup component */
  const onDeviceSelected = (deviceConfig, error) => {
    if (error || !deviceConfig) {
      setDeviceError(error)
    } else {
      setConfiguredDevices(
        configuredDevices
          .filter((item) => item.device.kind !== deviceConfig.device.kind)
          .concat([deviceConfig])
      )
    }
  }

  return (
    <div className="avds-card">
      <div>video feed</div>
      <div>signal monitor</div>
      <div>device selection</div>
      <div>audio testing</div>
    </div>
  )
}

export default AVDevicesSetup
