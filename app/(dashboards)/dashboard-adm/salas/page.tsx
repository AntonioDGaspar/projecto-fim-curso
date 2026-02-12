import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { SalasContent } from "@/feactures/dashboard/components/salas-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function SalasPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <SalasContent />
    </DashboardLayout>
  )
}
