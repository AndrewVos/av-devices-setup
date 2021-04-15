import { Grid } from '@material-ui/core'
import DeviceSelect from './DeviceSelect'
import { isMobile } from 'react-device-detect'

const DeviceSelection = ({}) => {
  return (
    <Grid item container spacing={isMobile ? 1 : 3}>
      <Grid item xs={12} sm={6}>
        <DeviceSelect medium="audioinput" onChange={() => {}} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceSelect medium="videoinput" onChange={() => {}} />
      </Grid>
    </Grid>
  )
}

DeviceSelection.propTypes = {}

export default DeviceSelection
