import React from 'react'

import styles from './preview.module.css'

import { MessagePreview } from '@/stories'

const Preview = () => {
  const data = {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      avatar:
        'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
    },
    message: 'Will do, super, thank you ❤️😁',
    time: 'Tue',
  }

  return (
    <>
      <MessagePreview
        user={data.user}
        time={data.time}
        message={data.message}
        classes="text-[13px] mb-[25px]"
      />
    </>
  )
}

export default Preview
