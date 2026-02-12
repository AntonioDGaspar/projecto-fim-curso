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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/feactures/dashboard/components/ui/select"
import { DataTable } from "@/feactures/dashboard/components/data-table"
import { Plus, GraduationCap } from "lucide-react"

interface Turma {
  id: string
  nome: string
  ano: number
  curso: string
  numAlunos: number
  sala: string
  diretor: string
  temHorario: boolean
}

const initialTurmas: Turma[] = [
  { id: "1", nome: "10A", ano: 10, curso: "Ciencias", numAlunos: 28, sala: "Sala 101", diretor: "Maria Silva", temHorario: true },
  { id: "2", nome: "10B", ano: 10, curso: "Humanidades", numAlunos: 25, sala: "Sala 102", diretor: "Joao Santos", temHorario: true },
  { id: "3", nome: "11A", ano: 11, curso: "Ciencias", numAlunos: 27, sala: "Sala 201", diretor: "Ana Costa", temHorario: true },
  { id: "4", nome: "11B", ano: 11, curso: "Economia", numAlunos: 24, sala: "Sala 202", diretor: "Pedro Oliveira", temHorario: false },
  { id: "5", nome: "12A", ano: 12, curso: "Ciencias", numAlunos: 26, sala: "Sala 301", diretor: "Sofia Ferreira", temHorario: true },
  { id: "6", nome: "12B", ano: 12, curso: "Artes", numAlunos: 22, sala: "Sala 302", diretor: "Carlos Rodrigues", temHorario: false },
  { id: "7", nome: "9A", ano: 9, curso: "Geral", numAlunos: 30, sala: "Sala 001", diretor: "Teresa Almeida", temHorario: true },
  { id: "8", nome: "9B", ano: 9, curso: "Geral", numAlunos: 29, sala: "Sala 002", diretor: "Ricardo Martins", temHorario: false },
]

export function TurmasContent() {
  const [turmas, setTurmas] = useState<Turma[]>(initialTurmas)
  const [isOpen, setIsOpen] = useState(false)
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    ano: "",
    curso: "",
    numAlunos: "",
    sala: "",
    diretor: "",
  })

  const columns = [
    { key: "nome" as const, header: "Turma" },
    {
      key: "ano" as const,
      header: "Ano",
      render: (turma: Turma) => `${turma.ano}o Ano`,
    },
    { key: "curso" as const, header: "Curso" },
    {
      key: "numAlunos" as const,
      header: "Alunos",
      render: (turma: Turma) => `${turma.numAlunos} alunos`,
    },
    { key: "sala" as const, header: "Sala Base" },
    { key: "diretor" as const, header: "Diretor de Turma" },
    {
      key: "temHorario",
      header: "Horario",
      render: (turma: Turma) => (
        <Badge
          className={
            turma.temHorario
              ? "bg-green-600 text-white"
              : "bg-accent text-accent-foreground"
          }
        >
          {turma.temHorario ? "Definido" : "Pendente"}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTurma) {
      setTurmas((prev) =>
        prev.map((t) =>
          t.id === editingTurma.id
            ? {
                ...t,
                nome: formData.nome,
                ano: parseInt(formData.ano) || 0,
                curso: formData.curso,
                numAlunos: parseInt(formData.numAlunos) || 0,
                sala: formData.sala,
                diretor: formData.diretor,
              }
            : t
        )
      )
    } else {
      const newTurma: Turma = {
        id: String(Date.now()),
        nome: formData.nome,
        ano: parseInt(formData.ano) || 0,
        curso: formData.curso,
        numAlunos: parseInt(formData.numAlunos) || 0,
        sala: formData.sala,
        diretor: formData.diretor,
        temHorario: false,
      }
      setTurmas((prev) => [...prev, newTurma])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ nome: "", ano: "", curso: "", numAlunos: "", sala: "", diretor: "" })
    setEditingTurma(null)
    setIsOpen(false)
  }

  const handleEdit = (turma: Turma) => {
    setEditingTurma(turma)
    setFormData({
      nome: turma.nome,
      ano: String(turma.ano),
      curso: turma.curso,
      numAlunos: String(turma.numAlunos),
      sala: turma.sala,
      diretor: turma.diretor,
    })
    setIsOpen(true)
  }

  const handleDelete = (turma: Turma) => {
    setTurmas((prev) => prev.filter((t) => t.id !== turma.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Turmas</h1>
          <p className="text-muted-foreground">
            Gerir turmas e suas configuracoes
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Nova Turma
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTurma ? "Editar Turma" : "Nova Turma"}
              </DialogTitle>
              <DialogDescription>
                {editingTurma
                  ? "Atualize os dados da turma"
                  : "Preencha os dados para criar uma nova turma"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome da Turma</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: 10A"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ano">Ano</Label>
                    <Select
                      value={formData.ano}
                      onValueChange={(value) => setFormData({ ...formData, ano: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {[7, 8, 9, 10, 11, 12].map((ano) => (
                          <SelectItem key={ano} value={String(ano)}>
                            {ano}o Ano
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="curso">Curso</Label>
                  <Select
                    value={formData.curso}
                    onValueChange={(value) => setFormData({ ...formData, curso: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Geral">Geral</SelectItem>
                      <SelectItem value="Ciencias">Ciencias</SelectItem>
                      <SelectItem value="Humanidades">Humanidades</SelectItem>
                      <SelectItem value="Economia">Economia</SelectItem>
                      <SelectItem value="Artes">Artes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="numAlunos">Numero de Alunos</Label>
                    <Input
                      id="numAlunos"
                      type="number"
                      value={formData.numAlunos}
                      onChange={(e) => setFormData({ ...formData, numAlunos: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sala">Sala Base</Label>
                    <Input
                      id="sala"
                      value={formData.sala}
                      onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
                      placeholder="Ex: Sala 101"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diretor">Diretor de Turma</Label>
                  <Input
                    id="diretor"
                    value={formData.diretor}
                    onChange={(e) => setFormData({ ...formData, diretor: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTurma ? "Guardar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{turmas.length}</p>
          <p className="text-sm text-muted-foreground">
            Turmas registadas ({turmas.filter((t) => !t.temHorario).length} sem horario)
          </p>
        </div>
      </div>

      <DataTable
        data={turmas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar turmas..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
