import { createContext, useContext } from "react";
import type { ActionState } from "@/types/actions";
import type { Job } from "@/types/job";

type FormProps = {
  state: ActionState;
  initialData?: Job;
  children: React.ReactNode;
  action: (payload: FormData) => void;
};

type FormContextType = Pick<FormProps, "state" | "initialData">;

const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

export function Form({ state, children, initialData, action }: FormProps) {
  return (
    <FormContext.Provider value={{ state, initialData }}>
      <form action={action} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
}
