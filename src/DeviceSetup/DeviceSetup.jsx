import AudioInputSetup from '../AudioInputSetup/AudioInputSetup'
import VideoInputSetup from '../VideoInputSetup/VideoInputSetup'
import RrButton from '../AVDevicesSetup/RrButton'
import { validateDeviceConfig } from '../helpers'

const DeviceSetup = ({ deviceType, onComplete, configuredDevice }) => {
  const [valid, setValid] = useState(false)
  const [busy, setBusy] = useState(false)
  const [deviceConfig, setDeviceConfig] = useState(null)

  /** Load in existing device config */
  useEffect(() => {
    if (configuredDevice) {
      setDeviceConfig(configuredDevice)
    }
  }, [])

  useEffect(() => {
    if (deviceConfig) {
      if (validateDeviceConfig(deviceConfig)) setValid(true)
    }
  }, [deviceConfig])

  const getSetupControls = () => {
    switch (deviceType) {
      case 'audioinput':
        return (
          <AudioInputSetup
            onChange={onChange}
            onFail={onComplete}
            onBusy={(b) => setBusy(b)}
            inputConfig={deviceConfig || configuredDevice}
          />
        )
      case 'videoinput':
        return (
          <VideoInputSetup
            onChange={onChange}
            onFail={onComplete}
            onBusy={(b) => setBusy(b)}
            inputConfig={deviceConfig || configuredDevice}
          />
        )
    }
  }

  const onChange = (newDeviceConfig) => {
    setDeviceConfig(newDeviceConfig)
  }

  return (
    <div className="box clear">
      <div className="row">
        <div className="column remaining">
          <div className="avds-controls-card">{getSetupControls()}</div>
        </div>
      </div>
    </div>
  )
}

export default DeviceSetup
