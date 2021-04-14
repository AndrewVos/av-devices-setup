import Backdrop from '@material-ui/core/Backdrop';
import useCookie from 'react-use-cookie';
import AVDSTitle from './AVDSTitle';
import RequiredDevices from './RequiredDevices';
import DeviceSetup from '../DeviceSetup';
import { getMediaDevicesList } from '../helpers';
import DeviceError from './DeviceError';
/**
 * For now this component works with a single required device of type 'audioinput', so requiredDevices must
 * be equal to ['audioinput'].
 * @param show - Display component backdrop element
 * @param requiredDevices - [String] of device types, e.g. ['audioinput', 'videoinput', ...]
 * @param avDevices - Object { audioinput: deviceConfig, ... }
 * @param onComplete
 * @returns {JSX.Element}
 * @constructor
 */

const AVDevicesSetup = ({
  show,
  requiredDevices,
  avDevices,
  onComplete,
  onCancel,
  persist
}) => {
  const multiple = (requiredDevices == null ? void 0 : requiredDevices.length) > 1;
  const [configuredDevices, setConfiguredDevices] = useState(avDevices || []);
  const [currentDeviceType, setCurrentDeviceType] = useState(multiple ? null : requiredDevices[0]);
  const [userAvDevices, setUserAvDevices] = useCookie('avDevices');
  const [deviceError, setDeviceError] = useState();
  /** Lookup cookie to see if device config stored there */

  useEffect(() => {
    if (!avDevices && userAvDevices) {
      getMediaDevicesList().then(mediaDevices => {
        JSON.parse(userAvDevices).forEach(config => {
          if (mediaDevices.map(mediaDevice => mediaDevice.deviceId).includes(config.device.deviceId)) {
            onDeviceConfigured(config);
          }
        });
      });
    }
  }, [userAvDevices]);
  /** Fixes CSS document width flashing when show/hide component */

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflow = show ? 'hidden' : 'scroll';
  }, [show]);
  /** If requiredDevices has only one entry, returns configured devices to the parent component */

  /** If requiredDevices has multiple entries, shows the device selection component */

  useEffect(() => {
    const valid = requiredDevices.every(deviceType => configuredDevices.map(d => d.device.kind).includes(deviceType));
    if (valid && !multiple) onSetupComplete();else {
      setCurrentDeviceType(!multiple && requiredDevices[0]);
    }
  }, [configuredDevices]);
  /** Runs every time a device is configured within DeviceSetup component */

  const onDeviceConfigured = (deviceConfig, error) => {
    if (error || !deviceConfig) {
      if (multiple) setCurrentDeviceType(null);
      setDeviceError(error);
    } else {
      setConfiguredDevices(configuredDevices.filter(item => item.device.kind !== deviceConfig.device.kind).concat([deviceConfig]));
      if (multiple) setCurrentDeviceType(null);
    }
  };
  /** Runs when all required devices have been configured */


  const onSetupComplete = () => {
    // Only save to cookies if persistence enabled
    if (persist) setUserAvDevices(JSON.stringify(configuredDevices));
    onComplete(configuredDevices);
  };

  const onSelectDevice = device => {
    setCurrentDeviceType(device);
  };

  const onClickClose = () => {
    setDeviceError(null);

    if (!!currentDeviceType && multiple) {
      setCurrentDeviceType(null);
    } else onCancel();
  };

  return show && /*#__PURE__*/React.createElement(Backdrop, {
    open: show,
    classes: {
      root: 'avds-backdrop'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "avds-card"
  }, /*#__PURE__*/React.createElement(AVDSTitle, {
    onClose: () => onClickClose(),
    deviceType: currentDeviceType
  }), deviceError ? /*#__PURE__*/React.createElement(DeviceError, {
    error: deviceError.toString(),
    onClear: () => setDeviceError(null)
  }) : currentDeviceType ? /*#__PURE__*/React.createElement(DeviceSetup, {
    deviceType: currentDeviceType,
    onComplete: onDeviceConfigured,
    configuredDevice: configuredDevices.filter(config => config.device.kind === currentDeviceType)[0]
  }) : /*#__PURE__*/React.createElement(RequiredDevices, {
    configuredDevices,
    requiredDevices,
    onSelectDevice,
    onComplete
  })));
};

export default AVDevicesSetup;