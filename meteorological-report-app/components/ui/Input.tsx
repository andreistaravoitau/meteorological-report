import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type: "text" | "number" | "date";
  name: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="p-2 border rounded"
      />
    </div>
  );
};
