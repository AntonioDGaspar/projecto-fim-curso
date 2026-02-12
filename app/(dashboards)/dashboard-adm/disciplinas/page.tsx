import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { DisciplinasContent } from "@/feactures/dashboard/components/disciplinas-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function DisciplinasPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <DisciplinasContent />
    </DashboardLayout>
  )
}
