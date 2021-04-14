import { getPermissions, getMediaDevicesList, reduceMediaDeviceInfo, getSupportedConstraints } from '../helpers';
import MuiSelect from '../AVDevicesSetup/MuiSelect';
import AudioInputTest from './AudioInputTest';
import AudioInputVolumeMonitor from './AudioInputVolumeMonitor';
import InputAdvice from '../DeviceSetup/InputAdvice';
import InputConstraints from '../DeviceSetup/InputConstraints';
const AUDIO_INPUT_ADVICE = {
  heading: 'How to make the most of your mic',
  listItems: ['Keep the mic still, and as close to your mouth as possible', 'Hard surfaces reflect sound and make it harder to understand speech. Put\n' + '                some cushions / blankets on your desk or around your laptop: really - it\n' + '                helps!']
};

const AudioInputSetup = ({
  onChange,
  onFail,
  onBusy,
  inputConfig
}) => {
  const [selected, setSelected] = useState();
  const [constraints, setConstraints] = useState({});
  const [disableControls, setDisableControls] = useState(false);
  const [available, setAvailable] = useState([]);

  const getAvailableDevices = async () => {
    const mediaDevices = await getMediaDevicesList({
      type: 'audio',
      direction: 'in'
    });
    setAvailable(mediaDevices.map(mediaDevice => reduceMediaDeviceInfo(mediaDevice)));
    return mediaDevices;
  };
  /** Ensure permissions are available */


  const init = async () => {
    const mediaStream = await getPermissions({
      video: false,
      audio: true
    });

    if (!mediaStream) {
      onFail();
      return false;
    } else return true;
  };
  /** Initialise, get available audio devices and set USB plug listener */


  useEffect(() => {
    setConstraints(getSupportedConstraints(constraints));
    init().then(result => {
      if (result) getAvailableDevices();
      navigator.mediaDevices.addEventListener('devicechange', () => {
        getAvailableDevices().then(mediaDevices => {
          setSelected(mediaDevices[0]);
        });
      });
    });
  }, []);
  /** If device already configured, load values into controls */

  useEffect(() => {
    if (inputConfig && !_.isEmpty(available)) {
      setConstraints(inputConfig.constraints);
      setSelected(available.filter(device => device.deviceId === inputConfig.device.deviceId)[0]);
    } else {
      setSelected(available[0]);
    }
  }, [available, inputConfig]);
  /** Update parent component on parameter changes */

  useEffect(() => {
    if (!_.isEmpty(constraints) && !!selected) onChange({
      device: selected,
      constraints
    });
  }, [selected, constraints]);

  const onSelectDevice = evt => {
    const newDevice = evt.target.value;
    setSelected(newDevice);
  };

  const onUpdateDeviceConstraints = newConstraints => {
    setConstraints(newConstraints);
  };

  const onTestChange = update => {
    setDisableControls(update == null ? void 0 : update.testing);
    onBusy(update == null ? void 0 : update.testing);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "box no-padding no-border"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row align-flex-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column remaining space-right"
  }, /*#__PURE__*/React.createElement(MuiSelect, {
    items: available,
    selected: selected,
    onChange: onSelectDevice,
    idKey: "deviceId",
    disabled: disableControls
  })), /*#__PURE__*/React.createElement("div", {
    className: "column remaining"
  }, /*#__PURE__*/React.createElement(AudioInputTest, {
    device: selected,
    onChange: onTestChange,
    constraints: constraints
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(AudioInputVolumeMonitor, {
    device: selected
  })), /*#__PURE__*/React.createElement("div", {
    className: "row justify-space-between",
    style: {
      padding: '0 0 0 7px'
    }
  }, /*#__PURE__*/React.createElement(InputConstraints, {
    constraints: constraints,
    disabled: disableControls,
    onChange: onUpdateDeviceConstraints
  })), /*#__PURE__*/React.createElement("div", {
    className: "row avds-advice"
  }, /*#__PURE__*/React.createElement(InputAdvice, {
    advice: AUDIO_INPUT_ADVICE
  })));
};

export default AudioInputSetup;