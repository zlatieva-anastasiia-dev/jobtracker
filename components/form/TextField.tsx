import { Field, type FieldProps } from "./Field";

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<FieldProps, "children"> & { label: string };

export default function TextField({
  label,
  type = "text",
  ...props
}: TextFieldProps) {
  return (
    <Field {...props}>
      <Field.Label>{label}</Field.Label>
      <Field.Input type={type} />
      <Field.Error />
    </Field>
  );
}
