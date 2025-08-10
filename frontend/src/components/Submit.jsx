import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import submitPipeline from "@/lib/submitPipeline";
import PipelineResultsDialog from "./PipelineDialog";

const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await submitPipeline(
        // Success callback
        (data) => {
          setResults(data);
          setShowResults(true);
        },
        // Error callback
        (err) => {
          setError(err.message);
        }
      );
    } catch (error) {
      console.error("Submission failed:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setResults(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <div className='flex flex-col items-end gap-2'>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all hover:shadow-lg disabled:opacity-50'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='w-4 h-4 animate-spin' />
              Processing...
            </>
          ) : (
            <>
              <Play className='w-4 h-4' />
              Submit Pipeline
            </>
          )}
        </Button>

        {/* Error Alert */}
        {error && (
          <Alert className='border-red-200 bg-red-50 max-w-sm'>
            <AlertCircle className='h-4 w-4 text-red-600' />
            <AlertDescription className='text-red-800 text-sm'>
              <div className='flex items-center justify-between'>
                <span>Failed to submit: {error}</span>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleCloseError}
                  className='h-auto p-1 hover:bg-red-100'
                >
                  ×
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Results Dialog */}
      <PipelineResultsDialog
        isOpen={showResults}
        onClose={handleCloseResults}
        results={results}
      />
    </>
  );
};

export default SubmitButton;
