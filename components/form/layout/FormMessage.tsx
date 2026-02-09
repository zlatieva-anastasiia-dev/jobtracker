import { useFormContext } from "../context/FormContext";

export function FormErrorMessage() {
  const { state } = useFormContext();
  if (!state.message) return null;
  return (
    <div
      className={`p-3 rounded-lg text-sm ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
    >
      {state.message}
    </div>
  );
}
