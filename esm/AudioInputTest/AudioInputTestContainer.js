var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import styled from 'styled-components';
import AudioInputTest from './AudioInputTest';
var Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  background: #f7f9fa;\n  padding: 12px;\n  margin-top: 20px;\n"])));

var AudioInputTestContainer = function AudioInputTestContainer(_ref) {
  var device = _ref.device,
      expanded = _ref.expanded;
  var columnLayout = isMobile || expanded;
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
    device: device,
    hideProgress: !expanded
  }))));
};

export default AudioInputTestContainer;