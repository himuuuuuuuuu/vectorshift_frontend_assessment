import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField } from "@/components/FormField";

const outputFormats = [
  { value: "json", label: "JSON" },
  { value: "text", label: "Text" },
  { value: "csv", label: "CSV" },
];

export default function OutputNode({ id, data }) {
  const [content, handleContentChange] = useNodeField(id, data, "content");
  const [format, handleFormatChange] = useNodeField(id, data, "format", "json");

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={content}
        onChange={handleContentChange}
        placeholder='Enter output content...'
        label='Output'
      />

      <SelectField
        label='Format'
        value={format}
        onChange={handleFormatChange}
        options={outputFormats}
        width='80px'
      />
    </div>
  );
}
