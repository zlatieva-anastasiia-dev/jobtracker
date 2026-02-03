import { Field, type FieldProps } from "./Field";

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<FieldProps, "children"> & { label: string };

export function TextareaField({ label, ...props }: TextareaFieldProps) {
  return (
    <Field {...props}>
      <Field.Label>{label}</Field.Label>
      <Field.Textarea />
      <Field.Error />
    </Field>
  );
}
