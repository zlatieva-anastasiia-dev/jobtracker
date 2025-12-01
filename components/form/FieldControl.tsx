import { createContext, useContext } from "react";

type FieldControlContextType = {
  id?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  name?: string;
  errorMessage?: string;
  errorMessageId?: string;
};

type FieldControlProps = FieldControlContextType & {
  children: React.ReactNode;
};

const FieldControlContext = createContext<FieldControlContextType | null>(null);

export function useFieldControlContext() {
  const context = useContext(FieldControlContext);

  if (!context) {
    throw new Error(
      "useFieldControlContext must be used within a FormControl."
    );
  }
  return context;
}

export function FieldControl({
  id,
  isInvalid,
  isRequired,
  children,
  errorMessage,
}: FieldControlProps) {
  const errorMessageId = `${id}-error`;
  return (
    <FieldControlContext.Provider
      value={{ id, isInvalid, isRequired, errorMessage, errorMessageId }}
    >
      {children}
    </FieldControlContext.Provider>
  );
}
