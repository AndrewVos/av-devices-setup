var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getSoundMeter } from './sound_meter';
import { arrayStats } from './helpers';
const T_INTERVAL = 50;
const N_BUFFER = 20;
const SIGNAL_THRESHOLD = 0.00001;
const VARIANCE_THRESHOLD = 0.00000000001;
const LevelBar = styled(LinearProgress)(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  height: 7px !important;\n  border-radius: 3px;\n  margin: 3px 0 5px 0;\n  background-color: #d8dee3 !important;\n  & .MuiLinearProgress-root {\n    background-color: ", ";\n  }\n  & .MuiLinearProgress-bar {\n    background-color: ", ";\n  }\n"])), props => props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor, props => props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor);

class AudioInputVolumeMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundLevel: 0,
      clipping: false,
      pollRef: null,
      buffer: [],
      badMic: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.device !== prevProps.device) {
      this.initMonitoring();
    }

    if (this.state.soundLevel !== prevState.soundLevel) {
      const {
        buffer,
        soundLevel
      } = this.state;
      const newBuffer = buffer.length > N_BUFFER ? buffer.slice(1, buffer.length).concat([soundLevel]) : buffer.concat([soundLevel]);
      this.setState({
        buffer: newBuffer,
        badMic: buffer.length >= N_BUFFER && arrayStats.variance(newBuffer) < VARIANCE_THRESHOLD && arrayStats.mean(newBuffer) < SIGNAL_THRESHOLD
      });
    }
  }

  stopMonitoring() {
    if (this.state.soundMeter) {
      this.state.soundMeter.shutdown();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.pollRef);
    this.stopMonitoring();
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
      getSoundMeter({
        deviceId: (device == null ? void 0 : device.deviceId) || device
      }).then(meter => {
        const ref = setInterval(() => {
          this.setState({
            soundLevel: meter.volume,
            clipping: meter.checkClipping()
          });
        }, T_INTERVAL);
        this.setState({
          pollRef: ref,
          buffer: [],
          soundMeter: meter
        });
      });
    }
  }

  render() {
    const {
      soundLevel,
      clipping,
      badMic
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, badMic ? /*#__PURE__*/React.createElement("small", {
      style: {
        color: 'red'
      }
    }, "This microphone looks like it might not be working! Make sure to test it or try a different one") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "input-label"
    }, "Your volume"), /*#__PURE__*/React.createElement(LevelBar, {
      variant: "determinate",
      value: Math.min(soundLevel * 300, 100),
      clip: clipping.toString(),
      barcolor: this.props.barColor
    })));
  }

}

export default AudioInputVolumeMonitor;