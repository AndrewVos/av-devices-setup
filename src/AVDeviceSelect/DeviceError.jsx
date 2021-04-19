const DeviceError = ({ error }) => {
  const getHelptext = () => {
    switch (error) {
      case 'DOMException: Permission denied':
      case 'NotAllowedError: Permission denied':
        return (
          <small>
            The browser can't access your device. Change your permissions and reload this
            page.
          </small>
        )
      case 'DOMException: Could not start video source':
      case 'NotReadableError: Could not start video source':
        return (
          <small>
            Your device is being used by another program - close it then reload this page.
          </small>
        )
    }
  }

  return <div style={{ color: '#ef1106' }}>{getHelptext()}</div>
}

export default DeviceError
