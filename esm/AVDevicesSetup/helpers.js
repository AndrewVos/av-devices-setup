import { validateDevice } from '../helpers';

var validateConfig = function validateConfig(requiredDevices, configuredDevices) {
  return requiredDevices.every(function (requiredDevice) {
    return configuredDevices.map(function (d) {
      return d.kind;
    }).includes(requiredDevice);
  }) && configuredDevices.every(function (device) {
    return validateDevice(device);
  });
};

export { validateConfig };