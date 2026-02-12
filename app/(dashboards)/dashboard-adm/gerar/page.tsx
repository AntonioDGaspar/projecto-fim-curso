import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { GerarContent } from "@/feactures/dashboard/components/gerar-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function GerarPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <GerarContent />
    </DashboardLayout>
  )
}
