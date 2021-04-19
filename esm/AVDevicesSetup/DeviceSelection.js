var _s = $RefreshSig$();

import DeviceSelect from '../AVDeviceSelect/DeviceSelect';
import { AVDeviceContext } from './AVDeviceProvider';

const DeviceSelection = ({
  preselect
}) => {
  _s();

  const {
    avData,
    upsertDevice
  } = useContext(AVDeviceContext);

  const getPreselect = kind => !!preselect && preselect.filter(device => device.kind === kind)[0];

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

_s(DeviceSelection, "i3I0twQOHk0H8rfPzavApJuLvfk=");

_c = DeviceSelection;
DeviceSelection.propTypes = {};
export default DeviceSelection;

var _c;

$RefreshReg$(_c, "DeviceSelection");