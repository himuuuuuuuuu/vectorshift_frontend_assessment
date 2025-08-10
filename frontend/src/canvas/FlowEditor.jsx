import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import useStore from "@/zustand/store";
import { useShallow } from "zustand/react/shallow";

import { nodeConfig } from "./nodeConfigs";
import NodeWrapper from "@/nodes/NodeWrapper";
import CustomEdge from "@/components/CustomEdge";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});

const nodeTypes = nodeConfig.reduce((acc, cfg) => {
  acc[cfg.type] = (props) => <NodeWrapper {...props} config={cfg} />;
  return acc;
}, {});

const edgeTypes = {
  custom: CustomEdge,
};

const FlowEditor = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useStore(useShallow(selector));

  const reactFlowInstance = useReactFlow();

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Get the config for this node type to access initial variables
    const nodeConfigItem = nodeConfig.find((cfg) => cfg.type === type);

    const newNode = {
      id: crypto.randomUUID(),
      type,
      position,
      data: {
        label: `${type} node`,
        variables:
          nodeConfigItem?.variables?.map((variable) => ({
            ...variable,
            id: crypto.randomUUID(), // Give each variable a unique ID
            nodeId: crypto.randomUUID(), // Give each node's variables a unique identifier
          })) || [],
      },
    };

    // For input nodes, ensure unique naming
    if (type === "input") {
      const nextName = useStore.getState().getNextInputName();
      if (newNode.data.variables?.[0]) {
        newNode.data.variables[0].name = nextName;
      }
    }

    addNode(newNode);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      className='h-[calc(100vh_-_9rem)] w-full'
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: "custom",
        }}
        connectionLineType='smoothstep'
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
