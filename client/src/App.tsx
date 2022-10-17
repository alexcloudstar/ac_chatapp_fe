import styles from './app.module.css'
import { ChatHeader, Rooms } from './components'

function App() {
  return (
    <main className="flex flex-col w-[375px] h-[812px] pt-[50px] pr-[30px] pl-[30px] pb-[30px] text-white bg-[#596787] rounded-[40px]">
      <ChatHeader />
      <Rooms />
    </main>
  )
}

export default App
