import classNames from 'classnames';
import PropTypes from 'prop-types';
import AVIcon from './AVIcon';

const toTitleCase = str => {
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


const Button = (_ref) => {
  let {
    title,
    type = '',
    icon,
    onClick,
    disabled,
    loading,
    style
  } = _ref;
  let startIcon;

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
      disabled
    }),
    style: style
  }, icon && !loading && startIcon, toTitleCase(title));
};

export default Button;
export { toTitleCase };