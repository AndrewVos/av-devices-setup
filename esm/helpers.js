var validateDevice = function validateDevice(device) {
  return !!device && _.keys(_.pick(device, ['deviceId', 'kind', 'label'])).length === 3;
};

export { validateDevice };