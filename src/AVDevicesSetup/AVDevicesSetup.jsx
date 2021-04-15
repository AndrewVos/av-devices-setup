import useCookie from 'react-use-cookie'
import { cookieGetDevices } from '../helpers'
import { DEFAULT_OPTIONS } from '../constants'
import { AVDeviceContext } from './AVDeviceProvider'
import { useContext } from 'react'
import AudioInputSelect from '../AudioInputSetup/AudioInputSelect'
import { Grid } from '@material-ui/core'
import VideoFeed from './VideoFeed'
import AudioInputVolumeMonitor from '../AudioInputSetup/AudioInputVolumeMonitor'
import DeviceSelection from './DeviceSelection'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param requiredDevices - [String] of device types, e.g. ['audioinput', 'videoinput', ...]
 * @param avDevices - Object { audioinput: deviceConfig, ... }
 * @param onChange - Function, runs every time a new device is selected
 * @param persist - Boolean, sets whether setup is stored and retrieved from cookie
 * @param options - Object { styles: { containerPadding: 16, soundmeterColor: '#00FF00' } }
 * @returns {JSX.Element}
 * @constructor
 */
const AVDevicesSetup = ({
  requiredDevices,
  avDevices,
  onChange,
  persist,
  options = DEFAULT_OPTIONS,
}) => {
  const [configuredDevices, setConfiguredDevices] = useState(avDevices || [])
  const [savedConfig, setSavedConfig] = useCookie('avDevices')
  const [deviceError, setDeviceError] = useState()

  const { avData, setAvData } = useContext(AVDeviceContext)

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
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ padding: options.containerPadding, maxWidth: 500 }}
    >
      {requiredDevices.includes('videoinput') && (
        <Grid item>
          <VideoFeed />
        </Grid>
      )}
      {requiredDevices.includes('audioinput') && (
        <Grid item>
          <AudioInputVolumeMonitor
            barColor={options.soundmeterColor}
            device={
              configuredDevices.filter(
                (device) => device?.device?.kind === 'audioinput'
              )[0]
            }
          />
        </Grid>
      )}
      <DeviceSelection />
      <Grid item>
        <div>advanced</div>
      </Grid>
      <Grid item>
        <div>errors</div>
      </Grid>
      {requiredDevices.includes('audioinput') && (
        <Grid item>
          <div>controls</div>
        </Grid>
      )}
    </Grid>
  )
}

export default AVDevicesSetup
