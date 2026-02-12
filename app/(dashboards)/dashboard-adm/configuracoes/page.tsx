import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { ConfiguracoesContent } from "@/feactures/dashboard/components/configuracoes-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function ConfiguracoesPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <ConfiguracoesContent />
    </DashboardLayout>
  )
}
