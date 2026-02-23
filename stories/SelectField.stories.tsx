import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { SelectField } from "@/components/form";
import { FieldControlContext } from "@/components/form/context/FieldContext";
import { FormContext } from "@/components/form/context/FormContext";
import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";

type StoryProps = ComponentProps<typeof SelectField>;

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
      ? { "mock-field": "Please select an option." }
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
  component: SelectField,
  title: "FormField/SelectField",
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
    id: "status-field",
    name: "status",
    label: "Job Status",
    children: (
      <>
        <option value="">Select status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
        <option value="closed">Closed</option>
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    id: "status-required-field",
    name: "status",
    label: "Job Status",
    isRequired: true,
    children: (
      <>
        <option value="">Select status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
        <option value="closed">Closed</option>
      </>
    ),
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: "status-default-field",
    name: "status",
    label: "Job Status",
    defaultValue: "applied",
    children: (
      <>
        <option value="">Select status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
        <option value="closed">Closed</option>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    id: "status-error-field",
    name: "status",
    label: "Job Status",
    isRequired: true,
    children: (
      <>
        <option value="">Select status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
        <option value="closed">Closed</option>
      </>
    ),
  },
  render: (args) => (
    <MockFieldProvider isInvalid={true} errorMessageId="error-id">
      <SelectField {...args} />
    </MockFieldProvider>
  ),
};
