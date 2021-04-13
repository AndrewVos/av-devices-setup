import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const MuiCheckbox = ({
  data,
  onClick,
  disabled
}) => {
  return /*#__PURE__*/React.createElement(FormControlLabel, {
    classes: {
      label: 'mui-checkbox-label'
    },
    disabled: disabled,
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: data.value,
      name: data.name,
      disabled: disabled,
      onClick: () => onClick(data),
      classes: {
        root: 'mui-checkbox',
        disabled: 'mui-checkbox disabled'
      },
      icon: /*#__PURE__*/React.createElement(CheckBoxOutlineBlankIcon, {
        className: "mui-checkbox-icon"
      }),
      checkedIcon: /*#__PURE__*/React.createElement(CheckBoxIcon, {
        className: "mui-checkbox-icon"
      })
    }),
    label: data.label
  });
};

export default MuiCheckbox;