import useStore from "@/zustand/store";

const submitPipeline = async (onSuccess, onError) => {
  const { nodes, edges } = useStore.getState();

  try {
    // Prepare the pipeline data
    const pipelineData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
    };

    // Create form data
    const formData = new FormData();
    formData.append("pipeline", JSON.stringify(pipelineData));

    // Send to backend
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Call success callback with results
    if (onSuccess) {
      onSuccess(result);
    }

    return result;
  } catch (error) {
    console.error("Error submitting pipeline:", error);

    // Call error callback
    if (onError) {
      onError(error);
    }

    throw error;
  }
};

export default submitPipeline;
