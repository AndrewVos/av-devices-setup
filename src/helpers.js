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

const getSoundMeter = async ({ deviceId }) => {
  let audioCtx = new AudioContext()

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId: { exact: deviceId } },
  })
  const source = audioCtx.createMediaStreamSource(stream)
  const meter = createAudioMeter(audioCtx)
  source.connect(meter)
  return meter
}

function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  var processor = audioContext.createScriptProcessor(1024)
  processor.onaudioprocess = volumeAudioProcess
  processor.clipping = false
  processor.lastClip = 0
  processor.volume = 0
  processor.clipLevel = clipLevel || 0.95
  processor.averaging = averaging || 0.95
  processor.clipLag = clipLag || 200

  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination)

  processor.checkClipping = function () {
    if (!this.clipping) return false
    if (this.lastClip + this.clipLag < window.performance.now()) this.clipping = false
    return this.clipping
  }

  processor.shutdown = function () {
    this.disconnect()
    this.onaudioprocess = null
  }

  return processor
}

function volumeAudioProcess(event) {
  var buf = event.inputBuffer.getChannelData(0)
  var bufLength = buf.length
  var sum = 0
  var x

  // Do a root-mean-square on the samples: sum up the squares...
  for (var i = 0; i < bufLength; i++) {
    x = buf[i]
    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true
      this.lastClip = window.performance.now()
    }
    sum += x * x
  }

  // ... then take the square root of the sum.
  var rms = Math.sqrt(sum / bufLength)

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging)
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

export {
  getPermissions,
  getMediaDevicesList,
  recordAudioToBlob,
  playAudioBlob,
  getSoundMeter,
  validateDeviceConfig,
  reduceMediaDeviceInfo,
  getSupportedConstraints,
  toTitleCase,
}
