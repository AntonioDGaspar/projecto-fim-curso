import { DashboardLayout } from "@/components/dashboard-layout"
import { DisciplinasContent } from "@/components/disciplinas-content"
import { listarTodas } from "./disciplinas-action"

export default async function DisciplinasPage() {
  const disciplinas = await listarTodas()

  return (
    <DashboardLayout>
      <DisciplinasContent disciplinas={disciplinas} />
    </DashboardLayout>
  )
}
