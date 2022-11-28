import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

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
  const [isOn, setIsOn] = useState(false)
  return <Toggle {...args} isOn={isOn} setIsOn={setIsOn} />
}

export const Simple = Template.bind({})
Simple.args = {}

export const ShowText = Template.bind({})
ShowText.args = {
  showText: true,
}
