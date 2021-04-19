var _templateObject, _templateObject2;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import CircularProgress from '@material-ui/core/CircularProgress';
import { validateDevice } from '../helpers';
import styled from 'styled-components';
const FeedFrame = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  min-height: 200px;\n  width: 100%;\n  background: #dfe6ed;\n  border: 2px solid #b2bec8;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
const Feed = styled.video(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  background: black;\n  padding-bottom: 1px;\n  outline: 2px solid #b2bec8;\n  display: ", ";\n"])), props => props.show ? 'block' : 'none');

const VideoFeed = (_ref) => {
  let {
    device,
    maxHeight
  } = _ref;
  const [status, setStatus] = useState('loading');
  const [stream, setStream] = useState();

  function stopMediaTracks() {
    if (!!stream) stream.getTracks().forEach(track => {
      track.stop();
    });
  }

  useEffect(() => {
    return () => {
      stopMediaTracks();
    };
  }, []);
  useEffect(() => {
    stopMediaTracks();

    if (device && validateDevice(device)) {
      navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: device.deviceId
          }
        }
      }).then(videoStream => {
        const video = document.getElementById('webcam-feed');
        video.srcObject = videoStream;
        video.addEventListener('canplay', () => {
          video.play();
        });
        setStream(videoStream);
        setStatus('streaming');
      }).catch(function () {
        console.log('Something went wrong!');
      });
    }
  }, [device]);
  return /*#__PURE__*/React.createElement(FeedFrame, null, status === 'loading' && /*#__PURE__*/React.createElement(CircularProgress, {
    style: {
      color: '#bdc3c9'
    }
  }), /*#__PURE__*/React.createElement(Feed, {
    style: {
      maxHeight
    },
    loop: true,
    autoplay: true,
    muted: true,
    id: "webcam-feed",
    show: status === 'streaming'
  }));
};

export default VideoFeed;