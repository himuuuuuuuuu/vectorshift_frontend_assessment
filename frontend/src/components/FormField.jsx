import React from "react";
import VariableInput from "@/components/VariableInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  className = "",
}) {
  return (
    <div className='w-full flex flex-col justify-start items-start mt-1'>
      <label className='text-[6px] w-full text-left'>{label}</label>
      <input
        value={value}
        onChange={onChange}
        className={`h-4 outline-0 border border-gray-200 rounded-[3px] p-[2px] text-[6px] w-full ${
          error ? "border-red-500" : ""
        } ${className}`}
        placeholder={placeholder}
      />
      {error && <div className='text-[6px] text-red-500 w-full'>{error}</div>}
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  width = "80px",
  helpIcon = false,
}) {
  return (
    <div className='flex items-center justify-between'>
      <label className='text-[6px] flex items-center'>
        {label}
        {helpIcon && <span className='text-gray-400'>?</span>}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`!h-4 rounded-[3px] w-[${width}] text-[6px]`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className='text-[7px]'
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function VariableField({ id, value, onChange, label, placeholder }) {
  return (
    <VariableInput
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
    />
  );
}
