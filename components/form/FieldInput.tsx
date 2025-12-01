import { useFieldControlContext } from "./FieldControl";

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function FieldInput({
  name,
  type,
  placeholder,
  defaultValue,
}: FieldInputProps) {
  const { id, isInvalid, isRequired, errorMessageId } =
    useFieldControlContext();

  return (
    <input
      id={id}
      aria-invalid={isInvalid}
      aria-describedby={isInvalid ? errorMessageId : undefined}
      required={isRequired}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`w-full px-4 py-2 border rounded-lg ${
        isInvalid ? "border-red-500" : "border-gray-300"
      }`}
    />
  );
}
