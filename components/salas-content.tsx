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
import { Plus, DoorOpen } from "lucide-react"

interface Sala {
  id: string
  nome: string
  bloco: string
  capacidade: number
  tipo: "normal" | "laboratorio" | "informatica" | "ginasio" | "auditorio"
  equipamentos: string[]
  status: "disponivel" | "ocupada" | "manutencao"
}

const initialSalas: Sala[] = [
  { id: "1", nome: "Sala 101", bloco: "A", capacidade: 30, tipo: "normal", equipamentos: ["Projetor", "Quadro interativo"], status: "disponivel" },
  { id: "2", nome: "Sala 102", bloco: "A", capacidade: 30, tipo: "normal", equipamentos: ["Projetor"], status: "disponivel" },
  { id: "3", nome: "Sala 201", bloco: "A", capacidade: 28, tipo: "normal", equipamentos: ["Projetor", "Ar condicionado"], status: "ocupada" },
  { id: "4", nome: "Sala 202", bloco: "A", capacidade: 28, tipo: "normal", equipamentos: ["Projetor"], status: "disponivel" },
  { id: "5", nome: "Lab. Fisica", bloco: "B", capacidade: 24, tipo: "laboratorio", equipamentos: ["Bancadas", "Equipamento cientifico"], status: "disponivel" },
  { id: "6", nome: "Lab. Quimica", bloco: "B", capacidade: 24, tipo: "laboratorio", equipamentos: ["Bancadas", "Exaustor", "Equipamento cientifico"], status: "manutencao" },
  { id: "7", nome: "Lab. Informatica 1", bloco: "C", capacidade: 25, tipo: "informatica", equipamentos: ["Computadores", "Projetor"], status: "disponivel" },
  { id: "8", nome: "Lab. Informatica 2", bloco: "C", capacidade: 25, tipo: "informatica", equipamentos: ["Computadores", "Projetor"], status: "disponivel" },
  { id: "9", nome: "Ginasio", bloco: "D", capacidade: 60, tipo: "ginasio", equipamentos: ["Equipamento desportivo"], status: "disponivel" },
  { id: "10", nome: "Auditorio", bloco: "E", capacidade: 150, tipo: "auditorio", equipamentos: ["Sistema de som", "Projetor", "Palco"], status: "manutencao" },
]

const tipoColors = {
  normal: "bg-blue-600 text-white",
  laboratorio: "bg-green-600 text-white",
  informatica: "bg-indigo-600 text-white",
  ginasio: "bg-orange-600 text-white",
  auditorio: "bg-purple-600 text-white",
}

const statusColors = {
  disponivel: "bg-green-600 text-white",
  ocupada: "bg-accent text-accent-foreground",
  manutencao: "bg-destructive text-destructive-foreground",
}

export function SalasContent() {
  const [salas, setSalas] = useState<Sala[]>(initialSalas)
  const [isOpen, setIsOpen] = useState(false)
  const [editingSala, setEditingSala] = useState<Sala | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    bloco: "",
    capacidade: "",
    tipo: "",
    equipamentos: "",
    status: "disponivel",
  })

  const columns = [
    { key: "nome" as const, header: "Sala" },
    { key: "bloco" as const, header: "Bloco" },
    {
      key: "capacidade" as const,
      header: "Capacidade",
      render: (sala: Sala) => `${sala.capacidade} lugares`,
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (sala: Sala) => (
        <Badge className={tipoColors[sala.tipo]}>
          {sala.tipo.charAt(0).toUpperCase() + sala.tipo.slice(1)}
        </Badge>
      ),
    },
    {
      key: "equipamentos",
      header: "Equipamentos",
      render: (sala: Sala) => (
        <div className="flex flex-wrap gap-1">
          {sala.equipamentos.slice(0, 2).map((e) => (
            <Badge key={e} variant="outline" className="text-xs">
              {e}
            </Badge>
          ))}
          {sala.equipamentos.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{sala.equipamentos.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (sala: Sala) => (
        <Badge className={statusColors[sala.status]}>
          {sala.status.charAt(0).toUpperCase() + sala.status.slice(1)}
        </Badge>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSala) {
      setSalas((prev) =>
        prev.map((s) =>
          s.id === editingSala.id
            ? {
                ...s,
                nome: formData.nome,
                bloco: formData.bloco,
                capacidade: parseInt(formData.capacidade) || 0,
                tipo: formData.tipo as Sala["tipo"],
                equipamentos: formData.equipamentos.split(",").map((e) => e.trim()),
                status: formData.status as Sala["status"],
              }
            : s
        )
      )
    } else {
      const newSala: Sala = {
        id: String(Date.now()),
        nome: formData.nome,
        bloco: formData.bloco,
        capacidade: parseInt(formData.capacidade) || 0,
        tipo: formData.tipo as Sala["tipo"],
        equipamentos: formData.equipamentos.split(",").map((e) => e.trim()),
        status: formData.status as Sala["status"],
      }
      setSalas((prev) => [...prev, newSala])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ nome: "", bloco: "", capacidade: "", tipo: "", equipamentos: "", status: "disponivel" })
    setEditingSala(null)
    setIsOpen(false)
  }

  const handleEdit = (sala: Sala) => {
    setEditingSala(sala)
    setFormData({
      nome: sala.nome,
      bloco: sala.bloco,
      capacidade: String(sala.capacidade),
      tipo: sala.tipo,
      equipamentos: sala.equipamentos.join(", "),
      status: sala.status,
    })
    setIsOpen(true)
  }

  const handleDelete = (sala: Sala) => {
    setSalas((prev) => prev.filter((s) => s.id !== sala.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salas</h1>
          <p className="text-muted-foreground">
            Gerir salas e espacos disponiveis
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Nova Sala
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSala ? "Editar Sala" : "Nova Sala"}
              </DialogTitle>
              <DialogDescription>
                {editingSala
                  ? "Atualize os dados da sala"
                  : "Preencha os dados para adicionar uma nova sala"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome da Sala</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Sala 101"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bloco">Bloco</Label>
                    <Select
                      value={formData.bloco}
                      onValueChange={(value) => setFormData({ ...formData, bloco: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A", "B", "C", "D", "E"].map((bloco) => (
                          <SelectItem key={bloco} value={bloco}>
                            Bloco {bloco}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="capacidade">Capacidade</Label>
                    <Input
                      id="capacidade"
                      type="number"
                      value={formData.capacidade}
                      onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
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
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="laboratorio">Laboratorio</SelectItem>
                        <SelectItem value="informatica">Informatica</SelectItem>
                        <SelectItem value="ginasio">Ginasio</SelectItem>
                        <SelectItem value="auditorio">Auditorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipamentos">Equipamentos (separados por virgula)</Label>
                  <Input
                    id="equipamentos"
                    value={formData.equipamentos}
                    onChange={(e) => setFormData({ ...formData, equipamentos: e.target.value })}
                    placeholder="Projetor, Quadro interativo"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponivel">Disponivel</SelectItem>
                      <SelectItem value="ocupada">Ocupada</SelectItem>
                      <SelectItem value="manutencao">Manutencao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingSala ? "Guardar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <DoorOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold">{salas.length}</p>
          <p className="text-sm text-muted-foreground">
            Salas registadas ({salas.filter((s) => s.status === "disponivel").length} disponiveis)
          </p>
        </div>
      </div>

      <DataTable
        data={salas}
        columns={columns}
        searchKey="nome"
        searchPlaceholder="Pesquisar salas..."
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
