import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { RequisicoesContent } from "@/feactures/dashboard/components/requisicoes-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function RequisicoesPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <RequisicoesContent />
    </DashboardLayout>
  )
}
