"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  DoorOpen,
  Clock,
  Calendar,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react"
import { cn } from "@/feactures/dashboard/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard-adm", icon: LayoutDashboard },
  { name: "Professores", href: "/dashboard-adm/professores", icon: Users },
  { name: "Turmas", href: "/dashboard-adm/turmas", icon: GraduationCap },
  { name: "Disciplinas", href: "/dashboard-adm/disciplinas", icon: BookOpen },
  { name: "Salas", href: "/dashboard-adm/salas", icon: DoorOpen },
  { name: "Tempos", href: "/dashboard-adm/tempos", icon: Clock },
  { name: "Horarios", href: "/dashboard-adm/horarios", icon: Calendar },
  { name: "Gerar Horarios", href: "/dashboard-adm/gerar", icon: Sparkles },
  { name: "Requisicoes", href: "/dashboard-adm/requisicoes", icon: FileText },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Calendar className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">ScheduleGen</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        <div className="mb-4">
          <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Menu Principal
          </p>
        </div>
        {navigation.slice(0, 1).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
        
        <div className="mb-4 mt-6">
          <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Gestao de Dados
          </p>
        </div>
        {navigation.slice(1, 6).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
        
        <div className="mb-4 mt-6">
          <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Horarios
          </p>
        </div>
        {navigation.slice(6).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-sidebar-border p-4">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="h-5 w-5" />
          Configuracoes
        </Link>
      </div>
    </aside>
  )
}
