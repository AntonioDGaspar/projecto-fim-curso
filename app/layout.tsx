import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';

import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Meu Projeto",
  description: "Descrição do meu projeto",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <AuthKitProvider>{children}</AuthKitProvider>
      </body>
    </html>
  )
}
