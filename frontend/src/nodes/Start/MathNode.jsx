import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField } from "@/components/FormField";

const operations = [
  { value: "add", label: "Add (+)" },
  { value: "subtract", label: "Subtract (-)" },
  { value: "multiply", label: "Multiply (×)" },
  { value: "divide", label: "Divide (÷)" },
];

export default function MathNode({ id, data }) {
  const [number1, handleNumber1Change] = useNodeField(id, data, "number1");
  const [number2, handleNumber2Change] = useNodeField(id, data, "number2");
  const [operation, handleOperationChange] = useNodeField(
    id,
    data,
    "operation",
    "add"
  );

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={number1}
        onChange={handleNumber1Change}
        placeholder='First number...'
        label='Number 1'
      />

      <SelectField
        label='Operation'
        value={operation}
        onChange={handleOperationChange}
        options={operations}
        width='120px'
      />

      <VariableField
        id={id}
        value={number2}
        onChange={handleNumber2Change}
        placeholder='Second number...'
        label='Number 2'
      />
    </div>
  );
}
