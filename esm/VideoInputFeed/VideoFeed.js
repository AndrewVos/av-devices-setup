var _s = $RefreshSig$();

import CircularProgress from '@material-ui/core/CircularProgress';
import { validateDevice } from '../helpers';
import styled from 'styled-components';
const FeedFrame = styled.div`
  min-height: 200px;
  width: 100%;
  background: #dfe6ed;
  border: 2px solid #b2bec8;
  display: flex;
  align-items: center;
  justify-content: center;
`;
_c = FeedFrame;
const Feed = styled.video`
  width: 100%;
  outline: 2px solid #b2bec8;
  display: ${props => props.show ? 'block' : 'none'};
`;
_c2 = Feed;

const VideoFeed = ({
  device
}) => {
  _s();

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
    loop: true,
    autoplay: true,
    muted: true,
    id: "webcam-feed",
    show: status === 'streaming'
  }));
};

_s(VideoFeed, "ZZStGEd2nZ/MHtMshCZVaWAk9DQ=");

_c3 = VideoFeed;
export default VideoFeed;

var _c, _c2, _c3;

$RefreshReg$(_c, "FeedFrame");
$RefreshReg$(_c2, "Feed");
$RefreshReg$(_c3, "VideoFeed");