import { AVDeviceProvider } from './AVDeviceProvider';
import AVDevicesSetup from './AVDevicesSetup';

const App = ({
  requiredDevices,
  avDevices,
  onChange,
  persist,
  userOptions
}) => {
  return /*#__PURE__*/React.createElement(AVDeviceProvider, null, /*#__PURE__*/React.createElement(AVDevicesSetup, {
    requiredDevices,
    avDevices,
    onChange,
    persist,
    userOptions
  }));
};

_c = App;
export default App;

var _c;

$RefreshReg$(_c, "App");