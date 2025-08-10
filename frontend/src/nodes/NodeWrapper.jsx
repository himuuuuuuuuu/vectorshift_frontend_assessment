import { useState } from "react";
import useStore from "@/zustand/store";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Maximize2, Settings, X, Minimize2 } from "lucide-react";
import DefaultComponent from "./DefaultComponent";

const positionMap = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

const NodeWrapper = ({ data, config, id }) => {
  const NodeComponent = config.component ? config.component : DefaultComponent;
  const { deleteElements } = useReactFlow();

  const { updateNodeVariable } = useStore();
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div
      className={`p-0.5 relative border bg-white rounded-[4px] transition-all
        hover:shadow-[0px_0px_1px_1px_rgba(129,_140,_248,_0.9)]
        ${isMaximized ? "w-[300px]" : "w-[180px]"}`}
    >
      {/* Node-specific content */}
      <div className='rounded-[4px] border border-indigo-300/80 h-8 p-1 bg-indigo-50 flex flex-col justify-center mb-1 relative'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-[7px] text-left flex items-center gap-0.5 font-medium'>
              <config.icon className='size-[7px]' />
              {config.label}
            </h3>
            <p className='text-[6px] tracking-tighter leading-1.5 text-left'>
              {config.description}
            </p>
          </div>
          <div className='flex items-center gap-0.5'>
            <button
              className='p-1 hover:bg-indigo-200 rounded text-[6px] text-indigo-600'
              onClick={() => setIsMaximized(!isMaximized)}
            >
              {isMaximized ? (
                <Minimize2 className='size-2' />
              ) : (
                <Maximize2 className='size-2' />
              )}
            </button>
            <button className='p-1 hover:bg-indigo-200 rounded text-[6px] text-indigo-600'>
              <Settings className='size-2' />
            </button>
            <button
              className='p-1 hover:bg-indigo-200 rounded text-[6px] text-indigo-600'
              onClick={() => deleteElements({ nodes: [{ id }] })}
            >
              <X className='size-2' />
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start w-full text-[7px]'>
        <input
          type='text'
          className='w-full text-center border-none outline-none bg-indigo-200 p-1 rounded-[3px] text-[6px]'
          value={data.variables[0]?.name || ""}
          onChange={(e) => {
            if (data.variables?.[0]?.id) {
              // Update the node's variable in the store
              updateNodeVariable(id, data.variables[0].id, {
                name: e.target.value,
              });
              // Also update the node's data to reflect the change immediately
              data.variables[0].name = e.target.value;
            }
          }}
        />
      </div>
      <div className='flex flex-col justify-start items-start w-full text-[7px]'>
        <NodeComponent data={data} id={id} />
      </div>
      {/* Handles from config */}
      {config.handles?.map((h, idx) => (
        <Handle
          key={idx}
          type={h.type}
          position={positionMap[h.position]}
          id={h.id}
          style={h.style || {}}
        />
      ))}
    </div>
  );
};

export default NodeWrapper;
