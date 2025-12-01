import { ReactNode } from "react";
import { useFieldControlContext } from "./FieldControl";

export function FieldLabel({ children }: { children: ReactNode }) {
  const { id, isRequired } = useFieldControlContext();

  return (
    <label htmlFor={id} className="block text-sm font-medium m-1">
      {children}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
}
