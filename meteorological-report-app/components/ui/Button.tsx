import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg transition duration-300 ease-in-out font-semibold";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-400 text-white hover:bg-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      className={`${baseStyles} ${className} ${variants[variant]}`}
      {...props}
    />
  );
};
