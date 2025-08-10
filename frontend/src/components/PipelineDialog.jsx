import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  GitBranch,
  X,
} from "lucide-react";

const PipelineResultsDialog = ({ isOpen, onClose, results }) => {
  if (!results) return null;

  const { num_nodes, num_edges, is_dag } = results;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <BarChart3 className='w-5 h-5 text-indigo-600' />
            Pipeline Analysis Results
          </DialogTitle>
          <DialogDescription>
            Analysis of your pipeline structure and validation
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Statistics Section */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-blue-50 rounded-lg p-3 border border-blue-200'>
              <div className='flex items-center gap-2 text-blue-700'>
                <BarChart3 className='w-4 h-4' />
                <span className='text-sm font-medium'>Nodes</span>
              </div>
              <div className='text-2xl font-bold text-blue-900 mt-1'>
                {num_nodes}
              </div>
            </div>

            <div className='bg-purple-50 rounded-lg p-3 border border-purple-200'>
              <div className='flex items-center gap-2 text-purple-700'>
                <GitBranch className='w-4 h-4' />
                <span className='text-sm font-medium'>Edges</span>
              </div>
              <div className='text-2xl font-bold text-purple-900 mt-1'>
                {num_edges}
              </div>
            </div>
          </div>

          {/* DAG Validation Section */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <h3 className='font-medium text-sm'>
                Graph Structure Validation
              </h3>
              <Badge
                variant={is_dag ? "default" : "destructive"}
                className='text-xs'
              >
                {is_dag ? "Valid DAG" : "Invalid"}
              </Badge>
            </div>

            {is_dag ? (
              <Alert className='border-green-200 bg-green-50'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <AlertDescription className='text-green-800'>
                  <div className='space-y-1'>
                    <div className='font-medium'>
                      ✅ Valid Directed Acyclic Graph (DAG)
                    </div>
                    <div className='text-sm'>
                      Your pipeline has no cycles and is ready for execution.
                      Data will flow correctly through all nodes without
                      infinite loops.
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className='border-red-200 bg-red-50'>
                <AlertTriangle className='h-4 w-4 text-red-600' />
                <AlertDescription className='text-red-800'>
                  <div className='space-y-2'>
                    <div className='font-medium'>
                      ❌ Contains Cycles (Not a DAG)
                    </div>
                    <div className='text-sm space-y-1'>
                      <div>
                        Your pipeline contains circular dependencies that could
                        cause:
                      </div>
                      <ul className='list-disc list-inside text-sm space-y-0.5 ml-2'>
                        <li>Infinite loops during execution</li>
                        <li>Stack overflow errors</li>
                        <li>Unpredictable processing behavior</li>
                        <li>Resource exhaustion</li>
                      </ul>
                    </div>
                    <div className='text-sm font-medium mt-2'>
                      💡 <span className='text-red-700'>Fix Required:</span>{" "}
                      Remove circular connections between nodes
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Summary Section */}
          <div className='bg-gray-50 rounded-lg p-3 border'>
            <h4 className='font-medium text-sm mb-2 flex items-center gap-2'>
              <CheckCircle className='w-4 h-4 text-gray-600' />
              Summary
            </h4>
            <div className='text-sm text-gray-700 space-y-1'>
              <div>
                Pipeline contains <strong>{num_nodes}</strong> nodes connected
                by <strong>{num_edges}</strong> edges
              </div>
              <div
                className={`font-medium ${
                  is_dag ? "text-green-700" : "text-red-700"
                }`}
              >
                Status:{" "}
                {is_dag
                  ? "Ready for deployment"
                  : "Requires fixes before deployment"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-end pt-2'>
            <Button
              onClick={onClose}
              className='bg-indigo-600 hover:bg-indigo-700'
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PipelineResultsDialog;
