import { Grid } from '@material-ui/core'
import Button from './Button'
import AudioInputTestProgress from './AudioInputTestProgress'
import { playAudioBlob, recordAudioToBlob } from './web_media'

const TEST_PERIOD = 5 * 1000 // milliseconds
const ANIMATE_STEP_SIZE = 3 // % of complete

const AudioInputTest = ({ device, outputDevice, onChange, constraints, hideProgress }) => {
  const [progress, setProgress] = useState(0)
  const [testState, setTestState] = useState('default')
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
    if (onChange) onChange({ testing: true })
  }

  const cancelTest = () => {
    clearInterval(timeFunc)
    setTimeFunc(null)
    if (onChange) onChange({ testing: false })
    setTestState('default')
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
    const [playing, cancel] = playAudioBlob(testAudio, outputDevice?.deviceId)
    setCancelMedia(() => cancel)
    playing.then(() => {
      setTestState('default')
      setTestAudio(null)
      if (onChange) onChange({ testing: false })
    })
  }

  return (
    <Grid container direction="row">
      <Grid item xs style={{ display: 'flex' }}>
        <Button
          style={{
            minWidth: 80,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={testState === 'default' ? 'record' : hideProgress ? testState : 'cancel'}
          type={testState}
          icon={testState === 'default' ? 'record' : 'cancel'}
          onClick={testState === 'default' ? beginTest : cancelTest}
        />
      </Grid>
      {!hideProgress && (
        <Grid item>
          <AudioInputTestProgress
            progress={progress}
            testState={testState !== 'default' && testState}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default AudioInputTest
