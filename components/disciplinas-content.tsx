"use client"

import React, { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
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
import { DataTable } from "@/components/data-table"
import { Plus, BookOpen } from "lucide-react"
import { criarDisciplina, atualizarDisciplina, apagarDisciplina } from "@/app/disciplinas/disciplinas-action"
import { useRouter } from "next/navigation"

interface DisciplinaData {
  idDisciplina: number
  nome: string
}

interface DisciplinaRow extends DisciplinaData {
  id: number
}

interface DisciplinasContentProps {
  disciplinas: DisciplinaData[]
}

export function DisciplinasContent({ disciplinas }: DisciplinasContentProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [editingDisciplina, setEditingDisciplina] = useState<DisciplinaData | null>(null)
  const [formData, setFormData] = useState({ nome: "" })
  const [error, setError] = useState<string | null>(null)

  const rows: DisciplinaRow[] = disciplinas.map((d) => ({
    ...d,
    id: d.idDisciplina,
  }))

  const columns = [
    { key: "idDisciplina" as const, header: "ID" },
    { key: "nome" as const, header: "Nome" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const fd = new FormData()
    fd.append("nome", formData.nome)

    startTransition(async () => {
      let result
      if (editingDisciplina) {
        result = await atualizarDisciplina(editingDisciplina.idDisciplina, fd)
      } else {
        result = await criarDisciplina(fd)
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
    setFormData({ nome: "" })
    setEditingDisciplina(null)
    setError(null)
    setIsOpen(false)
  }

  const handleEdit = (disciplina: DisciplinaRow) => {
    setEditingDisciplina(disciplina)
    setFormData({ nome: disciplina.nome })
    setError(null)
    setIsOpen(true)
  }

  const handleDelete = (disciplina: DisciplinaRow) => {
    startTransition(async () => {
      const result = await apagarDisciplina(disciplina.idDisciplina)
      if (result.success) {
        router.refresh()
      } else {
        setError(result.message || "Erro ao apagar disciplina")
      }
    })
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
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
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
                    : editingDisciplina
                      ? "Guardar"
                      : "Criar"}
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
        data={rows}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar disciplinas..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
