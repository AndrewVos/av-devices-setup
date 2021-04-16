import { LinearProgress } from '@material-ui/core'
import { useEffect } from 'react'
import styled from 'styled-components'
import { reduceMediaDeviceInfo, getMediaLabel } from '../helpers'
import { getMediaDevicesList, getPermissions } from '../web_media'

const ErrorWarn = styled.div`
  text-align: center;
  background: #ffcccc;
  color: #da2e2e;
  padding: 10px;
`

const DeviceSelect = ({ medium, onChange, onFail, preselect }) => {
  const [selected, setSelected] = useState()
  const [available, setAvailable] = useState([])
  const [error, setError] = useState()

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList(medium)
    setAvailable(mediaDevices.map((mediaDevice) => reduceMediaDeviceInfo(mediaDevice)))
    return mediaDevices
  }

  /** Ensure permissions are available & default device available */
  // TODO: really this should only fail if audio/video permission is denied by the user
  // at the moment, it also fails if the default (first) device is in use elsewhere
  // a more intelligent handler would allow the default device to fail and load the next one
  const init = async () => {
    const mediaStream = await getPermissions({
      video: medium.includes('video'),
      audio: medium.includes('audio'),
    })
    if (!mediaStream.id) {
      setError(mediaStream.toString())
      console.log(mediaStream)
      //   onFail(null, mediaStream)
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
    if (preselect && !_.isEmpty(available)) {
      setSelected(available.filter((device) => device.deviceId === preselect.deviceId)[0])
    } else {
      setSelected(available[0])
    }
  }, [available, preselect])

  useEffect(() => {
    onChange(selected)
  }, [selected])

  const onSelectDevice = (deviceId) => {
    const newSelected = available.filter((device) => device.deviceId === deviceId)[0]
    setSelected(newSelected)
  }

  return (
    <div>
      <p className="input-label">{getMediaLabel(medium)}</p>
      <select
        className="block"
        disabled={_.isEmpty(available) || error}
        onChange={(syntheticEvent) =>
          onSelectDevice(syntheticEvent.nativeEvent.target.value)
        }
      >
        {available.map((item) => (
          <option key={item.deviceId} value={item.deviceId}>
            {item.label}
          </option>
        ))}
      </select>
      {_.isEmpty(available) && !error && (
        <LinearProgress style={{ marginTop: -5, borderRadius: '0 0 4px 4px' }} />
      )}
    </div>
  )
}

export default DeviceSelect
