import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={props.name} className="font-medium">
          {label}
        </label>
        <input
          id={props.name}
          ref={ref}
          {...props}
          className="p-2 border rounded"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
