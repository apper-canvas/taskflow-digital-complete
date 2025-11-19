import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ error, onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false)
  
  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true)
      try {
        await onRetry()
      } finally {
        setIsRetrying(false)
      }
    }
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-slate-600 mb-2 leading-relaxed">
          We encountered an error while loading your tasks. This might be a temporary issue.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-700 font-medium">
              {error}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
          >
            {isRetrying ? (
              <>
                <ApperIcon name="RotateCcw" size={16} className="animate-spin mr-2" />
                Retrying...
              </>
            ) : (
              <>
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                Try Again
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Refresh Page
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-medium text-slate-900 mb-2">Troubleshooting Tips:</h3>
          <ul className="text-sm text-slate-600 space-y-1 text-left">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache and cookies</li>
            <li>• Make sure localStorage is enabled</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ErrorView