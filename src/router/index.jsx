import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"

const TaskManager = lazy(() => import("@/components/pages/TaskManager"))
const NotFound = lazy(() => import("@/components/pages/NotFound"))

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100">
    <div className="text-center space-y-4">
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p className="text-slate-600 font-medium">Loading TaskFlow...</p>
    </div>
  </div>
)

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <TaskManager />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    )
  }
]

const routes = [
  {
    path: "/",
    children: mainRoutes
  }
]

export const router = createBrowserRouter(routes)