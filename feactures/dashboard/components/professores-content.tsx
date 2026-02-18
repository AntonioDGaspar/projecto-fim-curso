"use client"

import React, { useState, useTransition } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table"
import { Plus, Users } from "lucide-react"
import { criarProfessor, atualizarProfessor, apagarProfessor } from "@/app/professores/professores-action"
import { useRouter } from "next/navigation"

interface Disciplina {
  idDisciplina: number
  nome: string
}

interface ProfessorData {
  id_professor: number
  Utilizador: {
    id: number
    nome: string
    email: string | null
    tipo: string
    workos_id: string | null
  }
  ProfDisciplinas: {
    Disciplina: Disciplina
  }[]
}

interface ProfessorRow {
  id: number
  id_professor: number
  nome: string
  email: string
  disciplinas: string[]
  disciplinaIds: number[]
}

function mapProfessores(professores: ProfessorData[]): ProfessorRow[] {
  return professores.map((p) => ({
    id: p.Utilizador.id,
    id_professor: p.id_professor,
    nome: p.Utilizador.nome,
    email: p.Utilizador.email || "",
    disciplinas: p.ProfDisciplinas.map((pd) => pd.Disciplina.nome),
    disciplinaIds: p.ProfDisciplinas.map((pd) => pd.Disciplina.idDisciplina),
  }))
}

interface ProfessoresContentProps {
  professores: ProfessorData[]
  disciplinas: Disciplina[]
}

export function ProfessoresContent({ professores, disciplinas }: ProfessoresContentProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState<ProfessorRow | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    disciplinaIds: [] as number[],
  })
  const [error, setError] = useState<string | null>(null)

  const rows = mapProfessores(professores)

  const columns = [
    { key: "nome" as const, header: "Nome" },
    { key: "email" as const, header: "Email" },
    {
      key: "disciplinas",
      header: "Disciplinas",
      render: (professor: ProfessorRow) => (
        <div className="flex flex-wrap gap-1">
          {professor.disciplinas.map((d) => (
            <Badge key={d} variant="outline" className="text-xs">
              {d}
            </Badge>
          ))}
        </div>
      ),
    },
  ]

  const toggleDisciplina = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      disciplinaIds: prev.disciplinaIds.includes(id)
        ? prev.disciplinaIds.filter((d) => d !== id)
        : [...prev.disciplinaIds, id],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const fd = new FormData()
    fd.append("nome", formData.nome)
    fd.append("email", formData.email)
    formData.disciplinaIds.forEach((id) => fd.append("disciplinaIds", String(id)))

    startTransition(async () => {
      let result
      if (editingProfessor) {
        result = await atualizarProfessor(editingProfessor.id, fd)
      } else {
        result = await criarProfessor(fd)
      }

      if (result.success) {
        resetForm()
        router.refresh()
      } else {
        setError(result.message || "Erro inesperado")
      }
    })
  }

  const resetForm = () => {
    setFormData({ nome: "", email: "", disciplinaIds: [] })
    setEditingProfessor(null)
    setError(null)
    setIsOpen(false)
  }

  const handleEdit = (professor: ProfessorRow) => {
    setEditingProfessor(professor)
    setFormData({
      nome: professor.nome,
      email: professor.email,
      disciplinaIds: professor.disciplinaIds,
    })
    setError(null)
    setIsOpen(true)
  }

  const handleDelete = (professor: ProfessorRow) => {
    startTransition(async () => {
      const result = await apagarProfessor(professor.id)
      if (result.success) {
        router.refresh()
      } else {
        setError(result.message || "Erro ao apagar professor")
      }
    })
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
                  <Label>Disciplinas</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded-md border p-3">
                    {disciplinas.map((d) => (
                      <div key={d.idDisciplina} className="flex items-center gap-2">
                        <Checkbox
                          id={`disc-${d.idDisciplina}`}
                          checked={formData.disciplinaIds.includes(d.idDisciplina)}
                          onCheckedChange={() => toggleDisciplina(d.idDisciplina)}
                        />
                        <Label
                          htmlFor={`disc-${d.idDisciplina}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {d.nome}
                        </Label>
                      </div>
                    ))}
                    {disciplinas.length === 0 && (
                      <p className="text-sm text-muted-foreground col-span-2">
                        Nenhuma disciplina registada.
                      </p>
                    )}
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? "A guardar..."
                    : editingProfessor
                    ? "Guardar"
                    : "Adicionar"}
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
          <p className="text-2xl font-bold">{rows.length}</p>
          <p className="text-sm text-muted-foreground">
            Professores registados
          </p>
        </div>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar professores..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
