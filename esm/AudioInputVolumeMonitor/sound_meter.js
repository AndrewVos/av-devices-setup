function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export function volumeAudioProcess(event) {
  var buf = event.inputBuffer.getChannelData(0);
  var bufLength = buf.length;
  var sum = 0;
  var x; // Do a root-mean-square on the samples: sum up the squares...

  for (var i = 0; i < bufLength; i++) {
    x = buf[i];

    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }

    sum += x * x;
  } // ... then take the square root of the sum.


  var rms = Math.sqrt(sum / bufLength); // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."

  this.volume = Math.max(rms, this.volume * this.averaging);
}
export function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  var processor = audioContext.createScriptProcessor(1024);
  processor.onaudioprocess = volumeAudioProcess;
  processor.clipping = false;
  processor.lastClip = 0;
  processor.volume = 0;
  processor.clipLevel = clipLevel || 0.95;
  processor.averaging = averaging || 0.95;
  processor.clipLag = clipLag || 200; // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.

  processor.connect(audioContext.destination);

  processor.checkClipping = function () {
    if (!this.clipping) return false;
    if (this.lastClip + this.clipLag < window.performance.now()) this.clipping = false;
    return this.clipping;
  };

  processor.shutdown = function () {
    this.disconnect();
    this.onaudioprocess = null;
  };

  return processor;
}

var getSoundMeter = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var deviceId, audioCtx, stream, source, meter;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deviceId = _ref.deviceId;
            audioCtx = new AudioContext();
            _context.next = 4;
            return navigator.mediaDevices.getUserMedia({
              audio: {
                deviceId: {
                  exact: deviceId
                }
              }
            });

          case 4:
            stream = _context.sent;
            source = audioCtx.createMediaStreamSource(stream);
            meter = createAudioMeter(audioCtx);
            source.connect(meter);
            return _context.abrupt("return", meter);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSoundMeter(_x) {
    return _ref2.apply(this, arguments);
  };
}();

export { getSoundMeter };