import { ChangeEvent } from "react";

type Props = {
  title: string;
  value: string;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ title, value, placeholder, handleChange }: Props) => {
  return (
    <div>
      <div className="font-semibold pb-1">{title}</div>
      <input
        className="border-1 border-sold bg-slate-100 rounded p-2 w-full focus-within:outline-pink-300"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
