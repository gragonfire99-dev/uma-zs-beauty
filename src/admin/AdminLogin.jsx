import { useState } from 'react'
import { signInAdmin, getProfile } from '../lib/adminApi'
import './Admin.css'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { user } = await signInAdmin(email, password)
      if (!user) {
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.')
        setLoading(false)
        return
      }

      // التحقق من صلاحية admin
      const profile = await getProfile(user.id)
      if (!profile || profile.role !== 'admin') {
        setError('ليس لديك صلاحية الوصول إلى لوحة الإدارة.')
        setLoading(false)
        return
      }

      onLogin(user, profile)
    } catch (err) {
      console.error('Login error:', err)
      setError('بيانات الدخول غير صحيحة.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1 className="admin-login-title">UMA Z&S Beauty</h1>
          <p className="admin-login-subtitle">تسجيل دخول المدير</p>

          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}