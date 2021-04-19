const validateDevice = (device) =>
  !!device && _.keys(_.pick(device, ['deviceId', 'kind', 'label'])).length === 3

export { validateDevice }
