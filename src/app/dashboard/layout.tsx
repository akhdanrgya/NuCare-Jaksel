import { AuthProvider } from "../../../components/AuthProvider"
import RouteGuard from "../../../components/RouteGuard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RouteGuard isPrivate>
        {children}
      </RouteGuard>
    </AuthProvider>
  )
}
