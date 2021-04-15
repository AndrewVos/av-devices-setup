import { AUDIO_INPUT_OPTIONS } from './constants'

/**
 *
 * @param required - object { video: false, audio: true }
 * @returns {Promise<MediaStream>}
 */
const getPermissions = (required) =>
  navigator.mediaDevices.getUserMedia(required).catch((err) => err)

/**
 * Return available devices, filtered by type and direction. Doesn't return default devices as it
 * interferes with USB hot plugging
 * @param type - string: 'audio' or 'video'
 * @param direction - string: 'input' or 'output'
 * @returns {Promise<MediaDeviceInfo[]>}
 */
const getMediaDevicesList = ({ type, direction } = {}) => {
  const devices = navigator.mediaDevices.enumerateDevices()
  if (type || direction) {
    return devices.then((devices) =>
      devices
        .filter(
          (device) =>
            device.kind.includes(type) &&
            device.kind.includes(direction) &&
            device.deviceId !== 'default'
        )
        .reverse()
    )
  } else {
    return devices
  }
}

/**
 *
 * @param deviceId - mediaDevice identifier
 * @param length - number of milliseconds to record
 * @returns {[Promise<unknown>, cancel]}
 */
const recordAudioToBlob = ({ deviceId, length, constraints }) => {
  let timeout,
    mediaRecorder,
    chunks = []
  const cancel = () => {
    clearTimeout(timeout)
    mediaRecorder.removeEventListener('stop', mediaRecorder)
    chunks = []
  }
  const recorder = new Promise((resolve) => {
    navigator.mediaDevices
      .getUserMedia({ audio: { ...constraints, deviceId } })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.start()
        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data)
        }
        mediaRecorder.onstop = function () {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          resolve(blob)
        }
        timeout = setTimeout(() => mediaRecorder.stop(), length)
      })
  })
  return [recorder, cancel]
}

/**
 *
 * @param blob - an audio blob
 * @returns {[Promise<unknown>, cancel]}
 */
const playAudioBlob = (blob) => {
  const url = URL.createObjectURL(blob)
  const audio = new Audio()
  audio.src = url
  audio.play()

  const playing = new Promise((resolve) => {
    const pollForEnd = setInterval(() => {
      if (audio.ended) {
        clearInterval(pollForEnd)
        resolve(true)
      }
    }, 100)
  })

  const cancel = () => {
    audio.pause()
  }

  return [playing, cancel]
}

const validateDeviceConfig = (deviceConfig) =>
  _.keys(_.pick(deviceConfig?.device, ['deviceId', 'kind', 'label'])).length === 3 &&
  !!deviceConfig.constraints

const reduceMediaDeviceInfo = (deviceInfo) => {
  const { deviceId, kind, label } = deviceInfo
  return { deviceId, kind, label }
}

const getSupportedConstraints = (constraints) => {
  const audioInputOptions = _.pickBy(
    _.pick(navigator.mediaDevices.getSupportedConstraints(), AUDIO_INPUT_OPTIONS),
    (a) => a
  )
  if (_.isEmpty(constraints)) return audioInputOptions
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

export {
  getPermissions,
  getMediaDevicesList,
  recordAudioToBlob,
  playAudioBlob,
  validateDeviceConfig,
  reduceMediaDeviceInfo,
  getSupportedConstraints,
  toTitleCase,
  arrayStats,
}
