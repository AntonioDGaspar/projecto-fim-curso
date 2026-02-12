import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { HorariosContent } from "@/feactures/dashboard/components/horarios-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function HorariosPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <HorariosContent />
    </DashboardLayout>
  )
}
