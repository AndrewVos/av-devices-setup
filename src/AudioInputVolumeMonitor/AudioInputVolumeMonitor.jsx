import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { getSoundMeter } from './sound_meter'
import { arrayStats } from './helpers'

const T_INTERVAL = 50
const N_BUFFER = 20
const SIGNAL_THRESHOLD = 0.00001
const VARIANCE_THRESHOLD = 0.00000000001

const LevelBar = styled(LinearProgress)`
  width: 100%;
  height: 7px !important;
  border-radius: 3px;
  margin: 3px 0 5px 0;
  background-color: #d8dee3 !important;
  & .MuiLinearProgress-root {
    background-color: ${(props) =>
      props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor};
  }
  & .MuiLinearProgress-bar {
    background-color: ${(props) =>
      props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor};
  }
`

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
        badMic:
          buffer.length >= N_BUFFER &&
          arrayStats.variance(newBuffer) < VARIANCE_THRESHOLD &&
          arrayStats.mean(newBuffer) < SIGNAL_THRESHOLD,
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
      <div>
        {badMic ? (
          <small style={{ color: 'red' }}>
            This microphone looks like it might not be working! Make sure to test it or
            try a different one
          </small>
        ) : (
          <div>
            <p className="input-label">Your volume</p>
            <LevelBar
              variant="determinate"
              value={Math.min(soundLevel * 300, 100)}
              clip={clipping.toString()}
              barcolor={this.props.barColor}
            />
          </div>
        )}
      </div>
    )
  }
}

AudioInputVolumeMonitor.propTypes = {
  barColor: PropTypes.string.isRequired,
  device: PropTypes.object,
}

export default AudioInputVolumeMonitor
