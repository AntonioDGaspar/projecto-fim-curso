"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
import {
  Users,
  GraduationCap,
  BookOpen,
  DoorOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Professores",
    value: "24",
    icon: Users,
    change: "+2 este mes",
    href: "/professores",
  },
  {
    title: "Turmas",
    value: "18",
    icon: GraduationCap,
    change: "3 sem horario",
    href: "/turmas",
  },
  {
    title: "Disciplinas",
    value: "42",
    icon: BookOpen,
    change: "Todas atribuidas",
    href: "/disciplinas",
  },
  {
    title: "Salas",
    value: "15",
    icon: DoorOpen,
    change: "2 em manutencao",
    href: "/salas",
  },
]

const recentRequests = [
  {
    id: 1,
    professor: "Maria Silva",
    type: "Alteracao de Horario",
    turma: "10A",
    status: "pendente",
    date: "Hoje, 14:30",
  },
  {
    id: 2,
    professor: "Joao Santos",
    type: "Troca de Sala",
    turma: "11B",
    status: "aprovado",
    date: "Ontem, 09:15",
  },
  {
    id: 3,
    professor: "Ana Costa",
    type: "Alteracao de Horario",
    turma: "12C",
    status: "rejeitado",
    date: "28 Jan, 16:45",
  },
  {
    id: 4,
    professor: "Pedro Oliveira",
    type: "Troca de Sala",
    turma: "9D",
    status: "pendente",
    date: "27 Jan, 11:20",
  },
]

const upcomingClasses = [
  { time: "08:00", subject: "Matematica", turma: "10A", room: "Sala 101", professor: "Maria Silva" },
  { time: "09:00", subject: "Portugues", turma: "11B", room: "Sala 203", professor: "Joao Santos" },
  { time: "10:00", subject: "Fisica", turma: "12C", room: "Lab. 01", professor: "Ana Costa" },
  { time: "11:00", subject: "Historia", turma: "9D", room: "Sala 105", professor: "Pedro Oliveira" },
]

const statusColors = {
  pendente: "bg-accent text-accent-foreground",
  aprovado: "bg-green-600 text-white",
  rejeitado: "bg-destructive text-destructive-foreground",
}

const statusIcons = {
  pendente: Clock,
  aprovado: CheckCircle2,
  rejeitado: AlertCircle,
}

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visao geral do sistema de geracao de horarios
          </p>
        </div>
        <Link href="/gerar">
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Gerar Horarios
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-colors hover:bg-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Requisicoes Recentes</CardTitle>
            <Link href="/requisicoes">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => {
                const StatusIcon = statusIcons[request.status as keyof typeof statusIcons]
                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{request.professor}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.type} - Turma {request.turma}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">{request.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Aulas de Hoje</CardTitle>
            <Link href="/horarios">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver horario completo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex h-12 w-16 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">{classItem.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{classItem.subject}</p>
                      <Badge variant="outline">{classItem.turma}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {classItem.room} - {classItem.professor}
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acoes Rapidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/professores">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Adicionar Professor</span>
              </Button>
            </Link>
            <Link href="/turmas">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4 bg-transparent">
                <GraduationCap className="h-6 w-6" />
                <span>Nova Turma</span>
              </Button>
            </Link>
            <Link href="/gerar">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4 bg-transparent">
                <Sparkles className="h-6 w-6" />
                <span>Gerar Horarios</span>
              </Button>
            </Link>
            <Link href="/requisicoes">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4 bg-transparent">
                <AlertCircle className="h-6 w-6" />
                <span>Ver Requisicoes</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
