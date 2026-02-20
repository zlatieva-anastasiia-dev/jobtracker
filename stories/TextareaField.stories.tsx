import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { TextareaField } from "@/components/form";
import { FieldControlContext } from "@/components/form/context/FieldContext";
import { FormContext } from "@/components/form/context/FormContext";
import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";

type StoryProps = ComponentProps<typeof TextareaField>;

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
  component: TextareaField,
  title: "FormField/TextareaField",
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
    rows: {
      control: { type: "number" },
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
    id: "description-field",
    name: "description",
    label: "Job Description",
  },
};

export const Required: Story = {
  args: {
    id: "description-required-field",
    name: "description",
    label: "Job Description",
    isRequired: true,
  },
};

export const CustomRows: Story = {
  args: {
    id: "description-rows-field",
    name: "description",
    label: "Job Description",
    rows: 8,
    placeholder: "Enter a longer description...",
  },
};

export const WithError: Story = {
  args: {
    id: "description-error-field",
    name: "description",
    label: "Job Description",
    isRequired: true,
  },
  render: (args) => (
    <MockFieldProvider isInvalid={true} errorMessageId="error-id">
      <TextareaField {...args} />
    </MockFieldProvider>
  ),
};
