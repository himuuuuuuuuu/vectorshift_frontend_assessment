import { useState, useEffect, useRef } from "react";
import useStore from "@/zustand/store";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { X } from "lucide-react";

export default function VariableInput({
  id,
  value,
  onChange,
  placeholder = "Type {{ to see available nodes...",
  label = "Input",
}) {
  const { getAllNodeVariables } = useStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);

  // Parse variables from text
  const parseVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.push({
        name: match[1],
        start: match.index,
        end: match.index + match[0].length,
        full: match[0],
      });
    }
    return variables;
  };

  const existingVariables = parseVariables(value || "");

  // Get all available node variables for suggestions (exclude current node only)
  const allNodeVariables = getAllNodeVariables();

  const availableNodeVariables = allNodeVariables.filter((item) => {
    const isNotCurrentNode = item.nodeId !== id;
    const hasVariable = !!item.variable;

    // Remove the isNotUsed condition to allow reuse of variables
    return isNotCurrentNode && hasVariable;
  });

  // Check for {{ at cursor position in the typed text (not including variables)
  useEffect(() => {
    const typedText = (value || "").replace(/\{\{[^}]+\}\}/g, "");
    const textBeforeCursor = typedText.substring(0, cursorPosition);
    const lastTwoBraces = textBeforeCursor.slice(-2);

    if (
      lastTwoBraces === "{{" &&
      !textBeforeCursor.slice(-3, -2).match(/[{}]/)
    ) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value, cursorPosition]);

  const handleNodeSelect = (nodeName) => {
    const typedText = (value || "").replace(/\{\{[^}]+\}\}/g, "");
    const textBeforeCursor = typedText.substring(0, cursorPosition);

    // Find the last {{ in typed text
    const lastBraceIndex = textBeforeCursor.lastIndexOf("{{");

    if (lastBraceIndex !== -1) {
      const beforeBraces = textBeforeCursor.substring(0, lastBraceIndex);
      const afterCursor = typedText.substring(cursorPosition);

      // Combine: existing variables + text before {{ + new variable + text after cursor
      const variableText = existingVariables.map((v) => v.full).join("");
      const newValue =
        variableText + beforeBraces + `{{${nodeName}}}` + afterCursor;

      onChange(newValue);
      setShowSuggestions(false);

      // Reset cursor position
      setTimeout(() => {
        const newCursorPos = beforeBraces.length;
        setCursorPosition(newCursorPos);
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    const newTypedValue = e.target.value;
    const newCursorPos = e.target.selectionStart;
    setCursorPosition(newCursorPos);

    // Combine existing variables with new typed content
    const variableText = existingVariables.map((v) => v.full).join("");
    const newValue = variableText + newTypedValue;

    onChange(newValue);
  };

  const handleCursorChange = (e) => {
    setCursorPosition(e.target.selectionStart);
  };

  const removeVariable = (variableToRemove) => {
    const newValue = (value || "").replace(variableToRemove.full, "");
    onChange(newValue);
  };

  return (
    <div className='space-y-2 w-full'>
      <div className='relative mt-1 w-full'>
        <div className='w-full flex flex-col justify-start items-start'>
          <label className='text-[6px] w-full text-left'>{label}</label>

          {/* Custom input field that simulates badges inside */}
          <div
            className='relative w-full border border-gray-200 rounded-[3px] p-[2px] text-[6px] bg-white flex items-center gap-1'
            style={{
              minHeight: "16px",
              maxHeight: "50px",
              height: "auto",
              flexWrap: "wrap",
            }}
            onKeyDown={(e) => {
              // Remove variable with Backspace/Delete if caret is at start
              if (
                (e.key === "Backspace" || e.key === "Delete") &&
                inputRef.current &&
                inputRef.current.selectionStart === 0 &&
                existingVariables.length > 0
              ) {
                removeVariable(existingVariables[existingVariables.length - 1]);
                e.preventDefault();
              }
            }}
          >
            {/* Render existing variables as inline badges */}
            {existingVariables.map((variable, index) => (
              <span
                key={index}
                className='inline-flex items-center gap-0.5 bg-indigo-100 text-indigo-800 px-1 py-0.5 rounded-[3px] text-[6px] flex-shrink-0 whitespace-nowrap'
                style={{
                  height: "auto",
                  lineHeight: "1",
                  fontSize: "6px",
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" ||
                    e.key === "Delete" ||
                    e.key === "Enter"
                  ) {
                    removeVariable(variable);
                    e.preventDefault();
                  }
                }}
              >
                {variable.name}
                <button
                  onClick={() => removeVariable(variable)}
                  className='hover:bg-indigo-200 rounded-full p-0.5'
                  tabIndex={-1}
                >
                  <X className='w-2 h-2' />
                </button>
              </span>
            ))}

            {/* Auto-growing textarea for typing */}
            <textarea
              ref={inputRef}
              value={value?.replace(/\{\{[^}]+\}\}/g, "") || ""}
              onChange={handleInputChange}
              onSelect={handleCursorChange}
              onClick={handleCursorChange}
              onKeyUp={handleCursorChange}
              placeholder={existingVariables.length === 0 ? placeholder : ""}
              className='outline-0 border-0 bg-transparent text-[6px] resize-none'
              style={{
                fontSize: "6px",
                minHeight: "12px",
                maxHeight: "40px",
                overflowY: "auto",
                height: "auto",
                width: existingVariables.length > 0 ? "auto" : "100%",
                minWidth: existingVariables.length > 0 ? "20px" : "100%",
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: existingVariables.length > 0 ? "20px" : "100%",
                lineHeight: "12px",
              }}
              rows={1}
              onInput={(e) => {
                e.target.style.height = "12px";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 40) + "px";
              }}
              onKeyDown={(e) => {
                // Remove variable with Backspace/Delete if caret is at start
                if (
                  (e.key === "Backspace" || e.key === "Delete") &&
                  e.target.selectionStart === 0 &&
                  existingVariables.length > 0
                ) {
                  removeVariable(
                    existingVariables[existingVariables.length - 1]
                  );
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        {showSuggestions && (
          <div className='absolute top-full left-0 w-full min-w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1'>
            <Command>
              <CommandInput
                placeholder='Search nodes...'
                className='h-8 text-[7px]'
              />
              <CommandList>
                <CommandEmpty className='text-[6px] p-1'>
                  No available variables found.
                </CommandEmpty>
                <CommandGroup>
                  {availableNodeVariables.map((item) => (
                    <CommandItem
                      key={item.nodeId}
                      onSelect={() => handleNodeSelect(item.variable.name)}
                      className='text-[7px] cursor-pointer'
                    >
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-indigo-400 rounded-full'></div>
                        <span>{item.variable.name}</span>
                        <span className='text-gray-500 text-[6px]'>
                          ({item.nodeType})
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}
