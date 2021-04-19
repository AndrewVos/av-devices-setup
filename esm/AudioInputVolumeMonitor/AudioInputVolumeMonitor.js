var _templateObject;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';
import { getSoundMeter } from './sound_meter';
import { arrayStats } from './helpers';
var T_INTERVAL = 50;
var N_BUFFER = 20;
var SIGNAL_THRESHOLD = 0.00001;
var VARIANCE_THRESHOLD = 0.00000000001;
var LevelBar = styled(LinearProgress)(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  height: 7px !important;\n  border-radius: 3px;\n  margin: 3px 0 5px 0;\n  background-color: #d8dee3 !important;\n  & .MuiLinearProgress-root {\n    background-color: ", ";\n  }\n  & .MuiLinearProgress-bar {\n    background-color: ", ";\n  }\n"])), function (props) {
  return props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor;
}, function (props) {
  return props.clip === 'true' ? 'rgba(255, 0, 0, 0.5)' : props.barcolor;
});

var AudioInputVolumeMonitor = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AudioInputVolumeMonitor, _React$Component);

  function AudioInputVolumeMonitor(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      soundLevel: 0,
      clipping: false,
      pollRef: null,
      buffer: [],
      badMic: false
    };
    return _this;
  }

  var _proto = AudioInputVolumeMonitor.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.props.device !== prevProps.device) {
      this.initMonitoring();
    }

    if (this.state.soundLevel !== prevState.soundLevel) {
      var _this$state = this.state,
          buffer = _this$state.buffer,
          soundLevel = _this$state.soundLevel;
      var newBuffer = buffer.length > N_BUFFER ? buffer.slice(1, buffer.length).concat([soundLevel]) : buffer.concat([soundLevel]);
      this.setState({
        buffer: newBuffer,
        badMic: buffer.length >= N_BUFFER && arrayStats.variance(newBuffer) < VARIANCE_THRESHOLD && arrayStats.mean(newBuffer) < SIGNAL_THRESHOLD
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.state.pollRef);
  };

  _proto.initMonitoring = function initMonitoring() {
    var _this2 = this;

    var device = this.props.device;
    var pollRef = this.state.pollRef;

    if (device) {
      clearInterval(pollRef);
      getSoundMeter({
        deviceId: (device == null ? void 0 : device.deviceId) || device
      }).then(function (meter) {
        var ref = setInterval(function () {
          _this2.setState({
            soundLevel: meter.volume,
            clipping: meter.checkClipping()
          });
        }, T_INTERVAL);

        _this2.setState({
          pollRef: ref,
          buffer: []
        });
      });
    }
  };

  _proto.render = function render() {
    var _this$state2 = this.state,
        soundLevel = _this$state2.soundLevel,
        clipping = _this$state2.clipping,
        badMic = _this$state2.badMic;
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
  };

  return AudioInputVolumeMonitor;
}(React.Component);

export default AudioInputVolumeMonitor;