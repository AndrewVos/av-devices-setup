import useCookie from 'react-use-cookie'
import { cookieGetDevices } from '../helpers'
import { DEFAULT_OPTIONS } from '../constants'
import { AVDeviceContext } from './AVDeviceProvider'
import { useContext, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
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
  preConfigured,
  onChange,
  persist,
  options = DEFAULT_OPTIONS,
}) => {
  const [savedConfig, setSavedConfig] = useCookie('avDevices')
  const [deviceError, setDeviceError] = useState()

  const { avData, setAvData, upsertDevice } = useContext(AVDeviceContext)

  /** Lookup cookie to see if device config stored there */
  useEffect(() => {
    if (persist && !preConfigured && savedConfig)
      cookieGetDevices(savedConfig, upsertDevice)
  }, [savedConfig])

  /** Save configuration to cookie on unmount */
  useEffect(() => {
    return () => {
      if (persist) setSavedConfig(JSON.stringify(avData.configuredDevices))
    }
  }, [])

  /** Save initial data to context */
  useEffect(() => {
    setAvData({ ...avData, requiredDevices })
  }, [])

  useEffect(() => {
    console.log(avData)
  }, [avData])

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      style={{ padding: options.containerPadding, width: isMobile ? 300 : 400 }}
    >
      {requiredDevices.includes('videoinput') && (
        <Grid item>
          <VideoFeed />
        </Grid>
      )}
      {requiredDevices.includes('audioinput') && (
        <Grid item style={{ paddingTop: 10 }}>
          <AudioInputVolumeMonitor
            barColor={options.soundmeterColor}
            device={
              avData?.configuredDevices?.filter(
                (device) => device?.kind === 'audioinput'
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
