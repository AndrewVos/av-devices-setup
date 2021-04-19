import { AVDeviceProvider } from './AVDeviceProvider';
import AVDevicesSetup from './AVDevicesSetup';

var App = function App(_ref) {
  var requiredDevices = _ref.requiredDevices,
      avDevices = _ref.avDevices,
      onChange = _ref.onChange,
      persist = _ref.persist,
      userOptions = _ref.userOptions;
  return /*#__PURE__*/React.createElement(AVDeviceProvider, null, /*#__PURE__*/React.createElement(AVDevicesSetup, {
    requiredDevices: requiredDevices,
    avDevices: avDevices,
    onChange: onChange,
    persist: persist,
    userOptions: userOptions
  }));
};

export default App;