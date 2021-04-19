var _s = $RefreshSig$();

import { createContext } from 'react';
import { validateDevice } from '../helpers';
const AVDeviceContext = /*#__PURE__*/createContext();
const {
  Provider,
  Consumer
} = AVDeviceContext;

const AVDeviceProvider = ({
  children
}) => {
  _s();

  const [avData, setAvData] = useState({
    configuredDevices: [],
    requiredDevices: []
  });

  const upsertDevice = device => {
    if (!!device && validateDevice(device)) {
      setAvData({ ...avData,
        configuredDevices: _.unionBy([device], avData.configuredDevices, 'kind')
      });
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

_s(AVDeviceProvider, "CrvzAteCFjcpEm8BUCWfbMqlMxk=");

_c = AVDeviceProvider;
export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext };

var _c;

$RefreshReg$(_c, "AVDeviceProvider");