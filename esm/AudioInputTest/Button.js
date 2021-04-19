import classNames from 'classnames';
import AVIcon from './AVIcon';

var toTitleCase = function toTitleCase(str) {
  str = str.toLowerCase().split(' ');

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  return str.join(' ');
};
/**
 *
 * @param title
 * @param type - null, 'reverse', 'cancel'
 * @param icon
 * @param onClick
 * @param muiProps
 * @returns {JSX.Element}
 * @constructor
 */


var Button = function Button(_ref) {
  var title = _ref.title,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      icon = _ref.icon,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      loading = _ref.loading,
      style = _ref.style;
  var startIcon;

  if (icon) {
    switch (icon) {
      case 'record':
        startIcon = /*#__PURE__*/React.createElement(AVIcon, {
          iconName: "record",
          color: "white"
        });
        break;

      case 'cancel':
        startIcon = /*#__PURE__*/React.createElement(AVIcon, {
          iconName: "close",
          color: "white"
        });
        break;
    }
  }

  return /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    className: classNames('button', type, {
      disabled: disabled
    }),
    style: style
  }, icon && !loading && startIcon, toTitleCase(title));
};

export default Button;
export { toTitleCase };