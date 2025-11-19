import { motion } from "framer-motion"
import StatCard from "@/components/molecules/StatCard"
import { getTaskStats } from "@/utils/taskUtils"

const TaskStats = ({ tasks = [] }) => {
  const stats = getTaskStats(tasks)
  
  const statsConfig = [
    {
      title: "Total Tasks",
      value: stats.total,
      subtitle: `${stats.active} active, ${stats.completed} completed`,
      icon: "ListTodo",
      color: "primary"
    },
    {
      title: "Completed",
      value: stats.completed,
      subtitle: `${stats.completionRate}% completion rate`,
      icon: "CheckCircle",
      color: "success"
    },
    {
      title: "In Progress",
      value: stats.active,
      subtitle: stats.active === 1 ? "task remaining" : "tasks remaining",
      icon: "Clock",
      color: "warning"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            color={stat.color}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default TaskStats