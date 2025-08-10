import Topbar from "./components/Topbar";
import FlowEditor from "./canvas/FlowEditor";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <main className='h-screen w-screen'>
      <Topbar />
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    </main>
  );
}

export default App;
