import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";
import { cn } from "@/utils/helpers";
import { FormContext } from "./context/FormContext";
import { FormActions } from "./layout/FormActions";
import { FormButton } from "./layout/FormButton";
import { FormFields } from "./layout/FormFields";
import { FormHeading } from "./layout/FormHeading";
import { FormErrorMessage } from "./layout/FormMessage";
import { FormSection } from "./layout/FormSection";

export type FormProps = {
  state: ActionState;
  children: React.ReactNode;
  action: (payload: FormData) => void;
  isPending: boolean;
  initialData?: Job;
  variant?: "default" | "modal";
};
export function Form({
  state,
  children,
  initialData,
  action,
  isPending = false,
  variant = "default",
}: FormProps) {
  const baseStyles = "w-full text-gray-900 mx-auto transition-all";

  const variantStyles = {
    default: "bg-white p-8 rounded-xl shadow-lg max-w-md",
    modal: "bg-transparent p-6 shadow-none max-w-full",
  };
  return (
    <FormContext.Provider value={{ state, initialData, isPending }}>
      <form
        action={action}
        noValidate
        className={cn(baseStyles, variantStyles[variant])}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Heading = FormHeading;
Form.Message = FormErrorMessage;
Form.Fields = FormFields;
Form.Actions = FormActions;
Form.Button = FormButton;
Form.Section = FormSection;
