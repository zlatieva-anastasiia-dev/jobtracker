import { Button, type ButtonProps } from "@/components/ui/Button";
import { useFormContext } from "../context/FormContext";

export function FormButton({
  type = "submit",
  disabled,
  ...props
}: ButtonProps) {
  const { isPending } = useFormContext();
  if (isPending) {
    return <Button>Loading...</Button>;
  }
  return <Button type={type} disabled={disabled || isPending} {...props} />;
}
