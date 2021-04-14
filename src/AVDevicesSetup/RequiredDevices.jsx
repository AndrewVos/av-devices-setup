import DeviceTypeIcon from '../DeviceSetup/DeviceTypeIcon'
import RrButton from './RrButton'

// eslint-disable-next-line no-unused-vars
const RequiredDevices = ({
  configuredDevices,
  requiredDevices,
  onSelectDevice,
  onComplete,
}) => {
  const [complete, setComplete] = useState(false)

  const validate = () => {
    setComplete(
      requiredDevices.every((item) =>
        configuredDevices.map((device) => device.device.kind).includes(item)
      )
    )
  }

  useEffect(validate, [configuredDevices])

  return (
    <div className="box clear">
      <div className="row justify-center">
        {requiredDevices.map((device) => (
          <div className="column horizontal-padding" key={device}>
            <a href="#" className="icon-button" onClick={() => onSelectDevice(device)}>
              <DeviceTypeIcon type={device} />
            </a>
          </div>
        ))}
      </div>
      <div className="row justify-flex-end padded">
        <RrButton
          title="finish setup"
          type="primary"
          disabled={!complete}
          onClick={() => onComplete(configuredDevices)}
        />
      </div>
    </div>
  )
}

export default RequiredDevices
