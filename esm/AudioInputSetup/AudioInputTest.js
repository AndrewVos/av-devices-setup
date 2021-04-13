import RrButton from "../AVDevicesSetup/RrButton";
import DeviceTestProgress from '../DeviceSetup/DeviceTestProgress';
import { playAudioBlob, recordAudioToBlob } from '../helpers';
const TEST_PERIOD = 5 * 1000; // milliseconds

const ANIMATE_STEP_SIZE = 3; // % of complete

const AudioInputTest = ({
  device,
  onChange,
  constraints
}) => {
  const [progress, setProgress] = useState(0);
  const [testState, setTestState] = useState(null);
  const [testAudio, setTestAudio] = useState(null);
  const [timeFunc, setTimeFunc] = useState(null);
  const [cancelMedia, setCancelMedia] = useState(null);
  useEffect(() => {
    clearInterval(timeFunc);
    setTimeFunc(null);

    if (testAudio) {
      setTestState('playing');
      animateProgress(true);
      playTestAudio();
    }
  }, [testAudio]);

  const beginTest = () => {
    setProgress(0);
    setTestState('recording');
    animateProgress();
    recordTestAudio();
    onChange({
      testing: true
    });
  };

  const cancelTest = () => {
    clearInterval(timeFunc);
    setTimeFunc(null);
    onChange({
      testing: false
    });
    setTestState(null);
    setTestAudio(null);
    setProgress(0);
    cancelMedia();
  };

  const animateProgress = reverse => {
    const animateInterval = setInterval(() => {
      setProgress(prevProgress => {
        return prevProgress + (reverse ? -1 : 1) * ANIMATE_STEP_SIZE;
      });
    }, TEST_PERIOD / (100 / ANIMATE_STEP_SIZE));
    setTimeFunc(animateInterval);
  };

  const recordTestAudio = () => {
    const [blobPromise, cancel] = recordAudioToBlob({
      deviceId: device.deviceId,
      length: TEST_PERIOD,
      constraints
    });
    setCancelMedia(() => cancel);
    blobPromise.then(blob => {
      setTestAudio(blob);
    });
  };

  const playTestAudio = () => {
    const [playing, cancel] = playAudioBlob(testAudio);
    setCancelMedia(() => cancel);
    playing.then(() => {
      setTestState(null);
      setTestAudio(null);
      onChange({
        testing: false
      });
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column remaining space-right"
  }, /*#__PURE__*/React.createElement(RrButton, {
    style: {
      minWidth: 100
    },
    title: testState ? 'cancel' : 'test mic',
    type: testState ? 'cancel' : '',
    icon: testState ? 'cancel' : 'record',
    onClick: testState ? cancelTest : beginTest
  })), /*#__PURE__*/React.createElement("div", {
    className: "column remaining"
  }, /*#__PURE__*/React.createElement(DeviceTestProgress, {
    progress: progress,
    testState: testState
  })));
};

export default AudioInputTest;