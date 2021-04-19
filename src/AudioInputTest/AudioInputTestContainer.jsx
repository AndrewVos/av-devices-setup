import styled from 'styled-components'
import AudioInputTest from './AudioInputTest'

const Container = styled.div`
  background: #f7f9fa;
  padding: 12px;
  margin-top: 20px;
`

const AudioInputTestContainer = ({ device, expanded }) => {
  const columnLayout = isMobile || expanded

  return (
    <Container>
      <p className="input-label">Before you start</p>
      <Grid container direction={columnLayout ? 'column' : 'row'}>
        <Grid item xs={columnLayout ? 12 : 7} style={{ paddingLeft: 2 }}>
          <small>Record yourself saying "hi" so we can make sure it's all working</small>
        </Grid>
        <Grid
          item
          xs
          style={{ marginTop: columnLayout ? 10 : -8, marginLeft: columnLayout ? 0 : 8 }}
        >
          <AudioInputTest
            {...{ device, onChange: (res) => console.log(res), hideProgress: !expanded }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

AudioInputTestContainer.propTypes = {}

export default AudioInputTestContainer
