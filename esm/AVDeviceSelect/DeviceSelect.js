var _s = $RefreshSig$();

import LinearProgress from '@material-ui/core/LinearProgress';
import DeviceError from './DeviceError';
import { getMediaDevicesList, getMediaLabel, getPermissions, reduceMediaDeviceInfo } from './helpers';

const DeviceSelect = ({
  medium,
  onChange,
  preselect
}) => {
  _s();

  const [selected, setSelected] = useState();
  const [available, setAvailable] = useState([]);
  const [error, setError] = useState();

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList(medium);
    const devices = mediaDevices.map(mediaDevice => reduceMediaDeviceInfo(mediaDevice));
    setAvailable(devices);
    return devices;
  };
  /** Ensure permissions are available & default device available */
  // TODO: really this should only fail if audio/video permission is denied by the user
  // at the moment, it also fails if the default (first) device is in use elsewhere
  // a more intelligent handler would allow the default device to fail and load the next one


  const init = async () => {
    const mediaStream = await getPermissions({
      video: medium.includes('video'),
      audio: medium.includes('audio')
    });

    if (!mediaStream.id) {
      setError(mediaStream.toString());
      return false;
    } else return true;
  };
  /** Initialise, get available audio devices and set USB plug listener */


  useEffect(() => {
    init().then(result => {
      if (result) getAvailableDevices().then(devices => {
        if (preselect) setSelected(preselect);else setSelected(devices[0]);
      });
      navigator.mediaDevices.addEventListener('devicechange', () => {
        getAvailableDevices().then(devices => {
          setSelected(devices[0]);
        });
      });
    });
  }, []);
  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const onSelectDevice = deviceId => {
    const newSelected = available.filter(device => device.deviceId === deviceId)[0];
    setSelected(newSelected);
  };

  return error ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, getMediaLabel(medium)), /*#__PURE__*/React.createElement(DeviceError, {
    error: error,
    onClear: null
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, getMediaLabel(medium)), /*#__PURE__*/React.createElement("select", {
    className: "block",
    disabled: _.isEmpty(available) || error,
    onChange: syntheticEvent => onSelectDevice(syntheticEvent.nativeEvent.target.value),
    value: selected == null ? void 0 : selected.deviceId
  }, available.map(item => /*#__PURE__*/React.createElement("option", {
    key: item.deviceId,
    value: item.deviceId
  }, item.label))), _.isEmpty(available) && !error && /*#__PURE__*/React.createElement(LinearProgress, {
    style: {
      marginTop: -5,
      borderRadius: '0 0 4px 4px'
    }
  }));
};

_s(DeviceSelect, "nihmRpOep/85kkv9rmC4O5sPm4Y=");

_c = DeviceSelect;
export default DeviceSelect;

var _c;

$RefreshReg$(_c, "DeviceSelect");