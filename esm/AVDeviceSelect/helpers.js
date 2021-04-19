/**
 * Return available devices, filtered by type and direction. Doesn't return default devices as it
 * interferes with USB hot plugging
 * @param medium - string: Web media device kind, e.g. 'audioinput'
 * @returns {Promise<MediaDeviceInfo[]>}
 */
const getMediaDevicesList = medium => {
  const devices = navigator.mediaDevices.enumerateDevices();

  if (medium) {
    return devices.then(devices => devices.filter(device => device.kind.includes(medium) && device.deviceId !== 'default').reverse());
  } else {
    return devices;
  }
};

const getPermissions = required => navigator.mediaDevices.getUserMedia(required).catch(err => err);

const reduceMediaDeviceInfo = deviceInfo => {
  const {
    deviceId,
    kind,
    label
  } = deviceInfo;
  return {
    deviceId,
    kind,
    label
  };
};

const getMediaLabel = medium => {
  switch (medium) {
    case 'audioinput':
      return 'Microphone';

    case 'videoinput':
      return 'Webcam';

    default:
      return 'Device';
  }
};

export { getPermissions, getMediaDevicesList, getMediaLabel, reduceMediaDeviceInfo };