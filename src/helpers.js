const validateConfig = (requiredDevices, configuredDevices) => {
  return (
    requiredDevices.every((requiredDevice) =>
      configuredDevices.map((d) => d.kind).includes(requiredDevice)
    ) && configuredDevices.every((device) => validateDevice(device))
  )
}

const validateDevice = (device) =>
  !!device && _.keys(_.pick(device, ['deviceId', 'kind', 'label'])).length === 3

const reduceMediaDeviceInfo = (deviceInfo) => {
  const { deviceId, kind, label } = deviceInfo
  return { deviceId, kind, label }
}

const toTitleCase = (str) => {
  str = str.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}

const arrayStats = {
  sum: function (array) {
    var num = 0
    for (var i = 0, l = array.length; i < l; i++) num += array[i]
    return num
  },

  mean: function (array) {
    return arrayStats.sum(array) / array.length
  },

  median: function (array) {
    array.sort(function (a, b) {
      return a - b
    })
    var mid = array.length / 2
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2
  },

  variance: function (array) {
    var mean = arrayStats.mean(array)
    return arrayStats.mean(
      array.map(function (num) {
        return Math.pow(num - mean, 2)
      })
    )
  },

  standardDeviation: function (array) {
    return Math.sqrt(arrayStats.variance(array))
  },
}

const getMediaLabel = (medium) => {
  switch (medium) {
    case 'audioinput':
      return 'Microphone'
    case 'videoinput':
      return 'Webcam'
    default:
      return 'Device'
  }
}

export {
  validateConfig,
  validateDevice,
  reduceMediaDeviceInfo,
  toTitleCase,
  arrayStats,
  getMediaLabel,
}
