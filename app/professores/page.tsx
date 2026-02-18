import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfessoresContent } from "@/components/professores-content"
import { listarTodos, listarDisciplinas } from "./professores-action"

export default async function ProfessoresPage() {
  const [professores, disciplinas] = await Promise.all([
    listarTodos(),
    listarDisciplinas(),
  ])

  return (
    <DashboardLayout>
      <ProfessoresContent professores={professores} disciplinas={disciplinas} />
    </DashboardLayout>
  )
}
