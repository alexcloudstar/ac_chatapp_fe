import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Peep } from './Peep'

export default {
  title: 'Components/Peep',
  component: Peep,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Peep>

const Template: ComponentStory<typeof Peep> = (args) => <Peep {...args} />

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
