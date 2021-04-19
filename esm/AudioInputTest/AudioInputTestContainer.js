var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

import { Grid } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import AudioInputTest from './AudioInputTest';
const Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  padding: 12px;\n  margin-top: 20px;\n"])));

const AudioInputTestContainer = (_ref) => {
  let {
    device,
    expanded,
    style
  } = _ref;
  const columnLayout = isMobile || expanded;
  console.log(style);
  return /*#__PURE__*/React.createElement(Container, {
    style: style
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: columnLayout ? 'column' : 'row',
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: columnLayout ? 12 : 7,
    style: {
      paddingLeft: 2
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, "Before you start"), /*#__PURE__*/React.createElement("small", null, "Record yourself saying \"hi\" so we can make sure it's all working")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    style: {
      marginLeft: columnLayout ? 0 : 8
    }
  }, /*#__PURE__*/React.createElement(AudioInputTest, {
    device,
    hideProgress: !expanded
  }))));
};

export default AudioInputTestContainer;