import { CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import { AVDeviceContextConsumer } from './AVDeviceProvider'
import styled from 'styled-components'

const FeedFrame = styled.div`
  min-height: 200px;
  width: 100%;
  background: #dfe6ed;
  border: 2px solid #b2bec8;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VideoFeed = () => {
  const [status, setStatus] = useState('loading')

  return (
    <AVDeviceContextConsumer>
      {({ avData }) => {
        return (
          <FeedFrame>
            {status === 'loading' && <CircularProgress style={{ color: '#bdc3c9' }} />}
          </FeedFrame>
        )
      }}
    </AVDeviceContextConsumer>
  )
}

export default VideoFeed
