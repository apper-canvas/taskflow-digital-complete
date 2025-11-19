import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Error Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 rounded-3xl mx-auto flex items-center justify-center mb-4">
            <ApperIcon name="FileQuestion" size={48} className="text-primary" />
          </div>
          
          {/* Decorative elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
            className="absolute top-4 left-1/2 transform -translate-x-16"
          >
            <div className="w-4 h-4 bg-secondary/60 rounded-full"></div>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              delay: 0.5,
              ease: "easeInOut"
            }}
            className="absolute bottom-8 right-1/2 transform translate-x-16"
          >
            <div className="w-3 h-3 bg-accent/60 rounded-full"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-primary to-indigo-700 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            Looks like this task got lost somewhere! The page you're looking for doesn't exist 
            or may have been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Home" size={20} className="mr-2" />
            Back to TaskFlow
          </Button>
          
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-slate-600 hover:text-slate-900"
            >
              <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-xl border border-slate-200"
        >
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center">
            <ApperIcon name="Lightbulb" size={18} className="text-warning mr-2" />
            Quick Actions
          </h3>
          
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-center">
              <ApperIcon name="Plus" size={14} className="text-primary mr-2" />
              <span>Create your first task and get organized</span>
            </div>
            
            <div className="flex items-center justify-center">
              <ApperIcon name="Search" size={14} className="text-secondary mr-2" />
              <span>Search and filter tasks by priority</span>
            </div>
            
            <div className="flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={14} className="text-success mr-2" />
              <span>Mark tasks as complete and track progress</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound