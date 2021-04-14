import {
  getPermissions,
  getMediaDevicesList,
  reduceMediaDeviceInfo,
  getSupportedConstraints,
} from '../helpers'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function VideoInputSetup({ onChange, onFail, onBusy, inputConfig }) {
  const [available, setAvailable] = useState(null)
  const [error, setError] = useState(null)
  const [stream, setStream] = useState(null)
  const [selected, setSelected_] = useState(null)
  const [constraints, setConstraints] = useState(null)

  /** Update parent component on parameter changes */
  useEffect(() => {
    if (!!selected) onChange({ device: selected, constraints })
  }, [selected])

  function stopMediaTracks() {
    stream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  function setSelected(deviceId) {
    if (stream !== null) {
      stopMediaTracks()
    }
    const newConstraints = {
      video: { deviceId: { exact: deviceId } },
      audio: false,
    }
    navigator.mediaDevices
      .getUserMedia(newConstraints)
      .then((stream) => {
        const video = document.getElementById('video-preview')
        setStream(stream)
        video.srcObject = stream
        return navigator.mediaDevices.enumerateDevices().then(function (devices) {
          devices.forEach(function (device) {
            if (device.deviceId === deviceId) {
              setSelected_(device)
              setConstraints(newConstraints)
              onChange({ device, constraints: newConstraints })
            }
          })
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList({ type: 'video', direction: 'in' })
    const reducedMediaDevices = mediaDevices.map((mediaDevice) =>
      reduceMediaDeviceInfo(mediaDevice)
    )

    setAvailable(reducedMediaDevices)
    setSelected(reducedMediaDevices[0].deviceId)
    return mediaDevices
  }

  /** Ensure permissions are available */
  const init = async () => {
    const mediaStream = await getPermissions({ video: true, audio: false })
    if (!mediaStream) {
      onFail()
      return false
    } else return true
  }

  /** Initialise, get available audio devices and set USB plug listener */
  useEffect(() => {
    init().then((result) => {
      if (result) getAvailableDevices()
      navigator.mediaDevices.addEventListener('devicechange', () => {
        getAvailableDevices().then((mediaDevices) => {
          setSelected(mediaDevices[0].deviceId)
        })
      })
    })
  }, [])

  if (!available) return <CircularProgress />

  return (
    <div className="box no-padding no-border">
      <video
        autoPlay={true}
        id="video-preview"
        style={{ width: '300px', height: '200px' }}
      ></video>
      <div className="row align-flex-end">
        <div className="column remaining space-right">
          <select
            className="margin-top block"
            value={selected ? selected : ''}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value={null}>--- Default ---</option>
            {available.map((device) => {
              return (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}
