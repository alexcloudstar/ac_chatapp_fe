import { FC } from 'react'

type AppProps = {
  name: string
}

const App: FC<AppProps> = ({ name }) => {
  return <h1>My name is: {name}</h1>
}

export default App
