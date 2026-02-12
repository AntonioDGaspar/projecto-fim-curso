"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
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
import { DataTable } from "@/feactures/dashboard/components/data-table"
import { Plus, Users } from "lucide-react"

interface Professor {
  id: string
  nome: string
  email: string
  telefone: string
  disciplinas: string[]
  cargaHoraria: number
  status: "ativo" | "inativo"
}

const initialProfessores: Professor[] = [
  { id: "1", nome: "Maria Silva", email: "maria.silva@escola.pt", telefone: "912345678", disciplinas: ["Matematica", "Fisica"], cargaHoraria: 22, status: "ativo" },
  { id: "2", nome: "Joao Santos", email: "joao.santos@escola.pt", telefone: "923456789", disciplinas: ["Portugues", "Historia"], cargaHoraria: 20, status: "ativo" },
  { id: "3", nome: "Ana Costa", email: "ana.costa@escola.pt", telefone: "934567890", disciplinas: ["Fisica", "Quimica"], cargaHoraria: 18, status: "ativo" },
  { id: "4", nome: "Pedro Oliveira", email: "pedro.oliveira@escola.pt", telefone: "945678901", disciplinas: ["Historia", "Geografia"], cargaHoraria: 22, status: "ativo" },
  { id: "5", nome: "Sofia Ferreira", email: "sofia.ferreira@escola.pt", telefone: "956789012", disciplinas: ["Ingles"], cargaHoraria: 16, status: "inativo" },
  { id: "6", nome: "Carlos Rodrigues", email: "carlos.rodrigues@escola.pt", telefone: "967890123", disciplinas: ["Educacao Fisica"], cargaHoraria: 24, status: "ativo" },
  { id: "7", nome: "Teresa Almeida", email: "teresa.almeida@escola.pt", telefone: "978901234", disciplinas: ["Biologia", "Ciencias"], cargaHoraria: 20, status: "ativo" },
  { id: "8", nome: "Ricardo Martins", email: "ricardo.martins@escola.pt", telefone: "989012345", disciplinas: ["Informatica"], cargaHoraria: 18, status: "ativo" },
]

export function ProfessoresContent() {
  const [professores, setProfessores] = useState<Professor[]>(initialProfessores)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    disciplinas: "",
    cargaHoraria: "",
  })

  const columns = [
    { key: "nome" as const, header: "Nome" },
    { key: "email" as const, header: "Email" },
    { key: "telefone" as const, header: "Telefone" },
    {
      key: "disciplinas",
      header: "Disciplinas",
      render: (professor: Professor) => (
        <div className="flex flex-wrap gap-1">
          {professor.disciplinas.map((d) => (
            <Badge key={d} variant="outline" className="text-xs">
              {d}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "cargaHoraria" as const,
      header: "Carga Horaria",
      render: (professor: Professor) => `${professor.cargaHoraria}h/semana`,
    },
    {
      key: "status",
      header: "Status",
      render: (professor: Professor) => (
        <Badge
          className={
            professor.status === "ativo"
              ? "bg-green-600 text-white"
              : "bg-muted text-muted-foreground"
          }
        >
          {professor.status.charAt(0).toUpperCase() + professor.status.slice(1)}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProfessor) {
      setProfessores((prev) =>
        prev.map((p) =>
          p.id === editingProfessor.id
            ? {
                ...p,
                nome: formData.nome,
                email: formData.email,
                telefone: formData.telefone,
                disciplinas: formData.disciplinas.split(",").map((d) => d.trim()),
                cargaHoraria: parseInt(formData.cargaHoraria) || 0,
              }
            : p
        )
      )
    } else {
      const newProfessor: Professor = {
        id: String(Date.now()),
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        disciplinas: formData.disciplinas.split(",").map((d) => d.trim()),
        cargaHoraria: parseInt(formData.cargaHoraria) || 0,
        status: "ativo",
      }
      setProfessores((prev) => [...prev, newProfessor])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ nome: "", email: "", telefone: "", disciplinas: "", cargaHoraria: "" })
    setEditingProfessor(null)
    setIsOpen(false)
  }

  const handleEdit = (professor: Professor) => {
    setEditingProfessor(professor)
    setFormData({
      nome: professor.nome,
      email: professor.email,
      telefone: professor.telefone,
      disciplinas: professor.disciplinas.join(", "),
      cargaHoraria: String(professor.cargaHoraria),
    })
    setIsOpen(true)
  }

  const handleDelete = (professor: Professor) => {
    setProfessores((prev) => prev.filter((p) => p.id !== professor.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professores</h1>
          <p className="text-muted-foreground">
            Gerir professores e suas atribuicoes
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Adicionar Professor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProfessor ? "Editar Professor" : "Novo Professor"}
              </DialogTitle>
              <DialogDescription>
                {editingProfessor
                  ? "Atualize os dados do professor"
                  : "Preencha os dados para adicionar um novo professor"}
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
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="disciplinas">Disciplinas (separadas por virgula)</Label>
                  <Input
                    id="disciplinas"
                    value={formData.disciplinas}
                    onChange={(e) => setFormData({ ...formData, disciplinas: e.target.value })}
                    placeholder="Matematica, Fisica"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cargaHoraria">Carga Horaria (horas/semana)</Label>
                  <Input
                    id="cargaHoraria"
                    type="number"
                    value={formData.cargaHoraria}
                    onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProfessor ? "Guardar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{professores.length}</p>
          <p className="text-sm text-muted-foreground">
            Professores registados ({professores.filter((p) => p.status === "ativo").length} ativos)
          </p>
        </div>
      </div>

      <DataTable
        data={professores}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar professores..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
