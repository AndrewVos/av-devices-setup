import {
  getPermissions,
  getMediaDevicesList,
  reduceMediaDeviceInfo,
  getSupportedConstraints,
} from '../helpers'
import MuiSelect from "../AVDevicesSetup/MuiSelect";
import AudioInputTest from './AudioInputTest'
import AudioInputVolumeMonitor from './AudioInputVolumeMonitor'
import InputAdvice from '../DeviceSetup/InputAdvice'
import InputConstraints from '../DeviceSetup/InputConstraints'

const AUDIO_INPUT_ADVICE = {
  heading: 'How to make the most of your mic',
  listItems: [
    'Keep the mic still, and as close to your mouth as possible',
    'Hard surfaces reflect sound and make it harder to understand speech. Put\n' +
      '                some cushions / blankets on your desk or around your laptop: really - it\n' +
      '                helps!',
  ],
}

const AudioInputSetup = ({ onChange, onFail, onBusy, inputConfig }) => {
  const [selected, setSelected] = useState()
  const [constraints, setConstraints] = useState({})
  const [disableControls, setDisableControls] = useState(false)
  const [available, setAvailable] = useState([])

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList({ type: 'audio', direction: 'in' })
    setAvailable(mediaDevices.map((mediaDevice) => reduceMediaDeviceInfo(mediaDevice)))
    return mediaDevices
  }

  /** Ensure permissions are available */
  const init = async () => {
    const mediaStream = await getPermissions({ video: false, audio: true })
    if (!mediaStream) {
      onFail()
      return false
    } else return true
  }

  /** Initialise, get available audio devices and set USB plug listener */
  useEffect(() => {
    setConstraints(getSupportedConstraints(constraints))
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
      setConstraints(inputConfig.constraints)
      setSelected(
        available.filter((device) => device.deviceId === inputConfig.device.deviceId)[0]
      )
    } else {
      setSelected(available[0])
    }
  }, [available, inputConfig])

  /** Update parent component on parameter changes */
  useEffect(() => {
    if (!_.isEmpty(constraints) && !!selected) onChange({ device: selected, constraints })
  }, [selected, constraints])

  const onSelectDevice = (evt) => {
    const newDevice = evt.target.value
    setSelected(newDevice)
  }

  const onUpdateDeviceConstraints = (newConstraints) => {
    setConstraints(newConstraints)
  }

  const onTestChange = (update) => {
    setDisableControls(update?.testing)
    onBusy(update?.testing)
  }

  return (
    <div className="box no-padding no-border">
      <div className="row align-flex-end">
        <div className="column remaining space-right">
          <MuiSelect
            items={available}
            selected={selected}
            onChange={onSelectDevice}
            idKey="deviceId"
            disabled={disableControls}
          />
        </div>
        <div className="column remaining">
          <AudioInputTest
            device={selected}
            onChange={onTestChange}
            constraints={constraints}
          />
        </div>
      </div>
      <div className="row">
        <AudioInputVolumeMonitor device={selected} />
      </div>
      <div className="row justify-space-between" style={{ padding: '0 0 0 7px' }}>
        <InputConstraints
          constraints={constraints}
          disabled={disableControls}
          onChange={onUpdateDeviceConstraints}
        />
      </div>
      <div className="row avds-advice">
        <InputAdvice advice={AUDIO_INPUT_ADVICE} />
      </div>
    </div>
  )
}

export default AudioInputSetup
