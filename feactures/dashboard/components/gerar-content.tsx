"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
import { Checkbox } from "@/feactures/dashboard/components/ui/checkbox"
import { Label } from "@/feactures/dashboard/components/ui/label"
import { Progress } from "@/feactures/dashboard/components/ui/progress"
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Play,
  RefreshCcw,
  XCircle,
  Clock,
  Users,
  DoorOpen,
  AlertTriangle,
} from "lucide-react"

interface ConflictItem {
  id: string
  tipo: "professor" | "sala" | "turma"
  descricao: string
  severidade: "alta" | "media" | "baixa"
}

interface GenerationResult {
  status: "idle" | "generating" | "completed" | "error"
  progress: number
  turmasProcessadas: number
  totalTurmas: number
  conflitos: ConflictItem[]
  horariosGerados: number
}

const turmasDisponiveis = [
  { id: "10A", nome: "10A - Ciencias", checked: true },
  { id: "10B", nome: "10B - Humanidades", checked: true },
  { id: "11A", nome: "11A - Ciencias", checked: true },
  { id: "11B", nome: "11B - Economia", checked: false },
  { id: "12A", nome: "12A - Ciencias", checked: true },
  { id: "12B", nome: "12B - Artes", checked: false },
  { id: "9A", nome: "9A - Geral", checked: true },
  { id: "9B", nome: "9B - Geral", checked: false },
]

export function GerarContent() {
  const [selectedTurmas, setSelectedTurmas] = useState<string[]>(
    turmasDisponiveis.filter((t) => t.checked).map((t) => t.id)
  )
  const [result, setResult] = useState<GenerationResult>({
    status: "idle",
    progress: 0,
    turmasProcessadas: 0,
    totalTurmas: 0,
    conflitos: [],
    horariosGerados: 0,
  })

  const toggleTurma = (id: string) => {
    setSelectedTurmas((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedTurmas(turmasDisponiveis.map((t) => t.id))
  }

  const deselectAll = () => {
    setSelectedTurmas([])
  }

  const simulateGeneration = () => {
    setResult({
      status: "generating",
      progress: 0,
      turmasProcessadas: 0,
      totalTurmas: selectedTurmas.length,
      conflitos: [],
      horariosGerados: 0,
    })

    let progress = 0
    let turmasProcessadas = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        turmasProcessadas = selectedTurmas.length
        clearInterval(interval)
        
        const mockConflitos: ConflictItem[] = [
          { id: "1", tipo: "professor", descricao: "Maria Silva tem sobreposicao de horario na Terca, 10:05", severidade: "alta" },
          { id: "2", tipo: "sala", descricao: "Lab. Fisica com dupla ocupacao na Quarta, 14:00", severidade: "alta" },
          { id: "3", tipo: "turma", descricao: "11A sem aula de Ed. Fisica por falta de disponibilidade", severidade: "media" },
          { id: "4", tipo: "professor", descricao: "Joao Santos excede carga horaria maxima", severidade: "baixa" },
        ]
        
        setResult({
          status: "completed",
          progress: 100,
          turmasProcessadas: selectedTurmas.length,
          totalTurmas: selectedTurmas.length,
          conflitos: mockConflitos,
          horariosGerados: selectedTurmas.length,
        })
      } else {
        turmasProcessadas = Math.floor((progress / 100) * selectedTurmas.length)
        setResult((prev) => ({
          ...prev,
          progress,
          turmasProcessadas,
        }))
      }
    }, 200)
  }

  const resetGeneration = () => {
    setResult({
      status: "idle",
      progress: 0,
      turmasProcessadas: 0,
      totalTurmas: 0,
      conflitos: [],
      horariosGerados: 0,
    })
  }

  const severidadeColors = {
    alta: "bg-destructive text-destructive-foreground",
    media: "bg-accent text-accent-foreground",
    baixa: "bg-muted text-muted-foreground",
  }

  const tipoIcons = {
    professor: Users,
    sala: DoorOpen,
    turma: Clock,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerar Horarios</h1>
          <p className="text-muted-foreground">
            Geracao automatica de horarios com detecao de conflitos
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Turmas</CardTitle>
              <CardDescription>
                Escolha as turmas para as quais deseja gerar horarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={selectAll}>
                  Selecionar Todas
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAll}>
                  Desmarcar Todas
                </Button>
                <Badge variant="outline">
                  {selectedTurmas.length} de {turmasDisponiveis.length} selecionadas
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {turmasDisponiveis.map((turma) => (
                  <div
                    key={turma.id}
                    className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                  >
                    <Checkbox
                      id={turma.id}
                      checked={selectedTurmas.includes(turma.id)}
                      onCheckedChange={() => toggleTurma(turma.id)}
                    />
                    <Label htmlFor={turma.id} className="cursor-pointer flex-1">
                      {turma.nome}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {result.status !== "idle" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.status === "generating" && (
                    <>
                      <RefreshCcw className="h-5 w-5 animate-spin text-primary" />
                      A Gerar Horarios...
                    </>
                  )}
                  {result.status === "completed" && (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Geracao Concluida
                    </>
                  )}
                  {result.status === "error" && (
                    <>
                      <XCircle className="h-5 w-5 text-destructive" />
                      Erro na Geracao
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progresso</span>
                    <span>{Math.round(result.progress)}%</span>
                  </div>
                  <Progress value={result.progress} />
                  <p className="text-sm text-muted-foreground">
                    {result.turmasProcessadas} de {result.totalTurmas} turmas processadas
                  </p>
                </div>

                {result.status === "completed" && result.conflitos.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      <h4 className="font-medium">Conflitos Detectados ({result.conflitos.length})</h4>
                    </div>
                    <div className="space-y-2">
                      {result.conflitos.map((conflito) => {
                        const Icon = tipoIcons[conflito.tipo]
                        return (
                          <div
                            key={conflito.id}
                            className="flex items-start gap-3 rounded-lg border border-border p-3"
                          >
                            <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm">{conflito.descricao}</p>
                            </div>
                            <Badge className={severidadeColors[conflito.severidade]}>
                              {conflito.severidade.charAt(0).toUpperCase() + conflito.severidade.slice(1)}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opcoes de Geracao</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox id="otimizar" defaultChecked />
                <Label htmlFor="otimizar">Otimizar distribuicao</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="evitar-furos" defaultChecked />
                <Label htmlFor="evitar-furos">Evitar furos no horario</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="preferencias" defaultChecked />
                <Label htmlFor="preferencias">Respeitar preferencias dos professores</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="balancear" />
                <Label htmlFor="balancear">Balancear carga semanal</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acoes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.status === "idle" && (
                <Button
                  className="w-full gap-2"
                  onClick={simulateGeneration}
                  disabled={selectedTurmas.length === 0}
                >
                  <Sparkles className="h-4 w-4" />
                  Gerar Horarios
                </Button>
              )}
              {result.status === "generating" && (
                <Button className="w-full gap-2" disabled>
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  A Processar...
                </Button>
              )}
              {result.status === "completed" && (
                <>
                  <Button className="w-full gap-2" variant="default">
                    <CheckCircle2 className="h-4 w-4" />
                    Aceitar Horarios
                  </Button>
                  <Button className="w-full gap-2 bg-transparent" variant="outline" onClick={simulateGeneration}>
                    <RefreshCcw className="h-4 w-4" />
                    Regenerar
                  </Button>
                  <Button className="w-full gap-2 bg-transparent" variant="outline" onClick={resetGeneration}>
                    Cancelar
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {result.status === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Horarios gerados</span>
                  <span className="font-medium">{result.horariosGerados}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conflitos</span>
                  <Badge variant={result.conflitos.length > 0 ? "destructive" : "outline"}>
                    {result.conflitos.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-600 text-white">Pronto para revisao</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
