var _s = $RefreshSig$();

import useCookie from 'react-use-cookie';
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

const AVDevicesSetup = ({
  requiredDevices,
  initConfig,
  onChange,
  persist,
  userOptions = {}
}) => {
  _s();

  var _options$video, _options$video2, _options$soundMeter, _options$audioTest;

  const [cookieConfig, setCookieConfig] = useCookie('avDevices');
  const {
    avData,
    setAvData
  } = useContext(AVDeviceContext);
  const options = { ...DEFAULT_OPTIONS,
    ...userOptions
  };
  useEffect(() => {
    setAvData({ ...avData,
      requiredDevices
    });
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
      padding: options.containerPadding,
      width: isMobile ? options == null ? void 0 : (_options$video = options.video) == null ? void 0 : _options$video.mobile : options == null ? void 0 : (_options$video2 = options.video) == null ? void 0 : _options$video2.desktop,
      background: 'white'
    }
  }, requiredDevices.includes('videoinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(VideoFeed, {
    device: getDevice('videoinput')
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
    expanded: options == null ? void 0 : (_options$audioTest = options.audioTest) == null ? void 0 : _options$audioTest.expanded
  })));
};

_s(AVDevicesSetup, "WDEjW5xZVS/tWmRLOcj2VWlPdYY=", false, function () {
  return [useCookie];
});

_c = AVDevicesSetup;
export default AVDevicesSetup;

var _c;

$RefreshReg$(_c, "AVDevicesSetup");