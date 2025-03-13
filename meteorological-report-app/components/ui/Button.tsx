import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-xl transition duration-200 m-1";
  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-gray-400 text-white hover:bg-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return <button className={`${baseStyles} ${variants[variant]}`} {...props} />;
};
