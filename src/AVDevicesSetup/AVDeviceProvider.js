import { createContext, useState } from 'react'
const AVDeviceContext = React.createContext()
const { Provider, Consumer } = AVDeviceContext

const AVDeviceProvider = ({ children }) => {
  const [avData, setAvData] = useState({})

  return <Provider value={{ avData, setAvData }}>{children}</Provider>
}

export { AVDeviceProvider, Consumer as AVDeviceContextConsumer, AVDeviceContext }
