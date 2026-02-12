"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/feactures/dashboard/components/ui/dialog"
import { Input } from "@/feactures/dashboard/components/ui/input"
import { Label } from "@/feactures/dashboard/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/feactures/dashboard/components/ui/select"
import { Plus, Clock, Pencil, Trash2 } from "lucide-react"

interface Tempo {
  id: string
  nome: string
  inicio: string
  fim: string
  duracao: number
  tipo: "aula" | "intervalo" | "almoco"
}

const initialTempos: Tempo[] = [
  { id: "1", nome: "1o Tempo", inicio: "08:00", fim: "08:50", duracao: 50, tipo: "aula" },
  { id: "2", nome: "2o Tempo", inicio: "08:55", fim: "09:45", duracao: 50, tipo: "aula" },
  { id: "3", nome: "Intervalo Manha", inicio: "09:45", fim: "10:05", duracao: 20, tipo: "intervalo" },
  { id: "4", nome: "3o Tempo", inicio: "10:05", fim: "10:55", duracao: 50, tipo: "aula" },
  { id: "5", nome: "4o Tempo", inicio: "11:00", fim: "11:50", duracao: 50, tipo: "aula" },
  { id: "6", nome: "5o Tempo", inicio: "11:55", fim: "12:45", duracao: 50, tipo: "aula" },
  { id: "7", nome: "Almoco", inicio: "12:45", fim: "14:00", duracao: 75, tipo: "almoco" },
  { id: "8", nome: "6o Tempo", inicio: "14:00", fim: "14:50", duracao: 50, tipo: "aula" },
  { id: "9", nome: "7o Tempo", inicio: "14:55", fim: "15:45", duracao: 50, tipo: "aula" },
  { id: "10", nome: "Intervalo Tarde", inicio: "15:45", fim: "16:00", duracao: 15, tipo: "intervalo" },
  { id: "11", nome: "8o Tempo", inicio: "16:00", fim: "16:50", duracao: 50, tipo: "aula" },
  { id: "12", nome: "9o Tempo", inicio: "16:55", fim: "17:45", duracao: 50, tipo: "aula" },
]

const tipoColors = {
  aula: "bg-primary text-primary-foreground",
  intervalo: "bg-accent text-accent-foreground",
  almoco: "bg-secondary text-secondary-foreground",
}

export function TemposContent() {
  const [tempos, setTempos] = useState<Tempo[]>(initialTempos)
  const [isOpen, setIsOpen] = useState(false)
  const [editingTempo, setEditingTempo] = useState<Tempo | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    inicio: "",
    fim: "",
    tipo: "aula",
  })

  const calculateDuration = (inicio: string, fim: string) => {
    const [h1, m1] = inicio.split(":").map(Number)
    const [h2, m2] = fim.split(":").map(Number)
    return (h2 * 60 + m2) - (h1 * 60 + m1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const duracao = calculateDuration(formData.inicio, formData.fim)
    
    if (editingTempo) {
      setTempos((prev) =>
        prev.map((t) =>
          t.id === editingTempo.id
            ? {
                ...t,
                nome: formData.nome,
                inicio: formData.inicio,
                fim: formData.fim,
                duracao,
                tipo: formData.tipo as Tempo["tipo"],
              }
            : t
        )
      )
    } else {
      const newTempo: Tempo = {
        id: String(Date.now()),
        nome: formData.nome,
        inicio: formData.inicio,
        fim: formData.fim,
        duracao,
        tipo: formData.tipo as Tempo["tipo"],
      }
      setTempos((prev) => [...prev, newTempo].sort((a, b) => a.inicio.localeCompare(b.inicio)))
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ nome: "", inicio: "", fim: "", tipo: "aula" })
    setEditingTempo(null)
    setIsOpen(false)
  }

  const handleEdit = (tempo: Tempo) => {
    setEditingTempo(tempo)
    setFormData({
      nome: tempo.nome,
      inicio: tempo.inicio,
      fim: tempo.fim,
      tipo: tempo.tipo,
    })
    setIsOpen(true)
  }

  const handleDelete = (tempo: Tempo) => {
    setTempos((prev) => prev.filter((t) => t.id !== tempo.id))
  }

  const aulasCount = tempos.filter((t) => t.tipo === "aula").length
  const totalAulasMinutos = tempos.filter((t) => t.tipo === "aula").reduce((acc, t) => acc + t.duracao, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tempos Letivos</h1>
          <p className="text-muted-foreground">
            Configurar a estrutura de tempos do dia escolar
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Novo Tempo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTempo ? "Editar Tempo" : "Novo Tempo"}
              </DialogTitle>
              <DialogDescription>
                {editingTempo
                  ? "Atualize os dados do tempo letivo"
                  : "Configure um novo periodo de tempo"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: 1o Tempo"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="inicio">Inicio</Label>
                    <Input
                      id="inicio"
                      type="time"
                      value={formData.inicio}
                      onChange={(e) => setFormData({ ...formData, inicio: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fim">Fim</Label>
                    <Input
                      id="fim"
                      type="time"
                      value={formData.fim}
                      onChange={(e) => setFormData({ ...formData, fim: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aula">Aula</SelectItem>
                      <SelectItem value="intervalo">Intervalo</SelectItem>
                      <SelectItem value="almoco">Almoco</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTempo ? "Guardar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Tempos
            </CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tempos.length}</div>
            <p className="text-xs text-muted-foreground">periodos configurados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tempos de Aula
            </CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{aulasCount}</div>
            <p className="text-xs text-muted-foreground">aulas por dia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tempo Total de Aulas
            </CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Math.floor(totalAulasMinutos / 60)}h {totalAulasMinutos % 60}m</div>
            <p className="text-xs text-muted-foreground">de aulas por dia</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estrutura do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tempos.map((tempo) => (
              <div
                key={tempo.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-24 flex-col items-center justify-center rounded-lg bg-muted">
                    <span className="text-sm font-medium">{tempo.inicio}</span>
                    <span className="text-xs text-muted-foreground">{tempo.fim}</span>
                  </div>
                  <div>
                    <p className="font-medium">{tempo.nome}</p>
                    <p className="text-sm text-muted-foreground">{tempo.duracao} minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={tipoColors[tempo.tipo]}>
                    {tempo.tipo.charAt(0).toUpperCase() + tempo.tipo.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(tempo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tempo)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
