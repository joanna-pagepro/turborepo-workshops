import Button from '@workshops/ui/lib/atoms/Button';

const buttonMeta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default buttonMeta;

export const Base = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
