import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"

const FilterButtons = ({ 
  activeFilter,
  onFilterChange,
  filters,
  className,
  ...props 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "primary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "transition-all duration-200",
            activeFilter === filter.value 
              ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md" 
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          {filter.icon && <span className="mr-2">{filter.icon}</span>}
          {filter.label}
          {filter.count !== undefined && (
            <span className={cn(
              "ml-2 px-2 py-0.5 rounded-full text-xs font-medium",
              activeFilter === filter.value 
                ? "bg-white/20 text-white" 
                : "bg-slate-200 text-slate-600"
            )}>
              {filter.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  )
}

export default FilterButtons