import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-primary/50",
    secondary: "bg-gradient-to-r from-secondary to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-secondary/50",
    accent: "bg-gradient-to-r from-accent to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-accent/50",
    outline: "border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-md focus:ring-slate-300",
    ghost: "text-slate-600 bg-transparent hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-error/50",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-success/50"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[32px]",
    md: "px-4 py-2 text-sm min-h-[40px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
    xl: "px-8 py-4 text-lg min-h-[56px]"
  }
  
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      
      {children}
      
      {!loading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button