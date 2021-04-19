import { Grid } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import DeviceSelect from '../AVDeviceSelect/DeviceSelect';
import { AVDeviceContext } from './AVDeviceProvider';

const DeviceSelection = (_ref) => {
  let {
    preselect
  } = _ref;
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

export default DeviceSelection;