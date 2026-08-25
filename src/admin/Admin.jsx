import { useEffect, useState } from 'react'
import { getSessionUser, getProfile, signOutAdmin } from '../lib/adminApi'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import './Admin.css'

export default function Admin() {
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        if (!isSupabaseConfigured) {
          return
        }

        const sessionUser = await getSessionUser()

        if (!sessionUser) {
          return
        }

        const userProfile = await getProfile(sessionUser.id)

        if (userProfile && userProfile.role === 'admin') {
          setUser(sessionUser)
          setProfile(userProfile)
        }
      } catch (err) {
        console.error('Admin session restore error:', err)
      } finally {
        setChecking(false)
      }
    }

    restoreSession()
  }, [])

  const handleLogin = (loggedInUser, loggedInProfile) => {
    setUser(loggedInUser)
    setProfile(loggedInProfile)
  }

  const handleLogout = () => {
    setUser(null)
    setProfile(null)
  }

  const handleDeniedSignOut = async () => {
    try {
      await signOutAdmin()
    } catch (err) {
      console.error('Sign out error:', err)
    }
    handleLogout()
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-container">
        <div className="admin-login-page">
          <div className="admin-login-card">
            <h1 className="admin-login-title">UMA Z&S Beauty</h1>
            <p className="admin-login-subtitle">لوحة الإدارة</p>
            <div className="admin-error">
              Supabase غير مُعدّ بعد. أضف VITE_SUPABASE_URL و
              VITE_SUPABASE_ANON_KEY في ملف .env ثم أعد تشغيل الموقع.
            </div>
            <a href="/" className="admin-btn admin-btn-secondary">
              العودة إلى المتجر
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (checking) {
    return (
      <div className="admin-container">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          جاري التحقق من الجلسة...
        </div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="admin-login-page">
          <div className="admin-login-card">
            <h1 className="admin-login-title">UMA Z&S Beauty</h1>
            <p className="admin-login-subtitle">لوحة الإدارة</p>
            <div className="admin-error">
              هذه الحساب لا يملك صلاحية المدير. سجّل الدخول بحساب المدير.
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleDeniedSignOut}
            >
              تسجيل الخروج وتغيير الحساب
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminDashboard
      user={user}
      profile={profile}
      onLogout={handleLogout}
    />
  )
}
