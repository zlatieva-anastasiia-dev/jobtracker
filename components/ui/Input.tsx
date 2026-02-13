"use client";
import { useFieldContext } from "@/components/form/context/FieldContext";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export default function Input({
  name,
  type,
  placeholder,
  defaultValue,
  ...props
}: InputProps) {
  const formContext = useFieldContext();

  return (
    <input
      id={props.id}
      aria-invalid={props["aria-invalid"]}
      aria-describedby={
        (props["aria-describedby"] ?? formContext.isInvalid)
          ? formContext.errorMessageId
          : undefined
      }
      required={props.required}
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
