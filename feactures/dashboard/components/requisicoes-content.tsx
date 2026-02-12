"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/feactures/dashboard/components/ui/card"
import { Button } from "@/feactures/dashboard/components/ui/button"
import { Badge } from "@/feactures/dashboard/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/feactures/dashboard/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/feactures/dashboard/components/ui/dialog"
import { Textarea } from "@/feactures/dashboard/components/ui/textarea"
import { Label } from "@/feactures/dashboard/components/ui/label"
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Calendar,
  MessageSquare,
  FileText,
  AlertCircle,
} from "lucide-react"

interface Requisicao {
  id: string
  professor: string
  tipo: "alteracao_horario" | "troca_sala" | "permuta"
  descricao: string
  detalhes: {
    turma?: string
    diaOriginal?: string
    tempoOriginal?: string
    diaDesejado?: string
    tempoDesejado?: string
    salaOriginal?: string
    salaDesejada?: string
    professorTroca?: string
  }
  status: "pendente" | "aprovado" | "rejeitado"
  dataCriacao: string
  dataAtualizacao?: string
  resposta?: string
}

const initialRequisicoes: Requisicao[] = [
  {
    id: "1",
    professor: "Maria Silva",
    tipo: "alteracao_horario",
    descricao: "Solicito alteracao do horario de Matematica da turma 10A para o periodo da tarde",
    detalhes: {
      turma: "10A",
      diaOriginal: "Segunda",
      tempoOriginal: "08:00 - 08:50",
      diaDesejado: "Segunda",
      tempoDesejado: "14:00 - 14:50",
    },
    status: "pendente",
    dataCriacao: "30 Jan, 14:30",
  },
  {
    id: "2",
    professor: "Joao Santos",
    tipo: "troca_sala",
    descricao: "Necessito de uma sala com projetor para a aula de Portugues",
    detalhes: {
      turma: "11B",
      salaOriginal: "Sala 102",
      salaDesejada: "Sala 201",
    },
    status: "aprovado",
    dataCriacao: "29 Jan, 09:15",
    dataAtualizacao: "29 Jan, 16:45",
    resposta: "Alteracao aprovada. A sala 201 estara disponivel a partir de segunda-feira.",
  },
  {
    id: "3",
    professor: "Ana Costa",
    tipo: "permuta",
    descricao: "Proposta de permuta de horario com a professora Teresa Almeida",
    detalhes: {
      turma: "12C",
      professorTroca: "Teresa Almeida",
      diaOriginal: "Quarta",
      tempoOriginal: "10:05 - 10:55",
      diaDesejado: "Quinta",
      tempoDesejado: "10:05 - 10:55",
    },
    status: "rejeitado",
    dataCriacao: "28 Jan, 16:45",
    dataAtualizacao: "29 Jan, 10:30",
    resposta: "Nao foi possivel aprovar devido a conflito de horario da Profa. Teresa na quinta-feira.",
  },
  {
    id: "4",
    professor: "Pedro Oliveira",
    tipo: "troca_sala",
    descricao: "Solicito utilizacao do laboratorio de informatica para aula pratica",
    detalhes: {
      turma: "9D",
      salaOriginal: "Sala 105",
      salaDesejada: "Lab. Informatica 1",
    },
    status: "pendente",
    dataCriacao: "27 Jan, 11:20",
  },
  {
    id: "5",
    professor: "Sofia Ferreira",
    tipo: "alteracao_horario",
    descricao: "Impossibilidade de dar aulas nas tardes de sexta-feira por motivos pessoais",
    detalhes: {
      turma: "10B",
      diaOriginal: "Sexta",
      tempoOriginal: "14:00 - 15:45",
      diaDesejado: "Quinta",
      tempoDesejado: "14:00 - 15:45",
    },
    status: "pendente",
    dataCriacao: "26 Jan, 08:00",
  },
]

const statusColors = {
  pendente: "bg-accent text-accent-foreground",
  aprovado: "bg-green-600 text-white",
  rejeitado: "bg-destructive text-destructive-foreground",
}

const statusIcons = {
  pendente: Clock,
  aprovado: CheckCircle2,
  rejeitado: XCircle,
}

const tipoLabels = {
  alteracao_horario: "Alteracao de Horario",
  troca_sala: "Troca de Sala",
  permuta: "Permuta",
}

export function RequisicoesContent() {
  const [requisicoes, setRequisicoes] = useState<Requisicao[]>(initialRequisicoes)
  const [selectedRequisicao, setSelectedRequisicao] = useState<Requisicao | null>(null)
  const [actionType, setActionType] = useState<"aprovar" | "rejeitar" | null>(null)
  const [resposta, setResposta] = useState("")
  const [filter, setFilter] = useState("todas")

  const filteredRequisicoes = requisicoes.filter((r) => {
    if (filter === "todas") return true
    return r.status === filter
  })

  const pendentes = requisicoes.filter((r) => r.status === "pendente").length
  const aprovados = requisicoes.filter((r) => r.status === "aprovado").length
  const rejeitados = requisicoes.filter((r) => r.status === "rejeitado").length

  const handleAction = (requisicao: Requisicao, action: "aprovar" | "rejeitar") => {
    setSelectedRequisicao(requisicao)
    setActionType(action)
    setResposta("")
  }

  const confirmAction = () => {
    if (!selectedRequisicao || !actionType) return

    setRequisicoes((prev) =>
      prev.map((r) =>
        r.id === selectedRequisicao.id
          ? {
              ...r,
              status: actionType === "aprovar" ? "aprovado" : "rejeitado",
              dataAtualizacao: "Agora",
              resposta,
            }
          : r
      )
    )
    setSelectedRequisicao(null)
    setActionType(null)
    setResposta("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Requisicoes</h1>
          <p className="text-muted-foreground">
            Gerir pedidos de alteracao dos professores
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requisicoes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
            <Clock className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aprovados
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{aprovados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejeitados
            </CardTitle>
            <XCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{rejeitados}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendente">Pendentes</TabsTrigger>
          <TabsTrigger value="aprovado">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejeitado">Rejeitadas</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          <div className="space-y-4">
            {filteredRequisicoes.length === 0 ? (
              <Card>
                <CardContent className="flex h-32 items-center justify-center">
                  <p className="text-muted-foreground">Nenhuma requisicao encontrada</p>
                </CardContent>
              </Card>
            ) : (
              filteredRequisicoes.map((requisicao) => {
                const StatusIcon = statusIcons[requisicao.status]
                return (
                  <Card key={requisicao.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{requisicao.professor}</h3>
                                <Badge variant="outline">{tipoLabels[requisicao.tipo]}</Badge>
                                <Badge className={statusColors[requisicao.status]}>
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {requisicao.status.charAt(0).toUpperCase() + requisicao.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {requisicao.dataCriacao}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm">{requisicao.descricao}</p>

                          <div className="flex flex-wrap gap-4 rounded-lg bg-muted p-4 text-sm">
                            {requisicao.detalhes.turma && (
                              <div>
                                <span className="text-muted-foreground">Turma:</span>{" "}
                                <span className="font-medium">{requisicao.detalhes.turma}</span>
                              </div>
                            )}
                            {requisicao.detalhes.diaOriginal && (
                              <div>
                                <span className="text-muted-foreground">De:</span>{" "}
                                <span className="font-medium">
                                  {requisicao.detalhes.diaOriginal}, {requisicao.detalhes.tempoOriginal}
                                </span>
                              </div>
                            )}
                            {requisicao.detalhes.diaDesejado && (
                              <div>
                                <span className="text-muted-foreground">Para:</span>{" "}
                                <span className="font-medium">
                                  {requisicao.detalhes.diaDesejado}, {requisicao.detalhes.tempoDesejado}
                                </span>
                              </div>
                            )}
                            {requisicao.detalhes.salaOriginal && (
                              <div>
                                <span className="text-muted-foreground">Sala atual:</span>{" "}
                                <span className="font-medium">{requisicao.detalhes.salaOriginal}</span>
                              </div>
                            )}
                            {requisicao.detalhes.salaDesejada && (
                              <div>
                                <span className="text-muted-foreground">Sala desejada:</span>{" "}
                                <span className="font-medium">{requisicao.detalhes.salaDesejada}</span>
                              </div>
                            )}
                            {requisicao.detalhes.professorTroca && (
                              <div>
                                <span className="text-muted-foreground">Permuta com:</span>{" "}
                                <span className="font-medium">{requisicao.detalhes.professorTroca}</span>
                              </div>
                            )}
                          </div>

                          {requisicao.resposta && (
                            <div className="flex items-start gap-2 rounded-lg border border-border p-4">
                              <MessageSquare className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Resposta do Administrador</p>
                                <p className="text-sm text-muted-foreground">{requisicao.resposta}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {requisicao.dataAtualizacao}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {requisicao.status === "pendente" && (
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => handleAction(requisicao, "aprovar")}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 bg-transparent"
                              onClick={() => handleAction(requisicao, "rejeitar")}
                            >
                              <XCircle className="h-4 w-4" />
                              Rejeitar
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedRequisicao} onOpenChange={() => setSelectedRequisicao(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "aprovar" ? "Aprovar Requisicao" : "Rejeitar Requisicao"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "aprovar"
                ? "Confirme a aprovacao e adicione uma mensagem opcional"
                : "Indique o motivo da rejeicao"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">{selectedRequisicao?.professor}</p>
              <p className="text-sm text-muted-foreground">{selectedRequisicao?.descricao}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resposta">
                Resposta {actionType === "rejeitar" && "(obrigatoria)"}
              </Label>
              <Textarea
                id="resposta"
                placeholder={
                  actionType === "aprovar"
                    ? "Adicione informacoes adicionais..."
                    : "Explique o motivo da rejeicao..."
                }
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequisicao(null)}>
              Cancelar
            </Button>
            <Button
              onClick={confirmAction}
              disabled={actionType === "rejeitar" && !resposta}
              className={actionType === "rejeitar" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {actionType === "aprovar" ? "Confirmar Aprovacao" : "Confirmar Rejeicao"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
