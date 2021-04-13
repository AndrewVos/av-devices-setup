import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const MuiSelect = ({
  items = [{}],
  selected = {},
  onChange,
  idKey = 'id',
  disabled
}) => /*#__PURE__*/React.createElement(FormControl, {
  fullWidth: true,
  className: "mui-form-control select",
  disabled: disabled
}, /*#__PURE__*/React.createElement(InputLabel, {
  id: "input-device-label",
  classes: {
    root: 'mui-input-label',
    shrink: 'mui-input-label-shrink'
  }
}, "Select Device"), /*#__PURE__*/React.createElement(Select, {
  labelId: "input-device-label",
  id: "input-device",
  onChange: onChange,
  value: selected,
  inputProps: {
    classes: {
      root: 'mui-input select'
    }
  },
  classes: {
    icon: 'mui-select-icon',
    select: 'mui-select'
  },
  disableUnderline: true
}, items.map(item => /*#__PURE__*/React.createElement(MenuItem, {
  key: item[idKey],
  value: item
}, item.label))));

export default MuiSelect;