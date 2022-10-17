import { Room } from '../../stories'

const Rooms = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  }

  return (
    <>
      <h2 className="mt-[35px] mb-[15px]">Chatrooms</h2>
      <div className="flex">
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
        <Room
          owner={`${user.firstName} ${user.lastName}`}
          isFavorite
          classes="mr-[15px]"
        />
      </div>
    </>
  )
}

export default Rooms
