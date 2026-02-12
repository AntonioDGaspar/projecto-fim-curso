import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { TurmasContent } from "@/feactures/dashboard/components/turmas-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function TurmasPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <TurmasContent />
    </DashboardLayout>
  )
}
