'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDashboardStats, getPendingVerifications, getUpcomingEvents } from '@/lib/nocodb'
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendingVerifications: 0,
    overdueBadges: 0,
    upcomingEvents: 0,
    outstandingPayments: 0,
    totalScouts: 0,
  })
  const [pendingBadges, setPendingBadges] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, pendingData, eventsData] = await Promise.all([
        getDashboardStats(),
        getPendingVerifications(),
        getUpcomingEvents(),
      ])
      
      setStats(statsData)
      setPendingBadges(pendingData.list?.slice(0, 5) || [])
      setUpcomingEvents(eventsData.list?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
      // For demo, set some mock data
      setStats({
        pendingVerifications: 5,
        overdueBadges: 3,
        upcomingEvents: 2,
        outstandingPayments: 12,
        totalScouts: 60,
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Pending Verifications',
      value: stats.pendingVerifications,
      icon: ShieldCheckIcon,
      color: 'bg-blue-500',
      href: '/dashboard/badges',
    },
    {
      name: 'Overdue Badges',
      value: stats.overdueBadges,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      href: '/dashboard/badges?filter=overdue',
    },
    {
      name: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: CalendarDaysIcon,
      color: 'bg-green-500',
      href: '/dashboard/events',
    },
    {
      name: 'Outstanding Payments',
      value: stats.outstandingPayments,
      icon: CreditCardIcon,
      color: 'bg-yellow-500',
      href: '/dashboard/payments',
    },
    {
      name: 'Active Scouts',
      value: stats.totalScouts,
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      href: '/dashboard/scouts',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Selamat Datang! 👋</h2>
        <p className="text-gray-600 mt-1">Berikut ringkasan aktiviti kumpulan anda hari ini.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-600 mt-1">{card.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Verifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">🔔 Pending Verifications</h3>
            <Link href="/dashboard/badges" className="text-sm text-pengakap-green hover:underline">
              View All
            </Link>
          </div>
          {pendingBadges.length > 0 ? (
            <div className="space-y-3">
              {pendingBadges.map((badge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{badge.scout_name || 'Scout Name'}</p>
                    <p className="text-sm text-gray-600">{badge.badge_name || 'Badge Name'}</p>
                  </div>
                  <button className="text-xs bg-pengakap-green text-white px-3 py-1 rounded-full hover:bg-pengakap-green/90">
                    Verify
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ShieldCheckIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Tiada badge untuk verify</p>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">📅 Upcoming Events</h3>
            <Link href="/dashboard/events" className="text-sm text-pengakap-green hover:underline">
              View All
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <CalendarDaysIcon className="w-5 h-5 text-pengakap-green mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.event_name || 'Event Name'}</p>
                    <p className="text-sm text-gray-600">
                      {event.event_date ? new Date(event.event_date).toLocaleDateString('ms-MY') : 'Date TBA'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarDaysIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Tiada event dijadualkan</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/badges"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <ShieldCheckIcon className="w-8 h-8 mb-3" />
          <h4 className="font-semibold text-lg mb-1">Verify Badges</h4>
          <p className="text-sm text-blue-100">Review & approve badge completions</p>
        </Link>

        <Link
          href="/dashboard/attendance"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <ShieldCheckIcon className="w-8 h-8 mb-3" />
          <h4 className="font-semibold text-lg mb-1">Mark Attendance</h4>
          <p className="text-sm text-green-100">Record scout attendance for events</p>
        </Link>

        <Link
          href="/dashboard/announcements"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <ShieldCheckIcon className="w-8 h-8 mb-3" />
          <h4 className="font-semibold text-lg mb-1">New Announcement</h4>
          <p className="text-sm text-purple-100">Post updates to parents & scouts</p>
        </Link>
      </div>
    </div>
  )
}
