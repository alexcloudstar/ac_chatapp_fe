import { Room } from '../../stories'

import styles from './rooms.module.css'

const Rooms = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  }

  return (
    <div className={styles.container}>
      <h2 className="mt-[35px] mb-[15px]">Chatrooms</h2>
      <Room owner={user.firstName} isFavorite />
    </div>
  )
}

export default Rooms
