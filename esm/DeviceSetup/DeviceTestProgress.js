import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import RecIcon from '@material-ui/icons/FiberManualRecord';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const DeviceTestProgress = ({
  testState = 'recording',
  progress
}) => {
  const iconClass = 'avds-device-test-progress-circle';
  const iconStyle = {
    height: 18,
    width: 18
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "avds-device-test-progress"
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    size: 32,
    thickness: 5,
    value: 100,
    variant: 'static',
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
    variant: "static",
    classes: {
      root: `avds-device-test-progress-circle ${testState}`
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
  }, testState === 'recording' ? /*#__PURE__*/React.createElement(RecIcon, {
    className: `${iconClass} ${testState}`,
    style: iconStyle
  }) : /*#__PURE__*/React.createElement(PlayArrowIcon, {
    className: `${iconClass} ${testState}`,
    style: iconStyle
  }))));
};

export default DeviceTestProgress;