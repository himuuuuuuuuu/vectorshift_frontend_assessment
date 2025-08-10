import React from "react";
import { useNodeVariable } from "@/hooks/useNodeVariable";
import { TextInput, SelectField } from "@/components/FormField";

const types = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "array", label: "Array" },
  { value: "object", label: "Object" },
];

export default function InputNode({ data, id }) {
  const { selectedType, handleTypeChange } = useNodeVariable(id, {
    ...data,
    nodeType: "input",
  });

  return (
    <div className='space-y-3 w-full pt-1'>
      <SelectField
        label='Type'
        value={selectedType}
        onChange={handleTypeChange}
        options={types}
        helpIcon={true}
      />
    </div>
  );
}
