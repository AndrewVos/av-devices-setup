import DeviceTypeIcon from '../DeviceSetup/DeviceTypeIcon';
import RrButton from './RrButton'; // eslint-disable-next-line no-unused-vars

const RequiredDevices = ({
  configuredDevices,
  requiredDevices,
  onSelectDevice,
  onComplete
}) => {
  const [complete, setComplete] = useState(false);

  const validate = () => {
    setComplete(requiredDevices.every(item => configuredDevices.map(device => device.device.kind).includes(item)));
  };

  useEffect(validate, [configuredDevices]);
  return /*#__PURE__*/React.createElement("div", {
    className: "box clear"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row justify-center"
  }, requiredDevices.map(device => /*#__PURE__*/React.createElement("div", {
    className: "column horizontal-padding",
    key: device
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "icon-button",
    onClick: () => onSelectDevice(device)
  }, /*#__PURE__*/React.createElement(DeviceTypeIcon, {
    type: device
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "row justify-flex-end padded"
  }, /*#__PURE__*/React.createElement(RrButton, {
    title: "finish setup",
    type: "primary",
    disabled: !complete,
    onClick: () => onComplete(configuredDevices)
  })));
};

export default RequiredDevices;