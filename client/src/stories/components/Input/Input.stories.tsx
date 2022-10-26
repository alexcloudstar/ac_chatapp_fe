import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Input } from './Input'

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...args} />
}

export const Simple = Template.bind({})
Simple.args = {
  placeholder: 'Enter your name',
  isRequired: true,
  type: 'text',
  name: 'name',
}
