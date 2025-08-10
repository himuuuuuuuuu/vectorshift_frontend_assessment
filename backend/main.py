from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from collections import defaultdict, deque
from typing import Dict, List, Any

app = FastAPI()

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sorting) to detect cycles.
    """
    if not nodes:
        return True
    
    # Create adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with 0 in-degree
    node_ids = {node['id'] for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        # Validate that edge endpoints exist in nodes
        if source not in node_ids or target not in node_ids:
            continue
            
        graph[source].append(target)
        in_degree[target] += 1
    
    # Kahn's algorithm
    queue = deque()
    
    # Add all nodes with 0 in-degree to queue
    for node_id in node_ids:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    processed_count = 0
    
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    """
    Parse a pipeline and return statistics about nodes, edges, and DAG validation.
    """
    try:
        # Parse the JSON pipeline data
        pipeline_data = json.loads(pipeline)
        
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        # Calculate statistics
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Check if it's a DAG
        is_valid_dag = is_dag(nodes, edges)
        
        # Return results
        result = {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_valid_dag
        }
        
        return result
        
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON format: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing pipeline: {str(e)}")

# Health check endpoint
@app.get('/health')
def health_check():
    return {'status': 'healthy', 'message': 'Pipeline parser service is running'}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)