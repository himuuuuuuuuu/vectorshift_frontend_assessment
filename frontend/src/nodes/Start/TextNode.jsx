import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField } from "@/components/FormField";

export default function TextNode({ id, data }) {
  const [textContent, handleTextChange] = useNodeField(id, data, "textContent");

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={textContent}
        onChange={handleTextChange}
        placeholder='Enter text with variables...'
        label='Text Content'
      />
    </div>
  );
}
