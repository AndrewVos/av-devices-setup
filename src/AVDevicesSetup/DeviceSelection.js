import { Grid } from '@material-ui/core'
import AudioInputSelect from '../AudioInputSetup/AudioInputSelect'

const DeviceSelection = ({}) => {
  return (
    <Grid item container>
      <Grid item xs={12} sm={6}>
        <AudioInputSelect onChange={() => {}} />
      </Grid>
      <Grid item xs={12} sm={6}>
        video
      </Grid>
    </Grid>
  )
}

DeviceSelection.propTypes = {}

export default DeviceSelection
