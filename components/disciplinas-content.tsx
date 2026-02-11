"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable } from "@/components/data-table"
import { Plus, BookOpen } from "lucide-react"

interface Disciplina {
  id: string
  nome: string
  codigo: string
  cargaSemanal: number
  tipo: "teorica" | "pratica" | "mista"
  departamento: string
  cor: string
}

const initialDisciplinas: Disciplina[] = [
  { id: "1", nome: "Matematica A", codigo: "MAT-A", cargaSemanal: 5, tipo: "teorica", departamento: "Ciencias Exatas", cor: "#ef4444" },
  { id: "2", nome: "Portugues", codigo: "PORT", cargaSemanal: 4, tipo: "teorica", departamento: "Linguas", cor: "#3b82f6" },
  { id: "3", nome: "Fisica e Quimica", codigo: "FQ", cargaSemanal: 4, tipo: "mista", departamento: "Ciencias Exatas", cor: "#22c55e" },
  { id: "4", nome: "Biologia e Geologia", codigo: "BG", cargaSemanal: 4, tipo: "mista", departamento: "Ciencias Naturais", cor: "#eab308" },
  { id: "5", nome: "Ingles", codigo: "ING", cargaSemanal: 3, tipo: "teorica", departamento: "Linguas", cor: "#a855f7" },
  { id: "6", nome: "Historia", codigo: "HIST", cargaSemanal: 3, tipo: "teorica", departamento: "Ciencias Sociais", cor: "#f97316" },
  { id: "7", nome: "Geografia", codigo: "GEO", cargaSemanal: 2, tipo: "teorica", departamento: "Ciencias Sociais", cor: "#06b6d4" },
  { id: "8", nome: "Educacao Fisica", codigo: "EF", cargaSemanal: 2, tipo: "pratica", departamento: "Expressoes", cor: "#ec4899" },
  { id: "9", nome: "Informatica", codigo: "INF", cargaSemanal: 2, tipo: "pratica", departamento: "Tecnologias", cor: "#6366f1" },
  { id: "10", nome: "Filosofia", codigo: "FIL", cargaSemanal: 2, tipo: "teorica", departamento: "Ciencias Sociais", cor: "#84cc16" },
]

export function DisciplinasContent() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(initialDisciplinas)
  const [isOpen, setIsOpen] = useState(false)
  const [editingDisciplina, setEditingDisciplina] = useState<Disciplina | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    cargaSemanal: "",
    tipo: "",
    departamento: "",
    cor: "#ef4444",
  })

  const columns = [
    {
      key: "nome",
      header: "Disciplina",
      render: (disciplina: Disciplina) => (
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: disciplina.cor }}
          />
          <span>{disciplina.nome}</span>
        </div>
      ),
    },
    { key: "codigo" as const, header: "Codigo" },
    {
      key: "cargaSemanal" as const,
      header: "Carga Semanal",
      render: (disciplina: Disciplina) => `${disciplina.cargaSemanal}h/semana`,
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (disciplina: Disciplina) => (
        <Badge
          variant="outline"
          className={
            disciplina.tipo === "teorica"
              ? "border-blue-500 text-blue-500"
              : disciplina.tipo === "pratica"
              ? "border-green-500 text-green-500"
              : "border-amber-500 text-amber-500"
          }
        >
          {disciplina.tipo.charAt(0).toUpperCase() + disciplina.tipo.slice(1)}
        </Badge>
      ),
    },
    { key: "departamento" as const, header: "Departamento" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingDisciplina) {
      setDisciplinas((prev) =>
        prev.map((d) =>
          d.id === editingDisciplina.id
            ? {
                ...d,
                nome: formData.nome,
                codigo: formData.codigo,
                cargaSemanal: parseInt(formData.cargaSemanal) || 0,
                tipo: formData.tipo as Disciplina["tipo"],
                departamento: formData.departamento,
                cor: formData.cor,
              }
            : d
        )
      )
    } else {
      const newDisciplina: Disciplina = {
        id: String(Date.now()),
        nome: formData.nome,
        codigo: formData.codigo,
        cargaSemanal: parseInt(formData.cargaSemanal) || 0,
        tipo: formData.tipo as Disciplina["tipo"],
        departamento: formData.departamento,
        cor: formData.cor,
      }
      setDisciplinas((prev) => [...prev, newDisciplina])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ nome: "", codigo: "", cargaSemanal: "", tipo: "", departamento: "", cor: "#ef4444" })
    setEditingDisciplina(null)
    setIsOpen(false)
  }

  const handleEdit = (disciplina: Disciplina) => {
    setEditingDisciplina(disciplina)
    setFormData({
      nome: disciplina.nome,
      codigo: disciplina.codigo,
      cargaSemanal: String(disciplina.cargaSemanal),
      tipo: disciplina.tipo,
      departamento: disciplina.departamento,
      cor: disciplina.cor,
    })
    setIsOpen(true)
  }

  const handleDelete = (disciplina: Disciplina) => {
    setDisciplinas((prev) => prev.filter((d) => d.id !== disciplina.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disciplinas</h1>
          <p className="text-muted-foreground">
            Gerir disciplinas e cargas horarias
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Nova Disciplina
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDisciplina ? "Editar Disciplina" : "Nova Disciplina"}
              </DialogTitle>
              <DialogDescription>
                {editingDisciplina
                  ? "Atualize os dados da disciplina"
                  : "Preencha os dados para criar uma nova disciplina"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="codigo">Codigo</Label>
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                      placeholder="Ex: MAT-A"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cargaSemanal">Carga Semanal (horas)</Label>
                    <Input
                      id="cargaSemanal"
                      type="number"
                      value={formData.cargaSemanal}
                      onChange={(e) => setFormData({ ...formData, cargaSemanal: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teorica">Teorica</SelectItem>
                        <SelectItem value="pratica">Pratica</SelectItem>
                        <SelectItem value="mista">Mista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="departamento">Departamento</Label>
                  <Select
                    value={formData.departamento}
                    onValueChange={(value) => setFormData({ ...formData, departamento: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ciencias Exatas">Ciencias Exatas</SelectItem>
                      <SelectItem value="Ciencias Naturais">Ciencias Naturais</SelectItem>
                      <SelectItem value="Ciencias Sociais">Ciencias Sociais</SelectItem>
                      <SelectItem value="Linguas">Linguas</SelectItem>
                      <SelectItem value="Expressoes">Expressoes</SelectItem>
                      <SelectItem value="Tecnologias">Tecnologias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cor">Cor de Identificacao</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="cor"
                      type="color"
                      value={formData.cor}
                      onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                      className="h-10 w-20 cursor-pointer p-1"
                    />
                    <span className="text-sm text-muted-foreground">{formData.cor}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingDisciplina ? "Guardar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{disciplinas.length}</p>
          <p className="text-sm text-muted-foreground">
            Disciplinas registadas
          </p>
        </div>
      </div>

      <DataTable
        data={disciplinas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar disciplinas..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
