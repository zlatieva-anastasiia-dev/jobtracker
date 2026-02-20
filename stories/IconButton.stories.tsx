import type { Meta, StoryObj } from "@storybook/react";
import { PlusCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { IconButton } from "@/components/ui/IconButton";

type StoryProps = ComponentProps<typeof IconButton>;

const meta: Meta = {
  component: IconButton,
  title: "UI/IconButton",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["ghost", "filled", "danger"],
      control: {
        type: "select",
      },
    },
    size: {
      options: [12, 16, 18, 24, 32],
      control: {
        type: "number",
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

const Icon = { PlusCircle };

export const Ghost: Story = {
  args: {
    icon: Icon.PlusCircle,
    variant: "ghost",
    "aria-label": "Add item",
  },
  render: (args) => <IconButton {...args} />,
};

export const Filled: Story = {
  args: {
    icon: Icon.PlusCircle,
    variant: "filled",
    "aria-label": "Add item",
  },
  render: (args) => <IconButton {...args} />,
};

export const Danger: Story = {
  args: {
    icon: Icon.PlusCircle,
    variant: "danger",
    "aria-label": "Add item",
  },
  render: (args) => <IconButton {...args} />,
};
