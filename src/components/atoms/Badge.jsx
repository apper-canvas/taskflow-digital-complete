import { cn } from "@/utils/cn"

const Badge = ({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full border transition-all duration-200 ease-out"
  
  const variants = {
    default: "bg-slate-100 border-slate-200 text-slate-700",
    primary: "bg-indigo-100 border-indigo-200 text-indigo-700",
    secondary: "bg-purple-100 border-purple-200 text-purple-700",
    accent: "bg-pink-100 border-pink-200 text-pink-700",
    success: "bg-green-100 border-green-200 text-green-700",
    warning: "bg-amber-100 border-amber-200 text-amber-700",
    error: "bg-red-100 border-red-200 text-red-700",
    high: "bg-indigo-100 border-indigo-200 text-indigo-700",
    medium: "bg-purple-100 border-purple-200 text-purple-700",
    low: "bg-pink-100 border-pink-200 text-pink-700"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-sm"
  }
  
  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge