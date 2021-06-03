## AV Devices Setup

A React component to select, test and save (with a cookie) a user's hardware audio & video device config.

### Features

- Configures web standard `MediaDevice` device types: audioinput, audiooutput, videoinput
- Configuration is saved to a static client cookie
- Audioinput (mic) test

### Component Installation

To use the component with the included CSS, mount it like this:

```
import 'av-devices-setup/styles.css'
...
...
<AVDevicesSetup
        {...{
          show: showSetup,
          requiredDevices: ['audioinput'],
          onComplete: handleComplete,
          onCancel: handleCancel,
        }}
      />
```
`requiredDevices` can be any of: audioinput, audiooutput, videoinput

### Customisation
Current options, passed in via `options` prop:

```
{
    styles: {
        soundmeterColor: '#xxxxxx'
    }
}
```

These CSS styles can be overridden by importing your own CSS styles instead of the included ones.
```
* {
  font-family: proxima-nova, sans-serif;
}
select {}
.button {}
```

### Example usage

If you want to test the component out, run the example:

```
yarn install
yarn run standalone
```
