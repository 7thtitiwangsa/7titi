'use client'

import { useEffect, useState } from 'react'
import { getActiveScouts } from '@/lib/nocodb'
import { UserGroupIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function ScoutsPage() {
  const [scouts, setScouts] = useState([])
  const [filteredScouts, setFilteredScouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRank, setFilterRank] = useState('all')

  const ranks = ['Peringkat 1', 'Peringkat 2', 'Peringkat 3', 'Kelas 1', 'Kelas 2', 'Kelas 3']

  useEffect(() => {
    loadScouts()
  }, [])

  useEffect(() => {
    filterScoutsList()
  }, [searchTerm, filterRank, scouts])

  const loadScouts = async () => {
    try {
      setLoading(true)
      const data = await getActiveScouts()
      setScouts(data.list || [])
    } catch (error) {
      console.error('Error loading scouts:', error)
      // Mock data for demo
      setScouts([
        {
          id: 1,
          full_name: 'Ahmad Bin Ali',
          current_rank: 'Peringkat 2',
          age: 12,
          phone_number: '012-3456789',
          school_name: 'SJKC Chung Hua',
          years_in_troop: 2,
        },
        {
          id: 2,
          full_name: 'Siti Nurhaliza Binti Hassan',
          current_rank: 'Peringkat 3',
          age: 13,
          phone_number: '013-9876543',
          school_name: 'SMK Titiwangsa',
          years_in_troop: 3,
        },
        {
          id: 3,
          full_name: 'Raj Kumar A/L Suresh',
          current_rank: 'Kelas 1',
          age: 14,
          phone_number: '016-2345678',
          school_name: 'SMK Sri Hartamas',
          years_in_troop: 4,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filterScoutsList = () => {
    let filtered = scouts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(scout =>
        scout.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scout.school_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by rank
    if (filterRank !== 'all') {
      filtered = filtered.filter(scout => scout.current_rank === filterRank)
    }

    setFilteredScouts(filtered)
  }

  const getRankColor = (rank) => {
    const colors = {
      'Peringkat 1': 'bg-blue-100 text-blue-800',
      'Peringkat 2': 'bg-green-100 text-green-800',
      'Peringkat 3': 'bg-purple-100 text-purple-800',
      'Kelas 1': 'bg-yellow-100 text-yellow-800',
      'Kelas 2': 'bg-orange-100 text-orange-800',
      'Kelas 3': 'bg-red-100 text-red-800',
    }
    return colors[rank] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari scout (nama atau sekolah)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pengakap-green focus:border-transparent"
            />
          </div>

          {/* Filter by Rank */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={filterRank}
              onChange={(e) => setFilterRank(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pengakap-green focus:border-transparent"
            >
              <option value="all">All Ranks</option>
              {ranks.map(rank => (
                <option key={rank} value={rank}>{rank}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
          <div>
            Total Scouts: <span className="font-semibold text-gray-900">{scouts.length}</span>
          </div>
          <div>
            Showing: <span className="font-semibold text-gray-900">{filteredScouts.length}</span>
          </div>
        </div>
      </div>

      {/* Scouts Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading scouts...</div>
        </div>
      ) : filteredScouts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiada scout dijumpai</h3>
          <p className="text-gray-600">Cuba ubah search atau filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScouts.map((scout) => (
            <div key={scout.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pengakap-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {scout.full_name?.charAt(0) || 'S'}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{scout.full_name}</h3>
                    <p className="text-sm text-gray-600">{scout.age} tahun</p>
                  </div>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="mb-4">
                <span className={`badge ${getRankColor(scout.current_rank)}`}>
                  {scout.current_rank}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sekolah:</span>
                  <span className="font-medium text-gray-900 text-right">{scout.school_name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">{scout.phone_number || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tahun dalam kumpulan:</span>
                  <span className="font-medium text-gray-900">{scout.years_in_troop || 0} tahun</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-pengakap-green/10 text-pengakap-green px-4 py-2 rounded-lg hover:bg-pengakap-green/20 transition-colors text-sm font-medium">
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
