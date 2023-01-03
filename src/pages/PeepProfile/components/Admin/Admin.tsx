import { useParams } from 'react-router-dom'

const Admin = () => {
  const { username } = useParams<{ username: string }>()

  const onBan = () => {
    console.log('ban', username)
  }

  const onMute = () => {
    console.log('mute', username)
  }

  return (
    <div className="flex justify-evenly">
      <button className="bg-red-700 p-3 rounded-md" onClick={onBan}>
        ban
      </button>
      <button className="bg-orange-700 p-3 rounded-md" onClick={onMute}>
        mute
      </button>
    </div>
  )
}

export default Admin
