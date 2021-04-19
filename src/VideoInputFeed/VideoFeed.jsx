import CircularProgress from '@material-ui/core/CircularProgress'
import { validateDevice } from '../helpers'
import styled from 'styled-components'

const FeedFrame = styled.div`
  min-height: 200px;
  width: 100%;
  background: #dfe6ed;
  border: 2px solid #b2bec8;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Feed = styled.video`
  width: 100%;
  background: black;
  padding-bottom: 1px;
  outline: 2px solid #b2bec8;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

const VideoFeed = ({ device, maxHeight }) => {
  const [status, setStatus] = useState('loading')
  const [stream, setStream] = useState()

  function stopMediaTracks() {
    if (!!stream)
      stream.getTracks().forEach((track) => {
        track.stop()
      })
  }

  useEffect(() => {
    return () => {
      stopMediaTracks()
    }
  }, [])

  useEffect(() => {
    stopMediaTracks()
    if (device && validateDevice(device)) {
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: { exact: device.deviceId } } })
        .then((videoStream) => {
          const video = document.getElementById('webcam-feed')
          video.srcObject = videoStream
          video.addEventListener('canplay', () => {
            video.play()
          })
          setStream(videoStream)
          setStatus('streaming')
        })
        .catch(function () {
          console.log('Something went wrong!')
        })
    }
  }, [device])

  return (
    <FeedFrame>
      {status === 'loading' && <CircularProgress style={{ color: '#bdc3c9' }} />}
      <Feed
        style={{ maxHeight }}
        loop
        autoplay
        muted
        id="webcam-feed"
        show={status === 'streaming'}
      />
    </FeedFrame>
  )
}

export default VideoFeed
