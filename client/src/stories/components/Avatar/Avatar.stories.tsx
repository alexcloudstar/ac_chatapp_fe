import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

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
  avatar: 'https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99',
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
}

export const Initials = Template.bind({})
Initials.args = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
  bgColor: '#3cb46c',
}
