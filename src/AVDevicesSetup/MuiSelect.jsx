import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const MuiSelect = ({ items = [{}], selected = {}, onChange, idKey = 'id', disabled }) => (
  <FormControl fullWidth className="mui-form-control select" disabled={disabled}>
    <InputLabel
      id="input-device-label"
      classes={{ root: 'mui-input-label', shrink: 'mui-input-label-shrink' }}
    >
      Select Device
    </InputLabel>
    <Select
      labelId="input-device-label"
      id="input-device"
      onChange={onChange}
      value={selected}
      inputProps={{
        classes: {
          root: 'mui-input select',
        },
      }}
      classes={{
        icon: 'mui-select-icon',
        select: 'mui-select',
      }}
      disableUnderline
    >
      {items.map((item) => (
        <MenuItem key={item[idKey]} value={item}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

export default MuiSelect
