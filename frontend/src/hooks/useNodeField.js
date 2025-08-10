import { useState, useEffect, useCallback } from "react";
import useStore from "@/zustand/store";

export function useNodeField(id, data, fieldName, defaultValue = "") {
  const { updateNodeData } = useStore();
  const [value, setValue] = useState(data[fieldName] || defaultValue);

  useEffect(() => {
    if (data[fieldName] && data[fieldName] !== value) {
      setValue(data[fieldName]);
    }
  }, [data[fieldName], value, fieldName]);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      updateNodeData(id, { [fieldName]: newValue });
    },
    [id, fieldName, updateNodeData]
  );

  return [value, handleChange];
}
