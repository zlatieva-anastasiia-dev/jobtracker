import { Field, type FieldProps } from "../Field";

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldProps & { label: string };

export function SelectField({ label, children, ...props }: TextareaFieldProps) {
  return (
    <Field {...props}>
      <Field.Label>{label}</Field.Label>
      <Field.Select>{children}</Field.Select>
      <Field.Error />
    </Field>
  );
}
