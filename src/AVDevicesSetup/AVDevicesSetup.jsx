import useCookie from 'react-use-cookie'
import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { validateConfig } from '../helpers'
import { DEFAULT_OPTIONS } from '../constants'
import { AVDeviceContext } from './AVDeviceProvider'
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
  initConfig,
  onChange,
  persist,
  options = DEFAULT_OPTIONS,
}) => {
  const [cookieConfig, setCookieConfig] = useCookie('avDevices')
  const { avData } = useContext(AVDeviceContext)

  /** Send update to parent */
  /** (If persist) Save configuration to cookie on change */
  useEffect(() => {
    if (validateConfig(requiredDevices, avData.configuredDevices)) {
      if (onChange) onChange(avData.configuredDevices)
      if (persist) setCookieConfig(JSON.stringify(avData.configuredDevices))
    }
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
          <VideoFeed
            device={
              avData?.configuredDevices.filter(
                (device) => device.kind === 'videoinput'
              )[0]
            }
          />
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
      <DeviceSelection preselect={initConfig || (persist && JSON.parse(cookieConfig))} />
      {requiredDevices.includes('audioinput') && (
        <Grid item>
          <div>controls</div>
        </Grid>
      )}
    </Grid>
  )
}

export default AVDevicesSetup
