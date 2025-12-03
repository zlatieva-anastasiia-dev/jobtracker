import { useFieldControlContext } from "./FieldControl";

type FieldInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function FieldInput({
  name,
  type,
  placeholder,
  defaultValue,
  ...props
}: FieldInputProps) {
  const formContext = useFieldControlContext();

  return (
    <input
      id={props.id ?? formContext.id}
      aria-invalid={props["aria-invalid"] ?? formContext.isInvalid}
      aria-describedby={
        (props["aria-describedby"] ?? formContext.isInvalid)
          ? formContext.errorMessageId
          : undefined
      }
      required={props.required ?? formContext.isRequired}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors resize-vertical ${
        formContext.isInvalid
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-blue-500"
      }`}
      {...props}
    />
  );
}
