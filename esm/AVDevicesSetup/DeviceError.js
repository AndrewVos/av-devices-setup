import RrButton from './RrButton';

const DeviceError = ({
  error,
  onClear
}) => {
  const getHelptext = () => {
    switch (error) {
      case 'DOMException: Permission denied':
      case 'NotAllowedError: Permission denied':
        return /*#__PURE__*/React.createElement("p", null, "You need to change your browser permissions to allow the app to use your device. Change your permissions then click \"try again\" ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), "(", /*#__PURE__*/React.createElement("i", null, "you might need to refresh/reload the page, depending on your browser"), ")");

      case 'DOMException: Could not start video source':
      case 'NotReadableError: Could not start video source':
        return /*#__PURE__*/React.createElement("p", null, "It looks like your device is in use by another program on your computer - close that other program and click \"try again\" ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("br", null), "(", /*#__PURE__*/React.createElement("i", null, "If it doesn't work immediately, then try to refresh/reload the page"), ")");
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "box clear"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, getHelptext())), /*#__PURE__*/React.createElement("div", {
    className: "row justify-flex-end"
  }, /*#__PURE__*/React.createElement(RrButton, {
    title: "Try again",
    type: "primary",
    onClick: onClear
  })));
};

export default DeviceError;