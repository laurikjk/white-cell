"use client";

interface Props {
  label: string;
  defaultValue?: number
  onChange: (value: number | null) => void;
}

const setter = (value: string, set: (value: number | null) => void) => {
  const parsed = parseFloat(value);
  set(isNaN(parsed) ? null : parsed);
};

const Input = ({ label, defaultValue, onChange }: Props) => (
  <div className="flex flex-row items-center m-2">
    <label className="font-bold mr-4">{label}</label>
    <input
      className="bg-white text-black font-bold rounded mr-4"
      type="text"
      defaultValue={defaultValue?.toString() || ""}
      onChange={(e) => setter(e.target.value, onChange)}
    />
  </div>
);

export default Input;