import RrButton from './RrButton'

const DeviceError = ({ error, onClear }) => {
  const getHelptext = () => {
    switch (error) {
      case 'DOMException: Permission denied':
      case 'NotAllowedError: Permission denied':
        return (
          <p>
            You need to change your browser permissions to allow the app to use your
            device. Change your permissions then click "try again" <br /> <br />(
            <i>you might need to refresh/reload the page, depending on your browser</i>)
          </p>
        )
      case 'DOMException: Could not start video source':
      case 'NotReadableError: Could not start video source':
        return (
          <p>
            It looks like your device is in use by another program on your computer -
            close that other program and click "try again" <br /> <br />(
            <i>If it doesn't work immediately, then try to refresh/reload the page</i>)
          </p>
        )
    }
  }

  return (
    <div className="box clear">
      <div className="row">
        <div className="column">{getHelptext()}</div>
      </div>
      <div className="row justify-flex-end">
        <RrButton title="Try again" type="primary" onClick={onClear} />
      </div>
    </div>
  )
}

export default DeviceError
