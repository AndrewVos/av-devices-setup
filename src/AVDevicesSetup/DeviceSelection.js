import { Grid } from '@material-ui/core'
import DeviceSelect from './DeviceSelect'
import { isMobile } from 'react-device-detect'
import { AVDeviceContext } from './AVDeviceProvider'

const DeviceSelection = ({ preselect }) => {
  const { upsertDevice } = useContext(AVDeviceContext)

  const getPreselect = (kind) =>
    !!preselect && preselect.filter((device) => device.kind === kind)[0]

  return (
    <Grid item container spacing={isMobile ? 1 : 3}>
      <Grid item xs={12} sm={6}>
        <DeviceSelect
          medium="videoinput"
          onChange={upsertDevice}
          preselect={getPreselect('videoinput')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceSelect
          medium="audioinput"
          onChange={upsertDevice}
          preselect={getPreselect('audioinput')}
        />
      </Grid>
    </Grid>
  )
}

DeviceSelection.propTypes = {}

export default DeviceSelection
