import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField } from "@/components/FormField";

const operations = [
  { value: "now", label: "Current Date/Time" },
  { value: "format", label: "Format Date" },
  { value: "add_days", label: "Add Days" },
  { value: "subtract_days", label: "Subtract Days" },
];

const formats = [
  { value: "YYYY-MM-DD", label: "2024-01-15" },
  { value: "DD/MM/YYYY", label: "15/01/2024" },
  { value: "MM/DD/YYYY", label: "01/15/2024" },
  { value: "full", label: "January 15, 2024" },
];

export default function DateTimeNode({ id, data }) {
  const [inputDate, handleDateChange] = useNodeField(id, data, "inputDate");
  const [operation, handleOperationChange] = useNodeField(
    id,
    data,
    "operation",
    "now"
  );
  const [format, handleFormatChange] = useNodeField(
    id,
    data,
    "format",
    "YYYY-MM-DD"
  );
  const [days, handleDaysChange] = useNodeField(id, data, "days", "1");

  return (
    <div className='space-y-3 w-full'>
      <SelectField
        label='Operation'
        value={operation}
        onChange={handleOperationChange}
        options={operations}
        width='140px'
      />

      {operation !== "now" && (
        <VariableField
          id={id}
          value={inputDate}
          onChange={handleDateChange}
          placeholder='2024-01-15 or {{date_var}}'
          label='Input Date'
        />
      )}

      {operation === "format" && (
        <SelectField
          label='Format'
          value={format}
          onChange={handleFormatChange}
          options={formats}
          width='120px'
        />
      )}

      {(operation === "add_days" || operation === "subtract_days") && (
        <VariableField
          id={id}
          value={days}
          onChange={handleDaysChange}
          placeholder='Number of days...'
          label='Days'
        />
      )}
    </div>
  );
}
