import micSettingsImg from '../assets/microphone-settings.svg';

const DeviceTypeIcon = ({
  type = 'audioinput'
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon square-big"
  }, /*#__PURE__*/React.createElement("img", {
    src: micSettingsImg,
    alt: type
  }));
};

export default DeviceTypeIcon;