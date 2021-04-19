import useCookie from 'react-use-cookie'
import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { DEFAULT_OPTIONS } from './constants'
import { AVDeviceContext } from './AVDeviceProvider'
import VideoFeed from '../VideoInputFeed/VideoFeed'
import AudioInputVolumeMonitor from '../AudioInputVolumeMonitor/AudioInputVolumeMonitor'
import DeviceSelection from './DeviceSelection'
import { AudioInputTestContainer } from '../AudioInputTest'
import { validateConfig } from './helpers'

/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param requiredDevices - [String] of media device types, e.g. ['audioinput', 'videoinput', ...]
 * @param initConfig - Array of MediaDevices [{ deviceId, etc... }]
 * @param onChange - Function, runs every time a new device is selected
 * @param persist - Boolean, sets whether setup is stored and retrieved from cookie
 * @param userOptions - Object, params can be found in ./constants#DEFAULT_OPTIONS }
 * @returns {JSX.Element}
 * @constructor
 */
const AVDevicesSetup = ({
  requiredDevices,
  initConfig,
  onChange,
  persist,
  userOptions = {},
}) => {
  const [cookieConfig, setCookieConfig] = useCookie('avDevices')
  const { avData, setAvData } = useContext(AVDeviceContext)
  const options = _.merge(DEFAULT_OPTIONS, userOptions)

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
        padding: options.container.padding,
        width: options.container.width[isMobile ? 'mobile' : 'desktop'],
        background: options.container.background,
      }}
    >
      {requiredDevices.includes('videoinput') && (
        <Grid item>
          <VideoFeed
            device={getDevice('videoinput')}
            maxHeight={options.video.maxHeight}
          />
        </Grid>
      )}
      {requiredDevices.includes('audioinput') && (
        <Grid item style={{ paddingTop: 10 }}>
          <AudioInputVolumeMonitor
            barColor={options?.soundMeter?.color}
            device={getDevice('audioinput')}
          />
        </Grid>
      )}
      <DeviceSelection preselect={initConfig || (persist && getCookieConfig())} />
      {requiredDevices.includes('audioinput') && (
        <Grid item>
          <AudioInputTestContainer
            device={getDevice('audioinput')}
            expanded={options?.audioTest?.expanded}
            style={{ background: options.audioTest.background }}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default AVDevicesSetup
