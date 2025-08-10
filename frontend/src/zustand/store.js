import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  updateNodeVariable: (nodeId, variableId, updates) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              variables:
                node.data.variables?.map((variable) =>
                  variable.id === variableId
                    ? { ...variable, ...updates }
                    : variable
                ) || [],
            },
          };
        }
        return node;
      }),
    }));
  },

  updateNodeData: (nodeId, updates) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updates,
            },
            // Update node dimensions if height is provided
            ...(updates.height && {
              style: {
                ...node.style,
                height: `${updates.height}px`,
              },
            }),
          };
        }
        return node;
      }),
    }));
  },

  getConnectedVariables: (nodeId) => {
    const state = get();
    const node = state.nodes.find((n) => n.id === nodeId);
    if (!node) return [];

    // Find edges where this node is the target (input)
    const inputEdges = state.edges.filter((edge) => edge.target === nodeId);

    // Get variables from source nodes
    const connectedVariables = inputEdges
      .map((edge) => {
        const sourceNode = state.nodes.find((n) => n.id === edge.source);
        return sourceNode?.data.variables?.[0];
      })
      .filter(Boolean);

    return connectedVariables;
  },

  getAllNodeVariables: () => {
    const state = get();
    const variables = [];

    state.nodes.forEach((node) => {
      // For text nodes, include extracted variables
      if (node.type === "text" && node.data.extractedVars) {
        node.data.extractedVars.forEach((varName) => {
          variables.push({
            nodeId: node.id,
            nodeType: node.type,
            variable: {
              name: varName,
              type: "text",
              id: `${node.id}-${varName}`,
            },
          });
        });
      }

      // For other nodes, include regular variables
      if (node.data.variables) {
        node.data.variables.forEach((variable) => {
          variables.push({
            nodeId: node.id,
            nodeType: node.type,
            variable: variable,
          });
        });
      }
    });

    return variables.filter((item) => item.variable);
  },

  getNextInputName: () => {
    const state = get();
    const inputNodes = state.nodes.filter((node) => node.type === "input");
    const existingNames = inputNodes
      .map((node) => node.data.variables?.[0]?.name)
      .filter(Boolean);

    let counter = 1;
    let name = `input_${counter.toString().padStart(2, "0")}`;
    while (existingNames.includes(name)) {
      counter++;
      name = `input_${counter.toString().padStart(2, "0")}`;
    }
    return name;
  },

  isInputNameUnique: (name, excludeNodeId) => {
    const state = get();
    const inputNodes = state.nodes.filter(
      (node) => node.type === "input" && node.id !== excludeNodeId
    );
    const existingNames = inputNodes
      .map((node) => node.data.variables?.[0]?.name)
      .filter(Boolean);
    return !existingNames.includes(name);
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes) => {
    set({ nodes });
  },

  setEdges: (edges) => {
    set({ edges });
  },

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },

  // Helper method to get pipeline data for submission
  getPipelineData: () => {
    const state = get();
    return {
      nodes: state.nodes,
      edges: state.edges,
    };
  },
}));

export default useStore;
