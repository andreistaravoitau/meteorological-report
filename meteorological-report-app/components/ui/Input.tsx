import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={props.name} className="font-medium text-gray-700">
          {label}
        </label>
        <input
          id={props.name}
          ref={ref}
          {...props}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
