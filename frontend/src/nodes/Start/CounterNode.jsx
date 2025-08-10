import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField, TextInput } from "@/components/FormField";

const operations = [
  { value: "increment", label: "Add (+)" },
  { value: "decrement", label: "Subtract (-)" },
  { value: "reset", label: "Reset to 0" },
];

export default function CounterNode({ id, data }) {
  const [currentValue, handleValueChange] = useNodeField(
    id,
    data,
    "currentValue",
    "0"
  );
  const [operation, handleOperationChange] = useNodeField(
    id,
    data,
    "operation",
    "increment"
  );
  const [step, handleStepChange] = useNodeField(id, data, "step", "1");

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={currentValue}
        onChange={handleValueChange}
        placeholder='Current count...'
        label='Current Value'
      />

      <SelectField
        label='Operation'
        value={operation}
        onChange={handleOperationChange}
        options={operations}
        width='120px'
      />

      {operation !== "reset" && (
        <TextInput
          label='Step'
          value={step}
          onChange={(e) => handleStepChange(e.target.value)}
          placeholder='1'
        />
      )}
    </div>
  );
}
