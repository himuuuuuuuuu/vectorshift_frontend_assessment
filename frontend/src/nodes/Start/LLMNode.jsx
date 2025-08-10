import React from "react";
import { useNodeField } from "@/hooks/useNodeField";
import { VariableField, SelectField } from "@/components/FormField";

const models = [
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude-3", label: "Claude-3" },
];

export default function LLMNode({ id, data }) {
  const [prompt, handlePromptChange] = useNodeField(id, data, "prompt");
  const [model, handleModelChange] = useNodeField(
    id,
    data,
    "model",
    "gpt-3.5-turbo"
  );

  return (
    <div className='space-y-3 w-full'>
      <VariableField
        id={id}
        value={prompt}
        onChange={handlePromptChange}
        placeholder='Enter your prompt with variables...'
        label='Prompt'
      />

      <SelectField
        label='Model'
        value={model}
        onChange={handleModelChange}
        options={models}
        width='100px'
      />
    </div>
  );
}
