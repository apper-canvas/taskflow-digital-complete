import { format, isToday, isTomorrow, isYesterday, isPast, differenceInDays } from "date-fns"

export const formatRelativeDate = (dateString) => {
  if (!dateString) return ""
  
  const date = new Date(dateString)
  
  if (isToday(date)) {
    return "Today"
  }
  
  if (isTomorrow(date)) {
    return "Tomorrow"
  }
  
  if (isYesterday(date)) {
    return "Yesterday"
  }
  
  const daysDiff = differenceInDays(date, new Date())
  
  if (daysDiff > 0 && daysDiff <= 7) {
    return `In ${daysDiff} days`
  }
  
  if (daysDiff < 0 && daysDiff >= -7) {
    return `${Math.abs(daysDiff)} days ago`
  }
  
  return format(date, "MMM d, yyyy")
}

export const getDueDateColor = (dateString) => {
  if (!dateString) return "text-slate-500"
  
  const date = new Date(dateString)
  
  if (isPast(date) && !isToday(date)) {
    return "text-error"
  }
  
  if (isToday(date)) {
    return "text-warning"
  }
  
  return "text-slate-600"
}

export const isPastDue = (dateString) => {
  if (!dateString) return false
  const date = new Date(dateString)
  return isPast(date) && !isToday(date)
}

export const formatDateForInput = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return format(date, "yyyy-MM-dd")
}