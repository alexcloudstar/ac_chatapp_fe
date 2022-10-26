import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Toggle } from './Toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Toggle>

const Template: ComponentStory<typeof Toggle> = (args) => {
  return <Toggle {...args} />
}

export const Simple = Template.bind({})
Simple.args = {}
