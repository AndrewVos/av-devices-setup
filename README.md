## AV Devices Setup

A React component to select, test and save (with a cookie) a user's hardware audio & video device config.

### Features

- Configures web standard `MediaDevice` device types: audioinput, audiooutput, videoinput
- Configuration is saved to a static client cookie
- Audioinput (mic) test

### Component Installation

To use the component, mount it like this:

```
<AVDevicesSetup
        {...{
          show: showSetup,
          requiredDevices: ['audioinput'],
          onComplete: handleComplete,
          onCancel: handleCancel,
        }}
      />
```

### Example usage

If you want to test the component out, run the example:

```
yarn run standalone
```
