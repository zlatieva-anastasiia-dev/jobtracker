import TextField, { type TextFieldProps } from "./TextField";

type TelFieldProps = Omit<TextFieldProps, "type">;

export function TelField({ ...props }: TelFieldProps) {
  return <TextField {...props} type="tel" autoComplete="tel" inputMode="tel" />;
}
