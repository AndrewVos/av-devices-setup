import micSettingsImg from '../assets/microphone-settings.svg';
import webcamImg from '../assets/webcam.svg';

const DeviceTypeIcon = ({
  type
}) => {
  const getIcon = () => {
    switch (type) {
      case 'audioinput':
        return /*#__PURE__*/React.createElement("img", {
          src: micSettingsImg,
          alt: type
        });

      case 'videoinput':
        return /*#__PURE__*/React.createElement("img", {
          src: webcamImg,
          alt: type
        });
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "icon square-big"
  }, getIcon());
};

export default DeviceTypeIcon;