import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { FieldControlContext } from "@/components/form/context/FieldContext";
import Input from "@/components/ui/Input";

type StoryProps = ComponentProps<typeof Input>;

function MockFieldProvider({
  children,
  isInvalid,
  errorMessageId,
}: {
  children: React.ReactNode;
  isInvalid: boolean;
  errorMessageId: string;
}) {
  return (
    <FieldControlContext.Provider
      value={{
        id: "mock-field-id",
        isInvalid,
        errorMessageId,
        name: "mock-field",
      }}
    >
      {children}
    </FieldControlContext.Provider>
  );
}

const meta: Meta<StoryProps> = {
  component: Input,
  title: "UI/Input",
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "email", "password", "tel", "url", "number"],
      control: { type: "select" },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    name: "default-input",
  },
  render: (args) => (
    <MockFieldProvider isInvalid={false} errorMessageId="">
      <Input {...args} />
    </MockFieldProvider>
  ),
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
    name: "email-input",
  },
  render: (args) => (
    <MockFieldProvider isInvalid={false} errorMessageId="">
      <Input {...args} />
    </MockFieldProvider>
  ),
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    name: "password-input",
  },
  render: (args) => (
    <MockFieldProvider isInvalid={false} errorMessageId="">
      <Input {...args} />
    </MockFieldProvider>
  ),
};

export const WithError: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    name: "error-input",
  },
  render: (args) => (
    <MockFieldProvider isInvalid={true} errorMessageId="error-message">
      <Input {...args} aria-invalid="true" />
      <p id="error-message" className="text-red-500 text-sm mt-1">
        This field is required
      </p>
    </MockFieldProvider>
  ),
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    name: "disabled-input",
    disabled: true,
  },
  render: (args) => (
    <MockFieldProvider isInvalid={false} errorMessageId="">
      <Input {...args} />
    </MockFieldProvider>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    name: "default-value-input",
    defaultValue: "Initial value",
  },
  render: (args) => (
    <MockFieldProvider isInvalid={false} errorMessageId="">
      <Input {...args} />
    </MockFieldProvider>
  ),
};
