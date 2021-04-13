import DeviceTypeIcon from './DeviceTypeIcon'
import AudioInputSetup from '../AudioInputSetup/AudioInputSetup'
import RrButton from "../AVDevicesSetup/RrButton";
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
    }
  }

  const onChange = (newDeviceConfig) => {
    setDeviceConfig(newDeviceConfig)
  }

  return (
    <div className="box clear">
      <div className="row">
        <div className="column no-margin">
          <DeviceTypeIcon type={deviceType} />
        </div>
        <div className="column remaining">
          <div className="avds-controls-card">{getSetupControls()}</div>
        </div>
      </div>
      <div className="row justify-flex-end">
        <RrButton
          title="save"
          type="primary"
          disabled={!valid || busy}
          onClick={() => onComplete(deviceConfig)}
        />
      </div>
    </div>
  )
}

export default DeviceSetup
