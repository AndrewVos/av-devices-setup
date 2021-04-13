import LinearProgress from '@material-ui/core/LinearProgress';
import MuiCheckbox from "./MuiCheckbox";

const InputConstraints = ({
  constraints,
  disabled,
  onChange
}) => {
  const onUpdate = data => {
    const newConstraints = { ...constraints,
      [data.name]: !data.value
    };
    onChange(newConstraints);
  };

  return !constraints || _.isEmpty(constraints) ? /*#__PURE__*/React.createElement(LinearProgress, {
    style: {
      width: '100%',
      margin: '13px 10px 13px 0'
    }
  }) : Object.entries(constraints).map(entry => /*#__PURE__*/React.createElement(MuiCheckbox, {
    key: entry[0],
    data: {
      name: entry[0],
      label: _.startCase(entry[0]),
      value: entry[1]
    },
    disabled: disabled,
    onClick: onUpdate
  }));
};

export default InputConstraints;