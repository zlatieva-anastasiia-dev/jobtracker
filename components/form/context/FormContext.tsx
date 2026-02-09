import { createContext, useContext } from "react";
import type { FormProps } from "../Form";

type FormContextType = Pick<FormProps, "state" | "initialData" | "isPending">;

export const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
