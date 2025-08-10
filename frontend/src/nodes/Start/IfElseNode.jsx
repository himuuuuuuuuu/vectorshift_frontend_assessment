import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField } from "@/components/FormField";

const conditions = [
  { value: "empty", label: "Is Empty" },
  { value: "not_empty", label: "Is Not Empty" },
  { value: "equals", label: "Equals" },
  { value: "contains", label: "Contains" },
];

export default function IfElseNode({ id, data }) {
  const [input, handleInputChange] = useNodeField(id, data, "input");
  const [condition, handleConditionChange] = useNodeField(
    id,
    data,
    "condition",
    "empty"
  );
  const [compareValue, handleCompareChange] = useNodeField(
    id,
    data,
    "compareValue"
  );

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={input}
        onChange={handleInputChange}
        placeholder='Value to check...'
        label='Input'
      />

      <SelectField
        label='Condition'
        value={condition}
        onChange={handleConditionChange}
        options={conditions}
        width='120px'
      />

      {(condition === "equals" || condition === "contains") && (
        <VariableField
          id={id}
          value={compareValue}
          onChange={handleCompareChange}
          placeholder='Value to compare with...'
          label='Compare With'
        />
      )}
    </div>
  );
}
