import './App.css'
import { Button } from './stories'

function App() {
  return (
    <div className="container w-full max-w-full flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold underline text-red-500 mb-8">
        Hello world!
      </h1>

      <Button
        label="Click me"
        backgroundColor="red"
        primary={true}
        key="exampleBtn"
        onClick={() => console.log('I was clicked')}
        size="large"
      />
    </div>
  )
}

export default App
