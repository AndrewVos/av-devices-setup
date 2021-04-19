function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 *
 * @param deviceId - String: mediaDevice identifier
 * @param length - Number: number of milliseconds to record
 * @param constraints - Array of web media constraints
 * @returns {[Promise<unknown>, cancel]}
 */
var recordAudioToBlob = function recordAudioToBlob(_ref) {
  var deviceId = _ref.deviceId,
      length = _ref.length,
      constraints = _ref.constraints;
  var timeout,
      mediaRecorder,
      chunks = [];

  var cancel = function cancel() {
    clearTimeout(timeout);
    mediaRecorder.removeEventListener('stop', mediaRecorder);
    chunks = [];
  };

  var recorder = new Promise(function (resolve) {
    navigator.mediaDevices.getUserMedia({
      audio: _extends({}, constraints, {
        deviceId: deviceId
      })
    }).then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function () {
        var blob = new Blob(chunks, {
          type: 'audio/ogg; codecs=opus'
        });
        resolve(blob);
      };

      timeout = setTimeout(function () {
        return mediaRecorder.stop();
      }, length);
    });
  });
  return [recorder, cancel];
};
/**
 *
 * @param blob - an audio blob
 * @returns {[Promise<unknown>, cancel]}
 */


var playAudioBlob = function playAudioBlob(blob) {
  var url = URL.createObjectURL(blob);
  var audio = new Audio();
  audio.src = url;
  audio.play();
  var playing = new Promise(function (resolve) {
    var pollForEnd = setInterval(function () {
      if (audio.ended) {
        clearInterval(pollForEnd);
        resolve(true);
      }
    }, 100);
  });

  var cancel = function cancel() {
    audio.pause();
  };

  return [playing, cancel];
};

export { playAudioBlob, recordAudioToBlob };