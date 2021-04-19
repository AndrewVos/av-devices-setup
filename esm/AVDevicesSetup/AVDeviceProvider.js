function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { createContext } from 'react';
import { validateDevice } from '../helpers';
const AVDeviceContext = /*#__PURE__*/createContext();
const {
  Provider,
  Consumer
} = AVDeviceContext;

const AVDeviceProvider = (_ref) => {
  let {
    children
  } = _ref;
  const [avData, setAvData] = useState({
    configuredDevices: [],
    requiredDevices: []
  });

  const upsertDevice = device => {
    if (!!device && validateDevice(device)) {
      setAvData(_extends({}, avData, {
        configuredDevices: _.unionBy([device], avData.configuredDevices, 'kind')
      }));
    }
  };

  return /*#__PURE__*/React.createElement(Provider, {
    value: {
      avData,
      setAvData,
      upsertDevice
    }
  }, children);
};

export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext };