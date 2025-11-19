import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  checked = false,
  size = "md",
  disabled = false,
  className,
  onChange,
  ...props 
}, ref) => {
  const baseClasses = "relative inline-flex items-center justify-center border-2 rounded-md transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }
  
  const checkedClasses = checked 
    ? "bg-gradient-to-br from-primary to-indigo-600 border-primary text-white shadow-sm" 
    : "bg-white border-slate-300 hover:border-slate-400"
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }
  
  return (
    <div
      className={cn(
        baseClasses,
        sizes[size],
        checkedClasses,
        "focus:ring-primary/30",
        className
      )}
      onClick={() => !disabled && onChange?.(!checked)}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      onKeyPress={(e) => {
        if ((e.key === " " || e.key === "Enter") && !disabled) {
          e.preventDefault()
          onChange?.(!checked)
        }
      }}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={iconSizes[size]} 
          className="animate-checkmark"
        />
      )}
      
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={() => {}} // Controlled by parent click
        className="sr-only"
        disabled={disabled}
        tabIndex={-1}
      />
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox