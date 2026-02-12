import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { TemposContent } from "@/feactures/dashboard/components/tempos-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function TemposPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <TemposContent />
    </DashboardLayout>
  )
}
