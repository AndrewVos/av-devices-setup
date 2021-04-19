import useCookie from 'react-use-cookie'
import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { DEFAULT_OPTIONS } from './constants'
import { AVDeviceContext } from './AVDeviceProvider'
import VideoFeed from '../VideoInputFeed/VideoFeed'
import AudioInputVolumeMonitor from '../AudioInputVolumeMonitor/AudioInputVolumeMonitor'
import DeviceSelection from './DeviceSelection'
import AudioInputTestContainer from '../AudioInputTest/AudioInputTestContainer'
import { validateConfig } from './helpers'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param requiredDevices - [String] of media device types, e.g. ['audioinput', 'videoinput', ...]
 * @param initConfig - Array of MediaDevices [{ deviceId, etc... }]
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
  const { avData, setAvData } = useContext(AVDeviceContext)

  useEffect(() => {
    setAvData({ ...avData, requiredDevices })
  }, [])

  /** Send update to parent */
  /** (If persist) Save configuration to cookie on change */
  useEffect(() => {
    if (validateConfig(requiredDevices, avData.configuredDevices)) {
      if (onChange) onChange(avData.configuredDevices)
      if (persist) setCookieConfig(JSON.stringify(avData.configuredDevices))
    }
  }, [avData])

  function getDevice(kind) {
    return avData?.configuredDevices.filter((device) => device.kind === kind)[0]
  }

  function getCookieConfig() {
    return !!cookieConfig && JSON.parse(cookieConfig)
  }

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      style={{
        padding: options.containerPadding,
        width: isMobile ? 300 : 400,
        background: 'white',
      }}
    >
      {requiredDevices.includes('videoinput') && (
        <Grid item>
          <VideoFeed device={getDevice('videoinput')} />
        </Grid>
      )}
      {requiredDevices.includes('audioinput') && (
        <Grid item style={{ paddingTop: 10 }}>
          <AudioInputVolumeMonitor
            barColor={options.soundmeterColor}
            device={getDevice('audioinput')}
          />
        </Grid>
      )}
      <DeviceSelection preselect={initConfig || (persist && getCookieConfig())} />
      {requiredDevices.includes('audioinput') && (
        <Grid item>
          <AudioInputTestContainer device={getDevice('audioinput')} />
        </Grid>
      )}
    </Grid>
  )
}

export default AVDevicesSetup
