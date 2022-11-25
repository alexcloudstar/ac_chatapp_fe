import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  BsTranslate,
  BsArrowsAngleExpand,
  BsSlack,
  BsZoomIn,
  BsArrowLeft,
} from 'react-icons/bs'

import { Icon, TextPosition } from './Icon'

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon
    textClasses="text-[14px] mr-1 ml-1"
    onClick={() => console.log('I was clicked')}
    {...args}
  />
)

export const Simple = Template.bind({})
Simple.args = {
  icon: <BsArrowLeft className="text-[40px]" />,
  hoverColor: 'text-orange-500',
}

export const TextLeft = Template.bind({})
TextLeft.args = {
  icon: <BsTranslate />,
  text: 'Translate',
  textPosition: TextPosition.LEFT,
  hoverColor: 'text-orange-500',
}

export const TextRight = Template.bind({})
TextRight.args = {
  icon: <BsArrowsAngleExpand />,
  text: 'Fullscreen',
  textPosition: TextPosition.RIGHT,
  hoverColor: 'text-orange-500',
}

export const TextTop = Template.bind({})
TextTop.args = {
  icon: <BsSlack />,
  text: 'Slack message',
  textPosition: TextPosition.TOP,
  hoverColor: 'text-orange-500',
}

export const TextBottom = Template.bind({})
TextBottom.args = {
  icon: <BsZoomIn />,
  text: 'Zoom in',
  textPosition: TextPosition.BOTTOM,
  hoverColor: 'text-orange-500',
}
