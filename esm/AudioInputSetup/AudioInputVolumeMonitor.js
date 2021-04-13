import LinearProgress from '@material-ui/core/LinearProgress';
import { getSoundMeter } from '../helpers';

class AudioInputVolumeMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundLevel: 0,
      clipping: false,
      pollRef: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.device !== prevProps.device) this.initMonitoring();
  }

  componentWillUnmount() {
    clearInterval(this.state.pollRef);
  }

  initMonitoring() {
    const {
      device
    } = this.props;
    const {
      pollRef
    } = this.state;

    if (device) {
      clearInterval(pollRef);
      getSoundMeter(device.deviceId).then(meter => {
        const ref = setInterval(() => {
          this.setState({
            soundLevel: meter.volume,
            clipping: meter.checkClipping()
          });
        }, 50);
        this.setState({
          pollRef: ref
        });
      });
    }
  }

  render() {
    const {
      soundLevel,
      clipping
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "avds-monitor-volume"
    }, /*#__PURE__*/React.createElement(LinearProgress, {
      classes: {
        root: `avds-monitor${clipping ? ' clip' : ''}`,
        bar: `avds-monitor-bar${clipping ? ' clip' : ''}`
      },
      variant: "determinate",
      value: Math.min(soundLevel * 150, 100)
    }));
  }

}

export default AudioInputVolumeMonitor;