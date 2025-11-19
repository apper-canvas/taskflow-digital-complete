import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  variant = "default",
  size = "md",
  error,
  children,
  className,
  ...props 
}, ref) => {
  const baseClasses = "w-full border rounded-lg transition-all duration-200 ease-out bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
  
  const variants = {
    default: "border-slate-300 focus:border-primary focus:ring-primary/20",
    error: "border-error focus:border-error focus:ring-error/20"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-4 py-4 text-base"
  }
  
  const currentVariant = error ? "error" : variant
  
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          baseClasses,
          variants[currentVariant],
          sizes[size],
          "pr-10", // Space for arrow
          className
        )}
        {...props}
      >
        {children}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select