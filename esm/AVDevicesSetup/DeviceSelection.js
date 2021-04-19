import DeviceSelect from '../AVDeviceSelect/DeviceSelect';
import { AVDeviceContext } from './AVDeviceProvider';

var DeviceSelection = function DeviceSelection(_ref) {
  var preselect = _ref.preselect;

  var _useContext = useContext(AVDeviceContext),
      avData = _useContext.avData,
      upsertDevice = _useContext.upsertDevice;

  var getPreselect = function getPreselect(kind) {
    return !!preselect && preselect.filter(function (device) {
      return device.kind === kind;
    })[0];
  };

  return /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    spacing: isMobile ? 1 : 3,
    direction: isMobile ? 'column' : 'row'
  }, avData.requiredDevices.includes('videoinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(DeviceSelect, {
    medium: "videoinput",
    onChange: upsertDevice,
    preselect: getPreselect('videoinput')
  })), avData.requiredDevices.includes('audioinput') && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(DeviceSelect, {
    medium: "audioinput",
    onChange: upsertDevice,
    preselect: getPreselect('audioinput')
  })));
};

export default DeviceSelection;