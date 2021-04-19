import { validateDevice } from '../helpers';

const validateConfig = (requiredDevices, configuredDevices) => {
  return requiredDevices.every(requiredDevice => configuredDevices.map(d => d.kind).includes(requiredDevice)) && configuredDevices.every(device => validateDevice(device));
};

export { validateConfig };