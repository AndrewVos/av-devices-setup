import { AVDeviceProvider } from './AVDeviceProvider'
import AVDevicesSetup from './AVDevicesSetup'

const App = ({ requiredDevices, avDevices, onChange, persist, options }) => {
  return (
    <AVDeviceProvider>
      <AVDevicesSetup {...{ requiredDevices, avDevices, onChange, persist, options }} />
    </AVDeviceProvider>
  )
}

export default App
