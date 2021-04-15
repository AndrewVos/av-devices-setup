import { AUDIO_INPUT_OPTIONS } from './constants'

const getPermissions = (required) =>
  navigator.mediaDevices.getUserMedia(required).catch((err) => err)
export { getPermissions }

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
export { getMediaDevicesList }

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
export { recordAudioToBlob }

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
export { playAudioBlob }

const getSupportedConstraints = (constraints) => {
  const audioInputOptions = _.pickBy(
    _.pick(navigator.mediaDevices.getSupportedConstraints(), AUDIO_INPUT_OPTIONS),
    (a) => a
  )
  if (_.isEmpty(constraints)) return audioInputOptions
}
export { getSupportedConstraints }
