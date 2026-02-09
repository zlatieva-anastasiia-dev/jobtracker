import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseButtonStyles =
    "w-full py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const variantStyles = {
    primary: `bg-blue-500 hover:bg-blue-600 text-white `,
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={cn(baseButtonStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
