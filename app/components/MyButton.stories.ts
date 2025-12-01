import type { Meta, StoryObj } from '@storybook/vue3-vite'

import type Button from './buttons/MyButton.vue'
import MyButton from './buttons/MyButton.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/MyButton',
  component: MyButton,

  render: (args) => ({
    components: { MyButton },
    setup () {
      return { args }
    },
    template: '<MyButton v-bind="args">Click me</MyButton>'
  }),
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small', 'medium', 'large']
    },
    variant: {
      control: 'radio',
      options: ['default', 'transparent', 'disabled']
    },
    href: { control: 'text' }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {}

export const Transparent: Story = {
  args: {
    variant: 'transparent'
  }
}

export const Small: Story = {
  args: {
    size: 'small'
  }
}

export const SmallTransparent: Story = {
  args: {
    variant: 'transparent',
    size: 'small'
  }
}
