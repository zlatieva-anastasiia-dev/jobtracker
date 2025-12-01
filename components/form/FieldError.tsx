import { useFieldControlContext } from "./FieldControl";

export function FieldError() {
  const { errorMessage, isInvalid, errorMessageId } = useFieldControlContext();

  if (!isInvalid) {
    return null;
  }

  return (
    <span className="text-sm text-red-600" id={errorMessageId}>
      {errorMessage}
    </span>
  );
}
