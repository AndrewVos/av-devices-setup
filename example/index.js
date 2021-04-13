import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AVDevicesSetup } from "av-devices-setup";
import "av-devices-setup/styles.css";

function HelloWorld() {
  const [showSetup, setShowSetup] = React.useState(false)

  return (
    <div className="example-container">
      <AVDevicesSetup
        {...{
          show: showSetup,
          requiredDevices: ['audioinput'],
          avDevices: null,
          onComplete: () => setShowSetup(false),
          onCancel: () => setShowSetup(false),
        }}
      />
      <button className="example-button" onClick={() => setShowSetup(true)}>AV Devices Setup</button>
    </div>
  )
}
ReactDOM.render(<HelloWorld />, document.getElementById('app'));