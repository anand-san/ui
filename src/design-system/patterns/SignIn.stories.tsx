import type { Meta, StoryObj } from '@storybook/react-vite';

import { SignInScreen } from './SignIn';

const meta = {
  title: 'Patterns/Sign in',
  component: SignInScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sign-in screen made only of library parts: a centred title, a form in a card that checks the email before it signs in, a passkey as the second way in and quiet links around it.',
      },
    },
  },
} satisfies Meta<typeof SignInScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {};

export const WrongPassword: Story = {
  args: { wrongPassword: true },
};
