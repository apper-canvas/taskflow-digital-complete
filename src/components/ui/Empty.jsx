import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ onCreateTask }) => {
  return (
    <div className="text-center py-16 px-8">
      <div className="max-w-md mx-auto">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 rounded-3xl mx-auto flex items-center justify-center mb-4">
            <ApperIcon name="CheckCircle" size={48} className="text-primary" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-1/2 transform -translate-x-16">
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-100"></div>
          </div>
          <div className="absolute top-8 right-1/2 transform translate-x-16">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-300"></div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-12">
            <div className="w-4 h-4 bg-primary/30 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
          Your task list is empty
        </h2>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Ready to get organized? Create your first task and start building productive habits that stick.
        </p>
        
        {onCreateTask && (
          <Button
            onClick={onCreateTask}
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 mb-8"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Create Your First Task
          </Button>
        )}
        
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center">
            <ApperIcon name="Lightbulb" size={20} className="text-warning mr-2" />
            Pro Tips to Get Started
          </h3>
          
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                <ApperIcon name="Target" size={12} className="text-primary" />
              </div>
              <p>Set clear, actionable tasks with specific outcomes</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-secondary/10 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                <ApperIcon name="Calendar" size={12} className="text-secondary" />
              </div>
              <p>Add due dates to stay on track with deadlines</p>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-accent/10 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                <ApperIcon name="Flag" size={12} className="text-accent" />
              </div>
              <p>Use priority levels to focus on what matters most</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empty