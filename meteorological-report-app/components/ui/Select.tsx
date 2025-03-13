import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  label,
  options,
  className,
  ...props
}: SelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select className={`w-full p-2 border rounded ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
