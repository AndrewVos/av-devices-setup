import { AVDeviceProvider } from './AVDeviceProvider';
import AVDevicesSetup from './AVDevicesSetup';

const App = (_ref) => {
  let {
    requiredDevices,
    avDevices,
    onChange,
    persist,
    userOptions
  } = _ref;
  return /*#__PURE__*/React.createElement(AVDeviceProvider, null, /*#__PURE__*/React.createElement(AVDevicesSetup, {
    requiredDevices,
    avDevices,
    onChange,
    persist,
    userOptions
  }));
};

export default App;