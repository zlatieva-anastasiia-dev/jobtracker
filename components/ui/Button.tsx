import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: `bg-blue-500 hover:bg-blue-600 text-white `,
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  const base = `px-4 py-2 rounded-md transition-colors`;

  return (
    <button className={`${base} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
}
