"use client";
import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export type IconButtonProps = {
  icon: LucideIcon;
  colorClass?: string;
  onClick: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function IconButton({
  icon: Icon,
  "aria-label": ariaLabel,
  onClick,
  colorClass = "text-gray-700",
  className = "",
  ...rest
}: IconButtonProps) {
  const baseClasses = `p-2 rounded-md transition-colors`;
  const hoverClass = `hover:bg-gray-100`;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClass} ${hoverClass} ${className}`}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
