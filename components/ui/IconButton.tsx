"use client";
import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export type IconButtonProps = {
  icon: LucideIcon;
  size?: number;
  variant?: "ghost" | "filled" | "danger";
  onClick: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function IconButton({
  icon: Icon,
  "aria-label": ariaLabel,
  onClick,
  variant = "ghost",
  className = "",
  size = 18,
  ...rest
}: IconButtonProps) {
  const variantStyles = {
    ghost: "text-gray-700 hover:bg-gray-100",
    filled: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "text-red-500 hover:bg-gray-100",
  };
  const base = `p-2 rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon className="w-4 h-4" size={size} />
    </button>
  );
}
