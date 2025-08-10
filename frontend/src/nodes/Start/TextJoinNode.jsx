import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, TextInput } from "@/components/FormField";

export default function TextJoinNode({ id, data }) {
  const [text1, handleText1Change] = useNodeField(id, data, "text1");
  const [text2, handleText2Change] = useNodeField(id, data, "text2");
  const [separator, handleSeparatorChange] = useNodeField(
    id,
    data,
    "separator",
    " "
  );

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={text1}
        onChange={handleText1Change}
        placeholder='First text...'
        label='Text 1'
      />

      <VariableField
        id={id}
        value={text2}
        onChange={handleText2Change}
        placeholder='Second text...'
        label='Text 2'
      />

      <TextInput
        label='Separator'
        value={separator}
        onChange={(e) => handleSeparatorChange(e.target.value)}
        placeholder='Space, comma, etc...'
      />
    </div>
  );
}
