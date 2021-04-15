import LinearProgress from '@material-ui/core/LinearProgress'
import { getSoundMeter, arrayStats } from '../helpers'

const T_INTERVAL = 50
const N_BUFFER = 20

class AudioInputVolumeMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      soundLevel: 0,
      clipping: false,
      pollRef: null,
      buffer: [],
      badMic: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.device !== prevProps.device) {
      this.initMonitoring()
    }
    if (this.state.soundLevel !== prevState.soundLevel) {
      const { buffer, soundLevel } = this.state
      const newBuffer =
        buffer.length > N_BUFFER
          ? buffer.slice(1, buffer.length).concat([soundLevel])
          : buffer.concat([soundLevel])
      this.setState({
        buffer: newBuffer,
        badMic: buffer.length >= N_BUFFER && arrayStats.variance(newBuffer) < 0.00000001,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.pollRef)
  }

  initMonitoring() {
    const { device } = this.props
    const { pollRef } = this.state
    if (device) {
      clearInterval(pollRef)
      getSoundMeter({ deviceId: device?.deviceId || device }).then((meter) => {
        const ref = setInterval(() => {
          this.setState({
            soundLevel: meter.volume,
            clipping: meter.checkClipping(),
          })
        }, T_INTERVAL)
        this.setState({ pollRef: ref, buffer: [] })
      })
    }
  }

  render() {
    const { soundLevel, clipping, badMic } = this.state
    return (
      <div className="avds-monitor-volume">
        {badMic ? (
          <b style={{ color: 'red' }}>
            This microphone looks like it might not be working! Make sure to test it or
            try a different one
          </b>
        ) : (
          <LinearProgress
            classes={{
              root: `avds-monitor${clipping ? ' clip' : ''}`,
              bar: `avds-monitor-bar${clipping ? ' clip' : ''}`,
            }}
            variant="determinate"
            value={Math.min(soundLevel * 150, 100)}
          />
        )}
      </div>
    )
  }
}

export default AudioInputVolumeMonitor
