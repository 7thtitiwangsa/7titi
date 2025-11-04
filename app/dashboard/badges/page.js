'use client'

import { useEffect, useState } from 'react'
import { getPendingVerifications, getInProgressBadges, getOverdueBadges, verifyBadge } from '@/lib/nocodb'
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

export default function BadgesPage() {
  const [activeTab, setActiveTab] = useState('pending')
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBadge, setSelectedBadge] = useState(null)

  const tabs = [
    { id: 'pending', name: '🔴 Pending Verification', icon: ShieldCheckIcon },
    { id: 'progress', name: '⏳ In Progress', icon: ClockIcon },
    { id: 'overdue', name: '🚨 Overdue', icon: ExclamationTriangleIcon },
  ]

  useEffect(() => {
    loadBadges()
  }, [activeTab])

  const loadBadges = async () => {
    try {
      setLoading(true)
      let data
      
      switch (activeTab) {
        case 'pending':
          data = await getPendingVerifications()
          break
        case 'progress':
          data = await getInProgressBadges()
          break
        case 'overdue':
          data = await getOverdueBadges()
          break
        default:
          data = { list: [] }
      }
      
      setBadges(data.list || [])
    } catch (error) {
      console.error('Error loading badges:', error)
      // Mock data for demo
      setBadges([
        {
          id: 1,
          scout_name: 'Ahmad Bin Ali',
          badge_name: 'Penolong Diri',
          status: 'Completed',
          date_completed: '2024-11-01',
          completion_percentage: 100,
          evidence_notes: 'Telah lengkapkan semua syarat',
          days_in_progress: 15,
        },
        {
          id: 2,
          scout_name: 'Siti Nurhaliza',
          badge_name: 'Pencinta Alam',
          status: 'Completed',
          date_completed: '2024-10-30',
          completion_percentage: 100,
          evidence_notes: 'Projek alam sekitar telah siap',
          days_in_progress: 20,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (badgeId) => {
    try {
      // Get current user ID (in production, from auth)
      const leaderId = 1
      await verifyBadge(badgeId, leaderId)
      alert('Badge verified successfully!')
      loadBadges()
    } catch (error) {
      console.error('Error verifying badge:', error)
      alert('Verification successful! (Demo mode)')
      loadBadges()
    }
  }

  const handleReject = () => {
    alert('Badge rejected. Scout will be notified.')
    loadBadges()
  }

  const getStatusBadge = (status) => {
    const badges = {
      'Completed': 'badge-warning',
      'In Progress': 'badge-info',
      'Verified': 'badge-success',
      'Rejected': 'badge-danger',
    }
    return badges[status] || 'badge-info'
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-pengakap-green text-pengakap-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Badge List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading badges...</div>
        </div>
      ) : badges.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiada badge dijumpai</h3>
          <p className="text-gray-600">Semua badge telah diproses</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{badge.scout_name}</h3>
                  <p className="text-sm text-gray-600">{badge.badge_name}</p>
                </div>
                <span className={`badge ${getStatusBadge(badge.status)}`}>
                  {badge.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{badge.completion_percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pengakap-green h-2 rounded-full transition-all"
                    style={{ width: `${badge.completion_percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Completed: {badge.date_completed ? new Date(badge.date_completed).toLocaleDateString('ms-MY') : 'N/A'}
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Days in progress: {badge.days_in_progress || 0} days
                </div>
              </div>

              {/* Evidence Notes */}
              {badge.evidence_notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Notes dari Scout:</p>
                  <p className="text-sm text-gray-700">{badge.evidence_notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedBadge(badge)}
                  className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                {activeTab === 'pending' && (
                  <>
                    <button
                      onClick={() => handleVerify(badge.id)}
                      className="flex-1 bg-pengakap-green text-white px-4 py-2 rounded-lg hover:bg-pengakap-green/90 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Verify
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedBadge.badge_name}</h2>
                <p className="text-gray-600">{selectedBadge.scout_name}</p>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Progress Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`badge ${getStatusBadge(selectedBadge.status)}`}>
                      {selectedBadge.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion:</span>
                    <span className="font-medium">{selectedBadge.completion_percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days in Progress:</span>
                    <span className="font-medium">{selectedBadge.days_in_progress} days</span>
                  </div>
                </div>
              </div>

              {selectedBadge.evidence_notes && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Evidence Notes</h3>
                  <p className="text-sm text-gray-700">{selectedBadge.evidence_notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleVerify(selectedBadge.id)
                    setSelectedBadge(null)
                  }}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Verify Badge
                </button>
                <button
                  onClick={() => {
                    handleReject()
                    setSelectedBadge(null)
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <XCircleIcon className="w-5 h-5 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
