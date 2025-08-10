import { useState, useEffect, useCallback } from "react";
import useStore from "@/zustand/store";

export function useNodeVariable(id, data, variableIndex = 0) {
  const { updateNodeVariable, updateNodeData, getNextInputName } = useStore();
  const variable = data.variables?.[variableIndex];

  const [selectedType, setSelectedType] = useState(variable?.type || "text");
  const [inputName, setInputName] = useState(variable?.name || "");
  const [nameError, setNameError] = useState("");

  // Auto-generate name for input nodes
  useEffect(() => {
    if (!variable?.name && data.nodeType === "input") {
      const nextName = getNextInputName();
      setInputName(nextName);
      updateNodeVariable(id, variable?.id, { name: nextName });
    }
  }, [
    data.variables,
    id,
    getNextInputName,
    updateNodeVariable,
    variable,
    data.nodeType,
  ]);

  const handleTypeChange = useCallback(
    (type) => {
      setSelectedType(type);
      if (variable?.id) {
        updateNodeVariable(id, variable.id, { type });
      }
      updateNodeData(id, { selectedType: type });
    },
    [variable, id, updateNodeVariable, updateNodeData]
  );

  const handleNameChange = useCallback(
    (e) => {
      const newName = e.target.value;
      setInputName(newName);

      // Check if name is unique for input nodes
      if (data.nodeType === "input") {
        const isUnique = useStore.getState().isInputNameUnique(newName, id);
        if (!isUnique) {
          setNameError("Name must be unique");
          return;
        }
      }

      setNameError("");
      if (variable?.id) {
        updateNodeVariable(id, variable.id, { name: newName });
      }
    },
    [variable, id, updateNodeVariable, data.nodeType]
  );

  return {
    selectedType,
    inputName,
    nameError,
    handleTypeChange,
    handleNameChange,
  };
}
