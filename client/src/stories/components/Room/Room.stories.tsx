import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Room } from './Room'

export default {
  title: 'Components/Room',
  component: Room,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Room>

const Template: ComponentStory<typeof Room> = (args) => <Room {...args} />

export const IsFavorite = Template.bind({})
IsFavorite.args = {
  bgColor:
    'linear-gradient(175deg, rgba(3,169,241,1) 0%, rgba(160,2,90,1) 100%)',
  owner: 'Bożenka Malina',
  isFavorite: true,
}

export const IsNotFavorite = Template.bind({})
IsNotFavorite.args = {
  bgColor:
    'linear-gradient(175deg, rgba(179,71,234,1) 0%, rgba(9,249,191,1) 100%)',
  owner: 'Bożenka Malina',
  isFavorite: false,
}

export const PhotoBackground = Template.bind({})
PhotoBackground.args = {
  bgImage: 'https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99',
  owner: 'Bożenka Malina',
  isFavorite: false,
}
