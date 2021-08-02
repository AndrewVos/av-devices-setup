function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import useCookie from 'react-use-cookie';
import { Grid } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { DEFAULT_OPTIONS } from './constants';
import { AVDeviceContext } from './AVDeviceProvider';
import VideoFeed from '../VideoInputFeed/VideoFeed';
import AudioInputVolumeMonitor from '../AudioInputVolumeMonitor/AudioInputVolumeMonitor';
import DeviceSelection from './DeviceSelection';
import { AudioInputTestContainer } from '../AudioInputTest';
import { validateConfig } from './helpers';
/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param requiredDevices - [String] of media device types, e.g. ['audioinput', 'videoinput', ...]
 * @param initConfig - Array of MediaDevices [{ deviceId, etc... }]
 * @param onChange - Function, runs every time a new device is selected
 * @param persist - Boolean, sets whether setup is stored and retrieved from cookie
 * @param userOptions - Object, params can be found in ./constants#DEFAULT_OPTIONS }
 * @returns {JSX.Element}
 * @constructor
 */

const AVDevicesSetup = (_ref) => {
  var _options$soundMeter, _options$audioTest;

  let {
    requiredDevices,
    initConfig,
    onChange,
    persist,
    userOptions = {}
  } = _ref;
  const [cookieConfig, setCookieConfig] = useCookie('avDevices');
  const {
    avData,
    setAvData
  } = useContext(AVDeviceContext);

  const options = _.merge(DEFAULT_OPTIONS, userOptions);

  useEffect(() => {
    setAvData(_extends({}, avData, {
      requiredDevices
    }));
  }, []);
  /** Send update to parent */

  /** (If persist) Save configuration to cookie on change */

  useEffect(() => {
    if (validateConfig(requiredDevices, avData.configuredDevices)) {
      if (onChange) onChange(avData.configuredDevices);
      if (persist) setCookieConfig(JSON.stringify(avData.configuredDevices));
    }
  }, [avData]);

  function getDevice(kind) {
    return avData == null ? void 0 : avData.configuredDevices.filter(device => device.kind === kind)[0];
  }

  function getCookieConfig() {
    return !!cookieConfig && JSON.parse(cookieConfig);
  }

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column",
    spacing: 1,
    style: {
      padding: options.container.padding,
      width: options.container.width[isMobile ? 'mobile' : 'desktop'],
      background: options.container.background
    }
  }, requiredDevices.includes('videoinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(VideoFeed, {
    device: getDevice('videoinput'),
    maxHeight: options.video.maxHeight
  })), requiredDevices.includes('audioinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(AudioInputVolumeMonitor, {
    barColor: options == null ? void 0 : (_options$soundMeter = options.soundMeter) == null ? void 0 : _options$soundMeter.color,
    device: getDevice('audioinput')
  })), /*#__PURE__*/React.createElement(DeviceSelection, {
    preselect: initConfig || persist && getCookieConfig()
  }), requiredDevices.includes('audioinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(AudioInputTestContainer, {
    device: getDevice('audioinput'),
    outputDevice: getDevice('audiooutput'),
    expanded: options == null ? void 0 : (_options$audioTest = options.audioTest) == null ? void 0 : _options$audioTest.expanded,
    style: {
      background: options.audioTest.background
    }
  })));
};

export default AVDevicesSetup;