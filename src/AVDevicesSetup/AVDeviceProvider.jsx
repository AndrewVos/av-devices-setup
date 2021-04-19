import { createContext } from 'react'
import { validateDevice } from '../helpers'
const AVDeviceContext = createContext()
const { Provider, Consumer } = AVDeviceContext

const AVDeviceProvider = ({ children }) => {
  const [avData, setAvData] = useState({
    configuredDevices: [],
    requiredDevices: [],
  })

  const upsertDevice = (device) => {
    if (!!device && validateDevice(device)) {
      setAvData({
        ...avData,
        configuredDevices: _.unionBy([device], avData.configuredDevices, 'kind'),
      })
    }
  }

  return <Provider value={{ avData, setAvData, upsertDevice }}>{children}</Provider>
}

export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext }
