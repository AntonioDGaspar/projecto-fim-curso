import { DashboardLayout } from "@/feactures/dashboard/components/dashboard-layout"
import { ProfessoresContent } from "@/feactures/dashboard/components/professores-content"
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function ProfessoresPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <DashboardLayout>
      <ProfessoresContent />
    </DashboardLayout>
  )
}
