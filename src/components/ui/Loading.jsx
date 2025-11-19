import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="w-48 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg mx-auto mb-4 animate-pulse"></div>
        <div className="w-96 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-20 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded mb-2 animate-pulse"></div>
                <div className="w-16 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Task form skeleton */}
      <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200">
        <div className="space-y-4">
          <div className="w-32 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
          <div className="w-full h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
            <div className="w-32 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 mr-4">
                <div className="w-64 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded mb-2 animate-pulse"></div>
                <div className="w-48 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
              <div className="w-6 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
                <div className="w-20 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading