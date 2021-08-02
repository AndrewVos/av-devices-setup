import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import AudioInputTest from './AudioInputTest'

const Container = styled.div`
  padding: 12px;
  margin-top: 20px;
`

const AudioInputTestContainer = ({ device, outputDevice, expanded, style }) => {
  const columnLayout = isMobile || expanded

  return (
    <Container style={style}>
      <Grid
        container
        direction={columnLayout ? 'column' : 'row'}
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={columnLayout ? 12 : 7}>
          <p className="input-label">Before you start</p>
          <div style={{ paddingLeft: 2 }}>
            <small>
              Record yourself saying "hi" so we can make sure it's all working
            </small>
          </div>
        </Grid>
        <Grid item container xs style={{ paddingLeft: columnLayout ? 5 : 8 }}>
          <AudioInputTest {...{ device, outputDevice, hideProgress: !expanded }} />
        </Grid>
      </Grid>
    </Container>
  )
}

AudioInputTestContainer.propTypes = {}

export default AudioInputTestContainer
