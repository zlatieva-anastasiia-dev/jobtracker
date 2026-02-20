import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import type { ComponentProps } from "react";
import { PasswordField } from "@/components/form";
import { FieldControlContext } from "@/components/form/context/FieldContext";
import { FormContext } from "@/components/form/context/FormContext";
import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";

type StoryProps = ComponentProps<typeof PasswordField>;

function MockFormProvider({
  state,
  initialData,
  isPending,
  children,
}: {
  state: ActionState;
  initialData: Job;
  isPending: boolean;
  children: React.ReactNode;
}) {
  return (
    <FormContext.Provider value={{ state, initialData, isPending }}>
      {children}
    </FormContext.Provider>
  );
}

function MockFieldProvider({
  children,
  isInvalid,
  errorMessageId,
}: {
  children: React.ReactNode;
  isInvalid: boolean;
  errorMessageId: string;
}) {
  const mockState: ActionState = {
    success: false,
    message: "",
    errors: isInvalid ? { "mock-field": "This field is required." } : undefined,
    values: {},
  };

  return (
    <MockFormProvider
      state={mockState}
      initialData={{} as Job}
      isPending={false}
    >
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
    </MockFormProvider>
  );
}

const meta: Meta = {
  component: PasswordField,
  title: "FormField/PasswordField",
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px" }}>
        <MockFieldProvider isInvalid={false} errorMessageId="error-id">
          <Story />
        </MockFieldProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    id: "password-field",
    name: "password",
    label: "Password",
  },
};

export const WithToggle: Story = {
  args: {
    id: "password-toggle-field",
    name: "password",
    label: "Password",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type into password field
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.type(passwordInput, "SecretPass123");

    // Initially should be password type (hidden)
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click show password button
    const toggleButton = canvas.getByRole("button", { name: "Show password" });
    await userEvent.click(toggleButton);

    // Should now be text type (visible)
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Click hide password button
    const hideButton = canvas.getByRole("button", { name: "Hide password" });
    await userEvent.click(hideButton);

    // Should be back to password type (hidden)
    await expect(passwordInput).toHaveAttribute("type", "password");
  },
};
