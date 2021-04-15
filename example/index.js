import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AVDevicesSetup } from 'av-devices-setup'
import 'av-devices-setup/styles.css'
import Backdrop from '@material-ui/core/Backdrop'

function HelloWorld() {
  const [showSetup, setShowSetup] = React.useState(false)

  return (
    <div className="example-container">
      <Backdrop open={true} classes={{ root: 'avds-backdrop' }}>
        <div className="avds-card">
          <AVDevicesSetup
            {...{
              show: true,
              requiredDevices: ['audioinput', 'videoinput'],
              avDevices: null,
              onComplete: null,
              onCancel: null,
            }}
          />
        </div>
      </Backdrop>
    </div>
  )
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'))
