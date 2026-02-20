import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";

type StoryProps = ComponentProps<typeof Button> & { buttonText: string };

const meta: Meta = {
  component: Button,
  title: "UI/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "danger"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    buttonText: "Primary Button",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Primary Button" });

    // Test that button is rendered
    await expect(button).toBeInTheDocument();

    // Test click interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    buttonText: "Secondary Button",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
};

export const Danger: Story = {
  args: {
    variant: "danger",
    buttonText: "Danger Button",
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    buttonText: "Disabled Button",
    disabled: true,
  },
  render: ({ buttonText, ...args }) => <Button {...args}>{buttonText}</Button>,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Disabled Button" });

    // Test that button is disabled
    await expect(button).toBeDisabled();

    // Test that onClick is not called when disabled
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
