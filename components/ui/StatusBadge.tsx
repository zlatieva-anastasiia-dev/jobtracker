import type { StatusVariant } from "@/types/types";

export function StatusBadge({ status }: { status: StatusVariant }) {
  const variantStyles: Record<StatusVariant, string> = {
    applied:
      "bg-blue-100  text-blue-800  border border-blue-200  px-3 py-1 rounded-xl",
    interview:
      "bg-indigo-100 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-xl",
    rejected:
      "bg-red-100   text-red-800   border border-red-200   px-3 py-1 rounded-xl",
    offer:
      "bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-xl",
    closed:
      "bg-gray-100  text-gray-700  border border-gray-200  px-3 py-1 rounded-xl",
  };
  return (
    <span className={variantStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
