const InputAdvice = ({
  advice
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "smaller bold"
  }, advice.heading), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    className: "hyphen-bullet no-padding caption"
  }, advice.listItems.map(item => /*#__PURE__*/React.createElement("li", {
    key: item
  }, item)))));
};

export default InputAdvice;