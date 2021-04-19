import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import AudioInputTest from './AudioInputTest'

const Container = styled.div`
  padding: 12px;
  margin-top: 20px;
`

const AudioInputTestContainer = ({ device, expanded, style }) => {
  const columnLayout = isMobile || expanded

  console.log(style)

  return (
    <Container style={style}>
      <Grid container direction={columnLayout ? 'column' : 'row'} alignItems="center">
        <Grid item xs={columnLayout ? 12 : 7} style={{ paddingLeft: 2 }}>
          <p className="input-label">Before you start</p>
          <small>Record yourself saying "hi" so we can make sure it's all working</small>
        </Grid>
        <Grid item xs style={{ marginLeft: columnLayout ? 0 : 8 }}>
          <AudioInputTest {...{ device, hideProgress: !expanded }} />
        </Grid>
      </Grid>
    </Container>
  )
}

AudioInputTestContainer.propTypes = {}

export default AudioInputTestContainer
