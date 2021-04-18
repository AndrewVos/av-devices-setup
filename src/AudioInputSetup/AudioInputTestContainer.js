import { Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import AudioInputTest from './AudioInputTest'

const Container = styled.div`
  background: #f7f9fa;
  padding: 12px;
  margin-top: 20px;
`

const AudioInputTestContainer = ({ device }) => {
  return (
    <Container>
      <p className="input-label">Before you start</p>
      <Grid container direction={isMobile ? 'column' : 'row'}>
        <Grid item xs={isMobile ? 12 : 7} style={{ paddingLeft: 2 }}>
          <small>Record yourself saying "hi" so we can make sure it's all working</small>
        </Grid>
        <Grid item xs>
          <AudioInputTest {...{ device, onChange: (res) => console.log(res) }} />
        </Grid>
      </Grid>
    </Container>
  )
}

AudioInputTestContainer.propTypes = {}

export default AudioInputTestContainer
