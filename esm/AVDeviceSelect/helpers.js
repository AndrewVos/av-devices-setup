/**
 * Return available devices, filtered by type and direction. Doesn't return default devices as it
 * interferes with USB hot plugging
 * @param medium - string: Web media device kind, e.g. 'audioinput'
 * @returns {Promise<MediaDeviceInfo[]>}
 */
var getMediaDevicesList = function getMediaDevicesList(medium) {
  var devices = navigator.mediaDevices.enumerateDevices();

  if (medium) {
    return devices.then(function (devices) {
      return devices.filter(function (device) {
        return device.kind.includes(medium) && device.deviceId !== 'default';
      }).reverse();
    });
  } else {
    return devices;
  }
};

var getPermissions = function getPermissions(required) {
  return navigator.mediaDevices.getUserMedia(required)["catch"](function (err) {
    return err;
  });
};

var reduceMediaDeviceInfo = function reduceMediaDeviceInfo(deviceInfo) {
  var deviceId = deviceInfo.deviceId,
      kind = deviceInfo.kind,
      label = deviceInfo.label;
  return {
    deviceId: deviceId,
    kind: kind,
    label: label
  };
};

var getMediaLabel = function getMediaLabel(medium) {
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