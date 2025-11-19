import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const StatCard = ({ 
  title,
  value,
  subtitle,
  icon,
  color = "primary",
  trend,
  className,
  ...props 
}) => {
  const colorClasses = {
    primary: "text-primary bg-gradient-to-br from-primary/10 to-indigo-100",
    secondary: "text-secondary bg-gradient-to-br from-secondary/10 to-purple-100",
    accent: "text-accent bg-gradient-to-br from-accent/10 to-pink-100",
    success: "text-success bg-gradient-to-br from-success/10 to-green-100",
    warning: "text-warning bg-gradient-to-br from-warning/10 to-amber-100",
    error: "text-error bg-gradient-to-br from-error/10 to-red-100"
  }
  
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-600 mb-1">
            {title}
          </p>
          
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-slate-900">
              {value}
            </p>
            
            {trend && (
              <span className={cn(
                "ml-2 text-xs font-medium px-2 py-1 rounded-full",
                trend.type === "increase" ? "text-success bg-green-100" : "text-error bg-red-100"
              )}>
                <ApperIcon 
                  name={trend.type === "increase" ? "TrendingUp" : "TrendingDown"} 
                  size={10} 
                  className="inline mr-1" 
                />
                {trend.value}
              </span>
            )}
          </div>
          
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            colorClasses[color]
          )}>
            <ApperIcon name={icon} size={24} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard