import { createContext, useState } from 'react'
const AVDeviceContext = createContext()
const { Provider, Consumer } = AVDeviceContext

const AVDeviceProvider = ({ children }) => {
  const [avData, setAvData] = useState({
    configuredDevices: [],
    requiredDevices: [],
  })

  const upsertDevice = (device) => {
    setAvData({
      ...avData,
      configuredDevices: _.unionBy([device], avData.configuredDevices, 'kind'),
    })
  }

  return <Provider value={{ avData, setAvData, upsertDevice }}>{children}</Provider>
}

export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext }
