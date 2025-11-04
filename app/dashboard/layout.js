'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  HomeIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Scouts', href: '/dashboard/scouts', icon: UserGroupIcon },
  { name: 'Badge Verification', href: '/dashboard/badges', icon: ShieldCheckIcon },
  { name: 'Attendance', href: '/dashboard/attendance', icon: ClipboardDocumentCheckIcon },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCardIcon },
  { name: 'Events', href: '/dashboard/events', icon: CalendarDaysIcon },
  { name: 'Announcements', href: '/dashboard/announcements', icon: MegaphoneIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-pengakap-navy">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-pengakap-green">
            <span className="text-2xl mr-2">⚜️</span>
            <span className="text-white font-bold text-lg">Pengakap 7</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-pengakap-green text-white'
                      : 'text-gray-300 hover:bg-pengakap-green/20 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-pengakap-green/20">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-pengakap-gold rounded-full flex items-center justify-center text-pengakap-navy font-bold">
                L
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Leader</p>
                <p className="text-xs text-gray-400">Ketua Kumpulan</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Log Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('ms-MY', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
