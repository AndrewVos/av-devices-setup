const DeviceError = ({
  error
}) => {
  const getHelptext = () => {
    switch (error) {
      case 'DOMException: Permission denied':
      case 'NotAllowedError: Permission denied':
        return /*#__PURE__*/React.createElement("small", null, "The browser can't access your device. Change your permissions and reload this page.");

      case 'DOMException: Could not start video source':
      case 'NotReadableError: Could not start video source':
        return /*#__PURE__*/React.createElement("small", null, "Your device is being used by another program - close it then reload this page.");
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#ef1106'
    }
  }, getHelptext());
};

_c = DeviceError;
export default DeviceError;

var _c;

$RefreshReg$(_c, "DeviceError");