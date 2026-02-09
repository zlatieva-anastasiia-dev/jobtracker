import type { Job } from "@/types/job";
import { FieldControlContext, useFieldContext } from "./context/FieldContext";
import { useFormContext } from "./context/FormContext";

export type FieldProps = {
  id: string;
  isRequired?: boolean;
  name: string;
  children: React.ReactNode;
};

export function Field({ id, isRequired, children, name }: FieldProps) {
  const { state, initialData } = useFormContext();

  const isInvalid = !!state?.errors?.[name];
  const errorMessageId = `${id}-error`;
  const errorMessage = state?.errors?.[name];
  const defaultValue =
    state?.values?.[name] ??
    (initialData?.[name as keyof Job] as string | undefined);

  return (
    <FieldControlContext.Provider
      value={{
        id,
        isInvalid,
        isRequired,
        errorMessage,
        errorMessageId,
        name,
        defaultValue,
      }}
    >
      {children}
    </FieldControlContext.Provider>
  );
}

Field.Input = function FieldControlInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { id, isInvalid, errorMessageId, isRequired, name, defaultValue } =
    useFieldContext();

  return (
    <input
      id={id}
      aria-invalid={isInvalid}
      aria-describedby={isInvalid ? errorMessageId : undefined}
      aria-errormessage={isInvalid ? errorMessageId : undefined}
      required={isRequired}
      name={name}
      defaultValue={defaultValue}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors resize-vertical ${
        isInvalid
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      }`}
      {...props}
    />
  );
};

Field.Textarea = function FieldTextarea({
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { id, isInvalid, isRequired, errorMessageId, name, defaultValue } =
    useFieldContext();

  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required={isRequired}
      defaultValue={defaultValue}
      aria-invalid={isInvalid}
      aria-describedby={errorMessageId}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors resize-vertical ${
        isInvalid
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      }`}
      {...props}
    />
  );
};

Field.Select = function FieldSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  const { id, isInvalid, isRequired, errorMessageId, name, defaultValue } =
    useFieldContext();

  return (
    <select
      id={id}
      name={name}
      required={isRequired}
      defaultValue={defaultValue}
      aria-invalid={isInvalid}
      aria-describedby={errorMessageId}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors bg-white ${
        isInvalid
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      }`}
      {...props}
    >
      {props.children}
    </select>
  );
};

Field.Label = function FieldLabel({
  children,
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { id, isRequired } = useFieldContext();

  return (
    <label htmlFor={id} className="block text-sm font-medium m-1">
      {children}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

Field.Error = function FieldError() {
  const { isInvalid, errorMessageId, errorMessage } = useFieldContext();

  if (!isInvalid || !errorMessage) {
    return null;
  }

  return (
    <p id={errorMessageId} className="text-sm text-red-600" role="alert">
      {errorMessage}
    </p>
  );
};
