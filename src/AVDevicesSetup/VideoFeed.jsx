import { CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import { AVDeviceContextConsumer } from './AVDeviceProvider'

const VideoFeed = () => {
  const [status, setStatus] = useState('loading')

  return (
    <AVDeviceContextConsumer>
      {({ avData }) => {
        return (
          <div
            style={{
              minHeight: 200,
              minWidth: 300,
              background: '#dfe6ed',
              border: '2px solid #b2bec8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {status === 'loading' && <CircularProgress style={{ color: '#bdc3c9' }} />}
          </div>
        )
      }}
    </AVDeviceContextConsumer>
  )
}

export default VideoFeed
