"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/feactures/dashboard/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/feactures/dashboard/components/ui/tabs"
import { Calendar, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react"

const diasSemana = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta"]
const tempos = [
  { id: "1", inicio: "08:00", fim: "08:50" },
  { id: "2", inicio: "08:55", fim: "09:45" },
  { id: "3", inicio: "10:05", fim: "10:55" },
  { id: "4", inicio: "11:00", fim: "11:50" },
  { id: "5", inicio: "11:55", fim: "12:45" },
  { id: "6", inicio: "14:00", fim: "14:50" },
  { id: "7", inicio: "14:55", fim: "15:45" },
  { id: "8", inicio: "16:00", fim: "16:50" },
  { id: "9", inicio: "16:55", fim: "17:45" },
]

const turmas = ["10A", "10B", "11A", "11B", "12A", "12B", "9A", "9B"]
const professores = ["Maria Silva", "Joao Santos", "Ana Costa", "Pedro Oliveira", "Sofia Ferreira", "Carlos Rodrigues"]

interface Aula {
  disciplina: string
  professor: string
  sala: string
  cor: string
}

type HorarioData = {
  [turma: string]: {
    [dia: string]: {
      [tempo: string]: Aula | null
    }
  }
}

const generateMockHorario = (): HorarioData => {
  const disciplinas = [
    { nome: "Matematica", cor: "#ef4444" },
    { nome: "Portugues", cor: "#3b82f6" },
    { nome: "Fisica", cor: "#22c55e" },
    { nome: "Ingles", cor: "#a855f7" },
    { nome: "Historia", cor: "#f97316" },
    { nome: "Ed. Fisica", cor: "#ec4899" },
    { nome: "Biologia", cor: "#eab308" },
  ]
  
  const salas = ["Sala 101", "Sala 102", "Sala 201", "Lab. Fisica", "Lab. Info", "Ginasio"]
  
  const horario: HorarioData = {}
  
  turmas.forEach((turma) => {
    horario[turma] = {}
    diasSemana.forEach((dia) => {
      horario[turma][dia] = {}
      tempos.forEach((tempo) => {
        if (Math.random() > 0.15) {
          const disciplina = disciplinas[Math.floor(Math.random() * disciplinas.length)]
          horario[turma][dia][tempo.id] = {
            disciplina: disciplina.nome,
            professor: professores[Math.floor(Math.random() * professores.length)],
            sala: salas[Math.floor(Math.random() * salas.length)],
            cor: disciplina.cor,
          }
        } else {
          horario[turma][dia][tempo.id] = null
        }
      })
    })
  })
  
  return horario
}

const mockHorario = generateMockHorario()

export function HorariosContent() {
  const [selectedTurma, setSelectedTurma] = useState("10A")
  const [selectedProfessor, setSelectedProfessor] = useState("")
  const [viewType, setViewType] = useState("turma")

  const turmaIndex = turmas.indexOf(selectedTurma)

  const navigateTurma = (direction: number) => {
    const newIndex = turmaIndex + direction
    if (newIndex >= 0 && newIndex < turmas.length) {
      setSelectedTurma(turmas[newIndex])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Horarios</h1>
          <p className="text-muted-foreground">
            Visualizar e gerir horarios de turmas e professores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs value={viewType} onValueChange={setViewType}>
        <TabsList>
          <TabsTrigger value="turma">Por Turma</TabsTrigger>
          <TabsTrigger value="professor">Por Professor</TabsTrigger>
        </TabsList>

        <TabsContent value="turma" className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateTurma(-1)}
              disabled={turmaIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select value={selectedTurma} onValueChange={setSelectedTurma}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Selecionar turma" />
              </SelectTrigger>
              <SelectContent>
                {turmas.map((turma) => (
                  <SelectItem key={turma} value={turma}>
                    Turma {turma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateTurma(1)}
              disabled={turmaIndex === turmas.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Horario da Turma {selectedTurma}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border bg-muted p-3 text-left text-sm font-medium">
                        Tempo
                      </th>
                      {diasSemana.map((dia) => (
                        <th
                          key={dia}
                          className="border border-border bg-muted p-3 text-center text-sm font-medium"
                        >
                          {dia}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tempos.map((tempo) => (
                      <tr key={tempo.id}>
                        <td className="border border-border bg-muted/50 p-3 text-sm">
                          <div className="font-medium">{tempo.inicio}</div>
                          <div className="text-xs text-muted-foreground">{tempo.fim}</div>
                        </td>
                        {diasSemana.map((dia) => {
                          const aula = mockHorario[selectedTurma]?.[dia]?.[tempo.id]
                          return (
                            <td key={dia} className="border border-border p-1">
                              {aula ? (
                                <div
                                  className="flex h-full min-h-16 flex-col justify-center rounded-md p-2 text-white"
                                  style={{ backgroundColor: aula.cor }}
                                >
                                  <div className="font-medium text-sm">{aula.disciplina}</div>
                                  <div className="text-xs opacity-90">{aula.professor}</div>
                                  <div className="text-xs opacity-75">{aula.sala}</div>
                                </div>
                              ) : (
                                <div className="flex h-full min-h-16 items-center justify-center text-muted-foreground">
                                  -
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professor" className="space-y-4">
          <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Selecionar professor" />
            </SelectTrigger>
            <SelectContent>
              {professores.map((professor) => (
                <SelectItem key={professor} value={professor}>
                  {professor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedProfessor ? (
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Horario de {selectedProfessor}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-border bg-muted p-3 text-left text-sm font-medium">
                          Tempo
                        </th>
                        {diasSemana.map((dia) => (
                          <th
                            key={dia}
                            className="border border-border bg-muted p-3 text-center text-sm font-medium"
                          >
                            {dia}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tempos.map((tempo) => (
                        <tr key={tempo.id}>
                          <td className="border border-border bg-muted/50 p-3 text-sm">
                            <div className="font-medium">{tempo.inicio}</div>
                            <div className="text-xs text-muted-foreground">{tempo.fim}</div>
                          </td>
                          {diasSemana.map((dia) => {
                            let professorAula: { turma: string; aula: Aula } | null = null
                            for (const turma of turmas) {
                              const aula = mockHorario[turma]?.[dia]?.[tempo.id]
                              if (aula?.professor === selectedProfessor) {
                                professorAula = { turma, aula }
                                break
                              }
                            }
                            return (
                              <td key={dia} className="border border-border p-1">
                                {professorAula ? (
                                  <div
                                    className="flex h-full min-h-16 flex-col justify-center rounded-md p-2 text-white"
                                    style={{ backgroundColor: professorAula.aula.cor }}
                                  >
                                    <div className="font-medium text-sm">{professorAula.aula.disciplina}</div>
                                    <div className="text-xs opacity-90">Turma {professorAula.turma}</div>
                                    <div className="text-xs opacity-75">{professorAula.aula.sala}</div>
                                  </div>
                                ) : (
                                  <div className="flex h-full min-h-16 items-center justify-center text-muted-foreground">
                                    -
                                  </div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex h-64 items-center justify-center">
                <p className="text-muted-foreground">
                  Selecione um professor para visualizar o horario
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              { nome: "Matematica", cor: "#ef4444" },
              { nome: "Portugues", cor: "#3b82f6" },
              { nome: "Fisica", cor: "#22c55e" },
              { nome: "Ingles", cor: "#a855f7" },
              { nome: "Historia", cor: "#f97316" },
              { nome: "Ed. Fisica", cor: "#ec4899" },
              { nome: "Biologia", cor: "#eab308" },
            ].map((disciplina) => (
              <div key={disciplina.nome} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: disciplina.cor }}
                />
                <span className="text-sm">{disciplina.nome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
