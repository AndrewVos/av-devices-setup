import { Grid } from '@material-ui/core'
import DeviceSelect from './DeviceSelect'
import { isMobile } from 'react-device-detect'
import { useContext } from 'react'
import { AVDeviceContext } from './AVDeviceProvider'

const DeviceSelection = () => {
  const { upsertDevice } = useContext(AVDeviceContext)

  return (
    <Grid item container spacing={isMobile ? 1 : 3}>
      <Grid item xs={12} sm={6}>
        <DeviceSelect medium="audioinput" onChange={upsertDevice} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceSelect medium="videoinput" onChange={upsertDevice} />
      </Grid>
    </Grid>
  )
}

DeviceSelection.propTypes = {}

export default DeviceSelection
