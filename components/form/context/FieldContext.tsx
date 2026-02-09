import { createContext, useContext } from "react";

type FieldControlContextType = {
  id: string;
  isRequired?: boolean;
  isInvalid: boolean;
  errorMessageId: string;
  name: string;
  errorMessage?: string;
  defaultValue?: string;
};

export const FieldControlContext =
  createContext<FieldControlContextType | null>(null);

export function useFieldContext() {
  const context = useContext(FieldControlContext);

  if (!context) {
    throw new Error(
      "useFieldControlContext must be used within a FormControl.",
    );
  }
  return context;
}
