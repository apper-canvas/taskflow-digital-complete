import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import SearchBar from "@/components/molecules/SearchBar"
import FilterButtons from "@/components/molecules/FilterButtons"

const TaskFilters = ({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  tasks = []
}) => {
  const [showFilters, setShowFilters] = useState(false)

  const statusFilters = [
    {
      value: "all",
      label: "All Tasks",
      icon: <ApperIcon name="List" size={14} />,
      count: tasks.length
    },
    {
      value: "active",
      label: "Active",
icon: <ApperIcon name="Circle" size={14} />,
      count: tasks.filter(t => !t.completed).length
    },
    {
      value: "completed",
      label: "Completed", 
      icon: <ApperIcon name="CheckCircle" size={14} />,
      count: tasks.filter(t => t.completed).length
    }
  ]

  const priorityFilters = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]

  const sortOptions = [
    { value: "createdAt", label: "Created Date" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" }
  ]

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search tasks by title or description..."
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <ApperIcon name="Filter" size={16} className="mr-2" />
            Filters
          </Button>

          <div className="hidden lg:flex items-center gap-3">
            <Select
              value={filters.priority || "all"}
              onChange={(e) => onFiltersChange({
                ...filters,
                priority: e.target.value === "all" ? null : e.target.value
              })}
              className="w-40"
            >
              {priorityFilters.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({
                ...filters,
                sortBy: e.target.value
              })}
              className="w-36"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="mt-6">
        <FilterButtons
          activeFilter={filters.status}
          onFilterChange={(status) => onFiltersChange({ ...filters, status })}
          filters={statusFilters}
        />
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-slate-200 lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority
              </label>
              <Select
                value={filters.priority || "all"}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  priority: e.target.value === "all" ? null : e.target.value
                })}
              >
                {priorityFilters.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort by
              </label>
              <Select
                value={filters.sortBy}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  sortBy: e.target.value
                })}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskFilters