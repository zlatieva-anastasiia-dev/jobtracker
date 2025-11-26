"use client";
import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export type IconButtonProps = {
  icon: LucideIcon;
  "aria-label": string;
  colorClass?: string;
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
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  const base = `p-2 rounded-md transition-colors`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base}  ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon className="w-4 h-4" size={size} />
    </button>
  );
}
