import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import DeviceSelect from '../AVDeviceSelect/DeviceSelect'
import { AVDeviceContext } from './AVDeviceProvider'

const DeviceSelection = ({ preselect }) => {
  const { avData, upsertDevice } = useContext(AVDeviceContext)

  const getPreselect = (kind) =>
    !!preselect && preselect.filter((device) => device.kind === kind)[0]

  return (
    <Grid
      item
      container
      spacing={isMobile ? 1 : 3}
      direction={isMobile ? 'column' : 'row'}
    >
      {avData.requiredDevices.includes('videoinput') && (
        <Grid item xs>
          <DeviceSelect
            medium="videoinput"
            onChange={upsertDevice}
            preselect={getPreselect('videoinput')}
          />
        </Grid>
      )}
      {avData.requiredDevices.includes('audioinput') && (
        <Grid item xs>
          <DeviceSelect
            medium="audioinput"
            onChange={upsertDevice}
            preselect={getPreselect('audioinput')}
          />
        </Grid>
      )}
    </Grid>
  )
}

DeviceSelection.propTypes = {}

export default DeviceSelection
