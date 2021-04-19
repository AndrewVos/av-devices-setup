import Button from './Button';
import AudioInputTestProgress from './AudioInputTestProgress';
import { playAudioBlob, recordAudioToBlob } from './web_media';
var TEST_PERIOD = 5 * 1000; // milliseconds

var ANIMATE_STEP_SIZE = 3; // % of complete

var AudioInputTest = function AudioInputTest(_ref) {
  var device = _ref.device,
      onChange = _ref.onChange,
      constraints = _ref.constraints,
      hideProgress = _ref.hideProgress;

  var _useState = useState(0),
      progress = _useState[0],
      setProgress = _useState[1];

  var _useState2 = useState('default'),
      testState = _useState2[0],
      setTestState = _useState2[1];

  var _useState3 = useState(null),
      testAudio = _useState3[0],
      setTestAudio = _useState3[1];

  var _useState4 = useState(null),
      timeFunc = _useState4[0],
      setTimeFunc = _useState4[1];

  var _useState5 = useState(null),
      cancelMedia = _useState5[0],
      setCancelMedia = _useState5[1];

  useEffect(function () {
    clearInterval(timeFunc);
    setTimeFunc(null);

    if (testAudio) {
      setTestState('playing');
      animateProgress(true);
      playTestAudio();
    }
  }, [testAudio]);

  var beginTest = function beginTest() {
    setProgress(0);
    setTestState('recording');
    animateProgress();
    recordTestAudio();
    if (onChange) onChange({
      testing: true
    });
  };

  var cancelTest = function cancelTest() {
    clearInterval(timeFunc);
    setTimeFunc(null);
    if (onChange) onChange({
      testing: false
    });
    setTestState('default');
    setTestAudio(null);
    setProgress(0);
    cancelMedia();
  };

  var animateProgress = function animateProgress(reverse) {
    var animateInterval = setInterval(function () {
      setProgress(function (prevProgress) {
        return prevProgress + (reverse ? -1 : 1) * ANIMATE_STEP_SIZE;
      });
    }, TEST_PERIOD / (100 / ANIMATE_STEP_SIZE));
    setTimeFunc(animateInterval);
  };

  var recordTestAudio = function recordTestAudio() {
    var _recordAudioToBlob = recordAudioToBlob({
      deviceId: device.deviceId,
      length: TEST_PERIOD,
      constraints: constraints
    }),
        blobPromise = _recordAudioToBlob[0],
        cancel = _recordAudioToBlob[1];

    setCancelMedia(function () {
      return cancel;
    });
    blobPromise.then(function (blob) {
      setTestAudio(blob);
    });
  };

  var playTestAudio = function playTestAudio() {
    var _playAudioBlob = playAudioBlob(testAudio),
        playing = _playAudioBlob[0],
        cancel = _playAudioBlob[1];

    setCancelMedia(function () {
      return cancel;
    });
    playing.then(function () {
      setTestState('default');
      setTestAudio(null);
      if (onChange) onChange({
        testing: false
      });
    });
  };

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      minWidth: 80,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: testState === 'default' ? 'record' : hideProgress ? testState : 'cancel',
    type: testState,
    icon: testState === 'default' ? 'record' : 'cancel',
    onClick: testState === 'default' ? beginTest : cancelTest
  })), !hideProgress && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(AudioInputTestProgress, {
    progress: progress,
    testState: testState !== 'default' && testState
  })));
};

export default AudioInputTest;