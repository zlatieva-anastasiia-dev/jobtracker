import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Field } from "./Field";
import type { TextFieldProps } from "./TextField";

type PasswordFieldProps = Omit<TextFieldProps, "type">;

export function PasswordField({ label, ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Field {...props}>
      <Field.Label>{label}</Field.Label>
      <div className="relative">
        <Field.Input type={showPassword ? "text" : "password"} />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-3  focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      <Field.Error />
    </Field>
  );
}
