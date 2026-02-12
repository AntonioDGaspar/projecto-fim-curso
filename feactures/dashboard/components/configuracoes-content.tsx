"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Input } from "@/feactures/dashboard/components/ui/input"
import { Label } from "@/feactures/dashboard/components/ui/label"
import { Switch } from "@/feactures/dashboard/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/feactures/dashboard/components/ui/select"
import { Separator } from "@/feactures/dashboard/components/ui/separator"
import { Settings, Bell, Shield, Calendar, Database, Save } from "lucide-react"

export function ConfiguracoesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuracoes</h1>
        <p className="text-muted-foreground">
          Gerir configuracoes do sistema de horarios
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Configuracoes de Horario</CardTitle>
            </div>
            <CardDescription>
              Defina os parametros para geracao de horarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="anoLetivo">Ano Letivo</Label>
                <Select defaultValue="2025-2026">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024/2025</SelectItem>
                    <SelectItem value="2025-2026">2025/2026</SelectItem>
                    <SelectItem value="2026-2027">2026/2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semestre">Semestre/Periodo</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1o Semestre</SelectItem>
                    <SelectItem value="2">2o Semestre</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Dias de Aula</h4>
              <div className="grid gap-4 sm:grid-cols-5">
                {["Segunda", "Terca", "Quarta", "Quinta", "Sexta"].map((dia) => (
                  <div key={dia} className="flex items-center space-x-2">
                    <Switch id={dia} defaultChecked />
                    <Label htmlFor={dia}>{dia}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxAulasDia">Maximo de aulas/dia por professor</Label>
                <Input id="maxAulasDia" type="number" defaultValue="6" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAulasSeguidas">Maximo de aulas seguidas</Label>
                <Input id="maxAulasSeguidas" type="number" defaultValue="3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Preferencias de Geracao</CardTitle>
            </div>
            <CardDescription>
              Configure como os horarios sao gerados automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Evitar furos no horario</Label>
                <p className="text-sm text-muted-foreground">
                  Minimizar periodos livres entre aulas
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Respeitar preferencias dos professores</Label>
                <p className="text-sm text-muted-foreground">
                  Considerar horarios preferenciais definidos pelos professores
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Balancear carga semanal</Label>
                <p className="text-sm text-muted-foreground">
                  Distribuir aulas uniformemente ao longo da semana
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Agrupar aulas da mesma disciplina</Label>
                <p className="text-sm text-muted-foreground">
                  Colocar blocos de aulas seguidos quando possivel
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificacoes</CardTitle>
            </div>
            <CardDescription>
              Gerencie como recebe notificacoes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novas requisicoes</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alerta quando professores submeterem requisicoes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Conflitos detectados</Label>
                <p className="text-sm text-muted-foreground">
                  Alerta quando conflitos forem encontrados nos horarios
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificacoes por email</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificacoes importantes por email
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle>Dados e Backup</CardTitle>
            </div>
            <CardDescription>
              Exportar e fazer backup dos dados do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exportar todos os horarios</Label>
                <p className="text-sm text-muted-foreground">
                  Descarregar horarios em formato PDF ou Excel
                </p>
              </div>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup completo</Label>
                <p className="text-sm text-muted-foreground">
                  Criar backup de todos os dados do sistema
                </p>
              </div>
              <Button variant="outline" size="sm">
                Criar Backup
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar dados</Label>
                <p className="text-sm text-muted-foreground">
                  Importar dados de ficheiro CSV ou Excel
                </p>
              </div>
              <Button variant="outline" size="sm">
                Importar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Guardar Alteracoes
          </Button>
        </div>
      </div>
    </div>
  )
}
