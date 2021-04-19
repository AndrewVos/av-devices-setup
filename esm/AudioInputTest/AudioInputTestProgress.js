var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import AVIcon from './AVIcon';
var TestProgress = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  height: 40px;\n  width: 30px;\n  margin-left: 10px;\n  margin-right: 2px;\n  display: flex;\n  align-items: center;\n  padding-bottom: 1px;\n  .avds-device-test-progress-circle {\n    transition: color 200ms ease-in-out;\n  }\n  .avds-device-test-progress-circle.inactive {\n    color: rgba(231, 233, 236, 0.75);\n    position: absolute;\n  }\n"])));

var AudioInputTestProgress = function AudioInputTestProgress(_ref) {
  var _ref$testState = _ref.testState,
      testState = _ref$testState === void 0 ? 'recording' : _ref$testState,
      progress = _ref.progress;
  return /*#__PURE__*/React.createElement(TestProgress, {
    className: "avds-device-test-progress"
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    size: 32,
    thickness: 5,
    value: 100,
    variant: "determinate",
    classes: {
      root: 'avds-device-test-progress-circle inactive'
    }
  }), !!testState && /*#__PURE__*/React.createElement(Box, {
    position: "relative",
    display: "inline-flex"
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    size: 32,
    thickness: 5,
    value: progress || 0,
    variant: "determinate",
    classes: {
      root: "avds-device-test-progress-circle progress-" + testState
    }
  }), /*#__PURE__*/React.createElement(Box, {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, testState === 'recording' ? /*#__PURE__*/React.createElement(AVIcon, {
    iconName: "record",
    className: "progress-" + testState
  }) : /*#__PURE__*/React.createElement(AVIcon, {
    iconName: "play",
    className: "progress-" + testState
  }))));
};

export default AudioInputTestProgress;