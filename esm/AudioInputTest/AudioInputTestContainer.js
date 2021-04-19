import styled from 'styled-components';
import AudioInputTest from './AudioInputTest';
const Container = styled.div`
  background: #f7f9fa;
  padding: 12px;
  margin-top: 20px;
`;
_c = Container;

const AudioInputTestContainer = ({
  device,
  expanded
}) => {
  const columnLayout = isMobile || expanded;
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, "Before you start"), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: columnLayout ? 'column' : 'row'
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: columnLayout ? 12 : 7,
    style: {
      paddingLeft: 2
    }
  }, /*#__PURE__*/React.createElement("small", null, "Record yourself saying \"hi\" so we can make sure it's all working")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    style: {
      marginTop: columnLayout ? 10 : -8,
      marginLeft: columnLayout ? 0 : 8
    }
  }, /*#__PURE__*/React.createElement(AudioInputTest, {
    device,
    hideProgress: !expanded
  }))));
};

_c2 = AudioInputTestContainer;
AudioInputTestContainer.propTypes = {};
export default AudioInputTestContainer;

var _c, _c2;

$RefreshReg$(_c, "Container");
$RefreshReg$(_c2, "AudioInputTestContainer");