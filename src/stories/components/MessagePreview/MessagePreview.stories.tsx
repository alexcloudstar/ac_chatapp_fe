import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MessagePreview } from './MessagePreview'

export default {
  title: 'Components/MessagePreview',
  component: MessagePreview,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MessagePreview>

const Template: ComponentStory<typeof MessagePreview> = (args) => (
  <MessagePreview {...args} />
)

export const Initial = Template.bind({})
Initial.args = {
  user: {
    username: 'John Doe',
    avatar:
      'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Close&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
  },
  message: 'Will do, super, thank you ❤️',
  time: 'Tue',
}
