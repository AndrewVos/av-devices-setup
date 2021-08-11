import { validateDevice } from '../helpers'

const validateConfig = (requiredDevices, configuredDevices) => {
  return (
    requiredDevices
      .filter(requiredDevice =>
        ['audioinput', 'videoinput'].includes(requiredDevice.kind)
      )
      .every(requiredDevice =>
        configuredDevices.map(d => d.kind).includes(requiredDevice)
      ) && configuredDevices.every(device => validateDevice(device))
  )
}
export { validateConfig }
