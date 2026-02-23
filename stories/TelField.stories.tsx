import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { TelField } from "@/components/form";
import { FieldControlContext } from "@/components/form/context/FieldContext";
import { FormContext } from "@/components/form/context/FormContext";
import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";

type StoryProps = ComponentProps<typeof TelField>;

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
    errors: isInvalid
      ? { "mock-field": "Please enter a valid phone number." }
      : undefined,
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
  component: TelField,
  title: "FormField/TelField",
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
    id: "phone-field",
    name: "phone",
    label: "Phone Number",
  },
};

export const Required: Story = {
  args: {
    id: "phone-required-field",
    name: "phone",
    label: "Phone Number",
    isRequired: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    id: "phone-placeholder-field",
    name: "phone",
    label: "Phone Number",
    placeholder: "+1 (555) 123-4567",
  },
};

export const WithError: Story = {
  args: {
    id: "phone-error-field",
    name: "phone",
    label: "Phone Number",
    isRequired: true,
  },
  render: (args) => (
    <MockFieldProvider isInvalid={true} errorMessageId="error-id">
      <TelField {...args} />
    </MockFieldProvider>
  ),
};
