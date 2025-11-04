'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simple authentication - in production, you'd validate against NocoDB
      // For now, we'll just check if fields are filled and redirect
      if (email && password) {
        // Store login state (in production, use proper auth)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        router.push('/dashboard')
      } else {
        setError('Sila masukkan email dan password')
      }
    } catch (err) {
      setError('Login gagal. Sila cuba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pengakap-green to-pengakap-navy flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <span className="text-4xl">⚜️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Pengakap Laut 7 Titiwangsa
          </h1>
          <p className="text-pengakap-gold text-lg">
            Sistem Pengurusan Aktiviti
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Portal Leaders
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pengakap-green focus:border-transparent"
                placeholder="leader@pengakap7.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pengakap-green focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pengakap-green text-white py-3 rounded-lg font-semibold hover:bg-pengakap-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo Credentials:</p>
            <p className="font-mono text-xs mt-1">Email: leader@pengakap7.com</p>
            <p className="font-mono text-xs">Password: pengakap2024</p>
          </div>
        </div>

        <div className="text-center mt-6 text-white text-sm">
          <p>© 2024 Pengakap Laut 7 Titiwangsa</p>
        </div>
      </div>
    </div>
  )
}
