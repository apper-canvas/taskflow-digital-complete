import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  type = "text",
  variant = "default",
  size = "md",
  error,
  className,
  ...props 
}, ref) => {
  const baseClasses = "w-full border rounded-lg transition-all duration-200 ease-out placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    default: "border-slate-300 bg-white text-slate-900 focus:border-primary focus:ring-primary/20",
    error: "border-error bg-white text-slate-900 focus:border-error focus:ring-error/20"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-4 py-4 text-base"
  }
  
  const currentVariant = error ? "error" : variant
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseClasses,
        variants[currentVariant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input