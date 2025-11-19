import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const SearchBar = ({ 
  value = "",
  onChange,
  placeholder = "Search tasks...",
  className,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <ApperIcon 
          name="Search" 
          size={16} 
          className={cn(
            "transition-colors duration-200",
            isFocused ? "text-primary" : "text-slate-400"
          )}
        />
      </div>
      
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {value && (
        <button
          onClick={() => onChange?.("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors duration-200"
          type="button"
        >
          <ApperIcon name="X" size={14} className="text-slate-400 hover:text-slate-600" />
        </button>
      )}
    </div>
  )
}

export default SearchBar