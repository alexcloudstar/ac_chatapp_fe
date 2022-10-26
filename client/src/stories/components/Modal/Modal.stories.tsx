import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'

import { Button } from '../Button'

import { Modal } from './Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Modal>

const modalChildrenExample = (
  <div>
    <h2 style={{ fontWeight: 600, fontSize: '18px' }}>Lorem ipsum</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      maiores voluptatibus delectus totam quasi molestiae doloremque mollitia!
      Commodi ipsam dolore enim fuga cumque numquam, necessitatibus rerum totam
      esse suscipit laudantium.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      maiores voluptatibus delectus totam quasi molestiae doloremque mollitia!
      Commodi ipsam dolore enim fuga cumque numquam, necessitatibus rerum totam
      esse suscipit laudantium.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      maiores voluptatibus delectus totam quasi molestiae doloremque mollitia!
      Commodi ipsam dolore enim fuga cumque numquam, necessitatibus rerum totam
      esse suscipit laudantium.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      maiores voluptatibus delectus totam quasi molestiae doloremque mollitia!
      Commodi ipsam dolore enim fuga cumque numquam, necessitatibus rerum totam
      esse suscipit laudantium.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
      maiores voluptatibus delectus totam quasi molestiae doloremque mollitia!
      Commodi ipsam dolore enim fuga cumque numquam, necessitatibus rerum totam
      esse suscipit laudantium.
    </p>
  </div>
)

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {modalChildrenExample}
      <Button label=" Show Modal" onClick={() => setIsShow(!isShow)} />
      {isShow && <Modal {...args} onClose={() => setIsShow(!isShow)} />}
    </>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  title: 'Modal Title',
  children: modalChildrenExample,
}

export const WithFooter = Template.bind({})
WithFooter.args = {
  title: 'Modal with Footer',
  children: modalChildrenExample,
  hasFooter: true,
  footerContent: (
    <div>
      <Button
        label="Cancel"
        onClick={() => console.log('cancel')}
        primary
        style={{ marginRight: 10 }}
      />
      <Button label="Save" onClick={() => console.log('save')} />
    </div>
  ),
}
