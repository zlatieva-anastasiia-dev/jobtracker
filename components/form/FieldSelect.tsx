import { useFieldControlContext } from "./FieldControl";

type FieldSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

export function FieldSelect({
  name,
  defaultValue,
  children,
  ...props
}: FieldSelectProps) {
  const { id, isInvalid, isRequired, errorMessageId } =
    useFieldControlContext();

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
      {children}
    </select>
  );
}
