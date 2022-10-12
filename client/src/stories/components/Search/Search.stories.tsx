import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

import { Search } from './Search'

export default {
  title: 'Components/Search',
  component: Search,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />

export const NoQuery = Template.bind({})
NoQuery.args = {
  query: '',
}

export const SearchQuery = Template.bind({})
SearchQuery.args = {
  query: 'Fun Room',
}

export const NoQueryIcon = Template.bind({})
NoQueryIcon.args = {
  query: '',
  icon: <FaSearch />,
}

export const SearchQueryIcon = Template.bind({})
SearchQueryIcon.args = {
  query: 'Fun Room',
  icon: <FaSearch />,
}
