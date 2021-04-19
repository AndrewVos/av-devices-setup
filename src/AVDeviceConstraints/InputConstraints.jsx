import LinearProgress from '@material-ui/core/LinearProgress'
import MuiCheckbox from './MuiCheckbox'

// TODO: this needs to be refactored to the same pattern as the other components
// Should take an array of required devices and an array of desired constraints
// Output checkboxes should reflect convolution of those two arrays
const InputConstraints = ({ constraints, disabled, onChange }) => {
  const onUpdate = (data) => {
    const newConstraints = { ...constraints, [data.name]: !data.value }
    onChange(newConstraints)
  }

  return !constraints || _.isEmpty(constraints) ? (
    <LinearProgress style={{ width: '100%', margin: '13px 10px 13px 0' }} />
  ) : (
    Object.entries(constraints).map((entry) => (
      <MuiCheckbox
        key={entry[0]}
        data={{
          name: entry[0],
          label: _.startCase(entry[0]),
          value: entry[1],
        }}
        disabled={disabled}
        onClick={onUpdate}
      />
    ))
  )
}

export default InputConstraints
