function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 *
 * @param deviceId - String: mediaDevice identifier
 * @param length - Number: number of milliseconds to record
 * @param constraints - Array of web media constraints
 * @returns {[Promise<unknown>, cancel]}
 */
const recordAudioToBlob = (_ref) => {
  let {
    deviceId,
    length,
    constraints
  } = _ref;
  let timeout,
      mediaRecorder,
      chunks = [];

  const cancel = () => {
    clearTimeout(timeout);
    mediaRecorder.removeEventListener('stop', mediaRecorder);
    chunks = [];
  };

  const recorder = new Promise(resolve => {
    navigator.mediaDevices.getUserMedia({
      audio: _extends({}, constraints, {
        deviceId
      })
    }).then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function () {
        const blob = new Blob(chunks, {
          type: 'audio/ogg; codecs=opus'
        });
        resolve(blob);
      };

      timeout = setTimeout(() => mediaRecorder.stop(), length);
    });
  });
  return [recorder, cancel];
};
/**
 *
 * @param blob - an audio blob
 * @returns {[Promise<unknown>, cancel]}
 */


const playAudioBlob = (blob, outputSinkId) => {
  const url = URL.createObjectURL(blob);
  const audio = new Audio();
  audio.src = url;

  if (outputSinkId) {
    audio.setSinkId(outputSinkId);
  }

  audio.play();
  const playing = new Promise(resolve => {
    const pollForEnd = setInterval(() => {
      if (audio.ended) {
        clearInterval(pollForEnd);
        resolve(true);
      }
    }, 100);
  });

  const cancel = () => {
    audio.pause();
  };

  return [playing, cancel];
};

export { playAudioBlob, recordAudioToBlob };