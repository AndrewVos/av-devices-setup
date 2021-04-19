var _templateObject, _templateObject2;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import CircularProgress from '@material-ui/core/CircularProgress';
import { validateDevice } from '../helpers';
import styled from 'styled-components';
var FeedFrame = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  min-height: 200px;\n  width: 100%;\n  background: #dfe6ed;\n  border: 2px solid #b2bec8;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var Feed = styled.video(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  outline: 2px solid #b2bec8;\n  display: ", ";\n"])), function (props) {
  return props.show ? 'block' : 'none';
});

var VideoFeed = function VideoFeed(_ref) {
  var device = _ref.device;

  var _useState = useState('loading'),
      status = _useState[0],
      setStatus = _useState[1];

  var _useState2 = useState(),
      stream = _useState2[0],
      setStream = _useState2[1];

  function stopMediaTracks() {
    if (!!stream) stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  useEffect(function () {
    return function () {
      stopMediaTracks();
    };
  }, []);
  useEffect(function () {
    stopMediaTracks();

    if (device && validateDevice(device)) {
      navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: device.deviceId
          }
        }
      }).then(function (videoStream) {
        var video = document.getElementById('webcam-feed');
        video.srcObject = videoStream;
        video.addEventListener('canplay', function () {
          video.play();
        });
        setStream(videoStream);
        setStatus('streaming');
      })["catch"](function () {
        console.log('Something went wrong!');
      });
    }
  }, [device]);
  return /*#__PURE__*/React.createElement(FeedFrame, null, status === 'loading' && /*#__PURE__*/React.createElement(CircularProgress, {
    style: {
      color: '#bdc3c9'
    }
  }), /*#__PURE__*/React.createElement(Feed, {
    loop: true,
    autoplay: true,
    muted: true,
    id: "webcam-feed",
    show: status === 'streaming'
  }));
};

export default VideoFeed;