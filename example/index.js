import React from 'react'
import ReactDOM from 'react-dom'
import 'av-devices-setup/styles.css'
import './index.css'
import AVDevicesSetup from 'av-devices-setup'
import Backdrop from '@material-ui/core/Backdrop'
import styled from 'styled-components'

const Modal = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: none;
  background: #ffffff;
`

function HelloWorld() {
  const [showSetup] = React.useState(true)

  return (
    <div className="example-container">
      {/* <button
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 100000 }}
        onClick={() => setShowSetup(!showSetup)}
      >
        Toggle
      </button> */}
      <Backdrop
        open={showSetup}
        style={{ zIndex: 1000 }}
        classes={{ root: 'avds-backdrop' }}
      >
        <Modal>
          <AVDevicesSetup
            {...{
              persist: false,
              requiredDevices: ['audioinput', 'videoinput'],
              avDevices: null,
              onComplete: null,
              onCancel: null,
            }}
          />
        </Modal>
      </Backdrop>
    </div>
  )
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'))
