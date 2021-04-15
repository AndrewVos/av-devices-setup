import { LinearProgress } from '@material-ui/core'
import { reduceMediaDeviceInfo } from '../helpers'
import { getMediaDevicesList, getPermissions } from '../web_audio'

const AudioInputSelect = ({ onChange, onFail, inputConfig }) => {
  const [selected, setSelected] = useState()
  const [available, setAvailable] = useState([])

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList({ type: 'audio', direction: 'in' })
    setAvailable(mediaDevices.map((mediaDevice) => reduceMediaDeviceInfo(mediaDevice)))
    return mediaDevices
  }

  /** Ensure permissions are available & default device available */
  // TODO: really this should only fail if audio/video permission is denied by the user
  // at the moment, it also fails if the default (first) device is in use elsewhere
  // a more intelligent handler would allow the default device to fail and load the next one
  const init = async () => {
    const mediaStream = await getPermissions({ video: false, audio: true })
    if (!mediaStream.id) {
      onFail(null, mediaStream)
      return false
    } else return true
  }

  /** Initialise, get available audio devices and set USB plug listener */
  useEffect(() => {
    init().then((result) => {
      if (result) getAvailableDevices()
      navigator.mediaDevices.addEventListener('devicechange', () => {
        getAvailableDevices().then((mediaDevices) => {
          setSelected(mediaDevices[0])
        })
      })
    })
  }, [])

  /** If device already configured, load values into controls */
  useEffect(() => {
    if (inputConfig && !_.isEmpty(available)) {
      setSelected(
        available.filter((device) => device.deviceId === inputConfig.device.deviceId)[0]
      )
    } else {
      setSelected(available[0])
    }
  }, [available, inputConfig])

  const onSelectDevice = (deviceId) => {
    setSelected(available.filter((device) => device.deviceId === deviceId)[0])
    onChange({ device: selected })
  }

  return (
    <div>
      <p className="input-label">Microphone</p>
      <select
        className="block"
        disabled={_.isEmpty(available)}
        onChange={(syntheticEvent) =>
          onSelectDevice(syntheticEvent.nativeEvent.target.value)
        }
      >
        {available.map((item) => (
          <option value={item.deviceId}>{item.label}</option>
        ))}
      </select>
      {_.isEmpty(available) && (
        <LinearProgress style={{ marginTop: -5, borderRadius: '0 0 4px 4px' }} />
      )}
    </div>
  )
}

export default AudioInputSelect
