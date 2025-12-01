import { useFieldControlContext } from "./FieldControl";

type FieldTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FieldTextarea({
  name,
  placeholder,
  defaultValue,
  rows = 4,
  ...props
}: FieldTextareaProps) {
  const { id, isInvalid, isRequired, errorMessageId } =
    useFieldControlContext();

  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required={isRequired}
      defaultValue={defaultValue}
      placeholder={placeholder}
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
}
