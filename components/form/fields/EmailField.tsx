import { TextField, type TextFieldProps } from "./TextField";

type EmailFieldProps = Omit<TextFieldProps, "type">;

export function EmailField({ ...props }: EmailFieldProps) {
  return (
    <TextField type="email" inputMode="email" autoComplete="on" {...props} />
  );
}
