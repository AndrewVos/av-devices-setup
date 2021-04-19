import Button from './Button'
import AudioInputTestProgress from './AudioInputTestProgress'
import { playAudioBlob, recordAudioToBlob } from './web_media'
import { Grid } from '@material-ui/core'

const TEST_PERIOD = 5 * 1000 // milliseconds
const ANIMATE_STEP_SIZE = 3 // % of complete

const AudioInputTest = ({ device, onChange, constraints, showProgress }) => {
  const [progress, setProgress] = useState(0)
  const [testState, setTestState] = useState(null)
  const [testAudio, setTestAudio] = useState(null)
  const [timeFunc, setTimeFunc] = useState(null)
  const [cancelMedia, setCancelMedia] = useState(null)

  useEffect(() => {
    clearInterval(timeFunc)
    setTimeFunc(null)
    if (testAudio) {
      setTestState('playing')
      animateProgress(true)
      playTestAudio()
    }
  }, [testAudio])

  const beginTest = () => {
    setProgress(0)
    setTestState('recording')
    animateProgress()
    recordTestAudio()
    onChange({ testing: true })
  }

  const cancelTest = () => {
    clearInterval(timeFunc)
    setTimeFunc(null)
    onChange({ testing: false })
    setTestState(null)
    setTestAudio(null)
    setProgress(0)
    cancelMedia()
  }

  const animateProgress = (reverse) => {
    const animateInterval = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress + (reverse ? -1 : 1) * ANIMATE_STEP_SIZE
      })
    }, TEST_PERIOD / (100 / ANIMATE_STEP_SIZE))
    setTimeFunc(animateInterval)
  }

  const recordTestAudio = () => {
    const [blobPromise, cancel] = recordAudioToBlob({
      deviceId: device.deviceId,
      length: TEST_PERIOD,
      constraints,
    })
    setCancelMedia(() => cancel)
    blobPromise.then((blob) => {
      setTestAudio(blob)
    })
  }

  const playTestAudio = () => {
    const [playing, cancel] = playAudioBlob(testAudio)
    setCancelMedia(() => cancel)
    playing.then(() => {
      setTestState(null)
      setTestAudio(null)
      onChange({ testing: false })
    })
  }

  return (
    <Grid container direction="row">
      <Grid item xs style={{ display: 'flex' }}>
        <Button
          style={{ minWidth: 80, flex: 1, justifyContent: 'center' }}
          title={testState ? 'cancel' : 'test mic'}
          type={testState ? 'cancel' : ''}
          icon={testState ? 'cancel' : 'record'}
          onClick={testState ? cancelTest : beginTest}
        />
      </Grid>
      {showProgress && (
        <Grid item xs>
          <AudioInputTestProgress progress={progress} testState={testState} />
        </Grid>
      )}
    </Grid>
  )
}

export default AudioInputTest
