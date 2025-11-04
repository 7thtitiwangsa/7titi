import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pengakap Laut 7 Titiwangsa - Sistema Pengurusan',
  description: 'Sistem pengurusan badge, kehadiran dan aktiviti Pengakap',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
