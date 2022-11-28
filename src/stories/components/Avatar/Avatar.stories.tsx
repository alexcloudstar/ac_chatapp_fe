import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Avatar } from './Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Image = Template.bind({})
Image.args = {
  user: {
    username: 'johndoe',
    avatar: 'https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99',
  },
  width: 120,
  height: 120,
}

export const Initials = Template.bind({})
Initials.args = {
  user: {
    username: 'johndoe',
  },
  bgColor: '#3cb46c',
  initialsWidth: 30,
  initialsHeight: 30,
}
