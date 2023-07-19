import { ChangeEvent } from "react";

type Props = {
  title: string;
  value: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  title,
  value,
  type = "text",
  placeholder,
  disabled,
  handleChange,
}: Props) => {
  return (
    <div>
      <div className="font-semibold pb-1">{title}</div>
      <input
        autoComplete="off"
        type={type}
        disabled={disabled}
        className={`border-1 border-sold bg-slate-100 rounded p-2 w-full focus-within:outline-pink-300 ${
          disabled && "text-slate-400 cursor-not-allowed"
        }`}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
