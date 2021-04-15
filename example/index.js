import React from 'react'
import ReactDOM from 'react-dom'
import 'av-devices-setup/styles.css'
import './index.css'
import { AVDevicesSetup } from 'av-devices-setup'
import Backdrop from '@material-ui/core/Backdrop'
import styled from 'styled-components'

const Modal = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: none;
  background: #f8f9fb;
  box-shadow: inset 3px 3px 24px rgba(71, 77, 105, 0.18);
`

function HelloWorld() {
  const [showSetup, setShowSetup] = React.useState(false)

  return (
    <div className="example-container">
      <Backdrop open={true} classes={{ root: 'avds-backdrop' }}>
        <Modal>
          <AVDevicesSetup
            {...{
              show: true,
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
