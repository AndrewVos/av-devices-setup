import { AVDeviceProvider } from './AVDeviceProvider'
import AVDevicesSetup from './AVDevicesSetup'

const App = ({ requiredDevices, avDevices, onChange, persist, userOptions }) => {
  return (
    <AVDeviceProvider>
      <AVDevicesSetup
        {...{ requiredDevices, avDevices, onChange, persist, userOptions }}
      />
    </AVDeviceProvider>
  )
}

export default App
