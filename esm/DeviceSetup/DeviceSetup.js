import DeviceTypeIcon from './DeviceTypeIcon';
import AudioInputSetup from '../AudioInputSetup/AudioInputSetup';
import VideoInputSetup from '../VideoInputSetup/VideoInputSetup';
import RrButton from '../AVDevicesSetup/RrButton';
import { validateDeviceConfig } from '../helpers';

const DeviceSetup = ({
  deviceType,
  onComplete,
  configuredDevice
}) => {
  const [valid, setValid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deviceConfig, setDeviceConfig] = useState(null);
  /** Load in existing device config */

  useEffect(() => {
    if (configuredDevice) {
      setDeviceConfig(configuredDevice);
    }
  }, []);
  useEffect(() => {
    if (deviceConfig) {
      if (validateDeviceConfig(deviceConfig)) setValid(true);
    }
  }, [deviceConfig]);

  const getSetupControls = () => {
    switch (deviceType) {
      case 'audioinput':
        return /*#__PURE__*/React.createElement(AudioInputSetup, {
          onChange: onChange,
          onFail: onComplete,
          onBusy: b => setBusy(b),
          inputConfig: deviceConfig || configuredDevice
        });

      case 'videoinput':
        return /*#__PURE__*/React.createElement(VideoInputSetup, {
          onChange: onChange,
          onFail: onComplete,
          onBusy: b => setBusy(b),
          inputConfig: deviceConfig || configuredDevice
        });
    }
  };

  const onChange = newDeviceConfig => {
    setDeviceConfig(newDeviceConfig);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "box clear"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column no-margin"
  }, /*#__PURE__*/React.createElement(DeviceTypeIcon, {
    type: deviceType
  })), /*#__PURE__*/React.createElement("div", {
    className: "column remaining"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avds-controls-card"
  }, getSetupControls()))), /*#__PURE__*/React.createElement("div", {
    className: "row justify-flex-end"
  }, /*#__PURE__*/React.createElement(RrButton, {
    title: "save",
    type: "primary",
    disabled: !valid || busy,
    onClick: () => onComplete(deviceConfig)
  })));
};

export default DeviceSetup;