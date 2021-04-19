function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { createContext } from 'react';
import { validateDevice } from '../helpers';
var AVDeviceContext = /*#__PURE__*/createContext();
var Provider = AVDeviceContext.Provider,
    Consumer = AVDeviceContext.Consumer;

var AVDeviceProvider = function AVDeviceProvider(_ref) {
  var children = _ref.children;

  var _useState = useState({
    configuredDevices: [],
    requiredDevices: []
  }),
      avData = _useState[0],
      setAvData = _useState[1];

  var upsertDevice = function upsertDevice(device) {
    if (!!device && validateDevice(device)) {
      setAvData(_extends({}, avData, {
        configuredDevices: _.unionBy([device], avData.configuredDevices, 'kind')
      }));
    }
  };

  return /*#__PURE__*/React.createElement(Provider, {
    value: {
      avData: avData,
      setAvData: setAvData,
      upsertDevice: upsertDevice
    }
  }, children);
};

export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext };