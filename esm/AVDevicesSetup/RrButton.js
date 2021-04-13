import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ClearIcon from '@material-ui/icons/Clear';
import PublishIcon from '@material-ui/icons/Publish';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { toTitleCase } from "../helpers";
import classNames from 'classnames';
import loadingSvg from '../assets/circ-loading.svg';
import loadingSvgWhite from '../assets/circ-loading-white.svg';
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

const RrButton = ({
  title,
  type = '',
  icon,
  onClick,
  disabled,
  loading,
  style
}) => {
  let startIcon;

  if (icon) {
    switch (icon) {
      case 'record':
        startIcon = /*#__PURE__*/React.createElement(FiberManualRecordIcon, null);
        break;

      case 'cancel':
        startIcon = /*#__PURE__*/React.createElement(ClearIcon, null);
        break;

      case 'upload':
        startIcon = /*#__PURE__*/React.createElement(PublishIcon, null);
        break;

      case 'back':
        startIcon = /*#__PURE__*/React.createElement(ArrowBackIcon, null);
    }
  }

  return /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    className: classNames('button', 'rr-button', type, {
      disabled
    }),
    style: style
  }, icon && !loading && startIcon, loading ? /*#__PURE__*/React.createElement("img", {
    src: type === 'primary' ? loadingSvgWhite : loadingSvg,
    className: "svg"
  }) : toTitleCase(title));
};

export default RrButton;