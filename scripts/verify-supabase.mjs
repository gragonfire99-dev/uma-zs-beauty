// فحص تلقائي لاتصال المشروع بـ Supabase
// الاستخدام بعد إنشاء ملف .env:
//   node scripts/verify-supabase.mjs
//
// يستخدم anon key فقط (نفس ما يراه أي زائر للموقع) ولا ينفذ أي كتابة.

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv() {
  for (const name of ['.env', '.env.local']) {
    const p = join(root, name)
    if (!existsSync(p)) continue
    const vars = {}
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) vars[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
    return { file: name, vars }
  }
  return null
}

const env = loadEnv()

if (!env) {
  console.log('\n[FAIL] لا يوجد ملف .env في مجلد المشروع.')
  console.log('أنشئ .env وضع فيه سطرين:')
  console.log('  VITE_SUPABASE_URL=https://<project-ref>.supabase.co')
  console.log('  VITE_SUPABASE_ANON_KEY=<anon public key>')
  console.log('المصدر: Supabase Dashboard → Settings → API\n')
  process.exit(1)
}

const url = env.vars.VITE_SUPABASE_URL
const key = env.vars.VITE_SUPABASE_ANON_KEY

console.log(`\nقرأت الإعدادات من ${env.file}`)

let ok = true

if (!url || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url)) {
  console.log('[FAIL] VITE_SUPABASE_URL غير صالح — يجب أن يكون بالشكل https://xxxx.supabase.co')
  ok = false
} else {
  console.log(`[OK]   VITE_SUPABASE_URL = ${url.replace(/\/$/, '')}`)
}

if (!key || key.length < 30 || key === 'your_supabase_anon_key_here') {
  console.log('[FAIL] VITE_SUPABASE_ANON_KEY مفقود أو ما زال placeholder')
  ok = false
} else {
  console.log(`[OK]   VITE_SUPABASE_ANON_KEY موجود (${key.length} حرفاً)`)
}

if (!ok || !url || !key) process.exit(1)

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
}

async function check(name, path) {
  try {
    const res = await fetch(url.replace(/\/$/, '') + path, { headers })
    const body = await res.text()
    let parsed
    try {
      parsed = JSON.parse(body)
    } catch {
      parsed = body.slice(0, 200)
    }
    return { status: res.status, body: parsed }
  } catch (e) {
    return { status: 0, body: String(e.message || e) }
  }
}

// 1) الخدمة تعمل؟
{
  const r = await check('auth health', '/auth/v1/health')
  const pass = r.status === 200
  console.log(`\n[${pass ? 'OK' : 'FAIL'}] Auth API /auth/v1/health → HTTP ${r.status}`)
  if (!pass) {
    console.log('       تحقق من الرابط والمفتاح، وأن المشروع ليس متوقفاً (paused).')
    ok = false
  }
}

// 2) جدول المنتجات موجود والقراءة العامة شغالة؟ (يتطلب تطبيق schema.sql)
{
  const r = await check('products', '/rest/v1/products?select=id&limit=1')
  const pass = r.status === 200 && Array.isArray(r.body)
  console.log(`[${pass ? 'OK' : 'FAIL'}] جدول products مقروء للعامة → HTTP ${r.status}`)
  if (!pass) {
    console.log('       إذا كان الخطأ "relation does not exist" فلم يتم تطبيق schema.sql بعد.')
    console.log('       شغّل supabase/schema.sql كاملاً من: SQL Editor → Run')
    ok = false
  }
}

// 3) RLS على profiles يحجب الزوار؟
{
  const r = await check('profiles', '/rest/v1/profiles?select=id&limit=1')
  const blocked = Array.isArray(r.body) ? r.body.length === 0 : r.status >= 400
  const pass = r.status === 200 && blocked
  console.log(
    `[${pass ? 'OK' : 'WARN'}] profiles محمي بـ RLS من الزوار → HTTP ${r.status}`
  )
  if (!pass && r.status !== 200) {
    console.log('       غير متوقع — راجع سياسات RLS في schema.sql.')
  }
}

console.log(
  `\n${ok ? 'النتيجة: الاتصال سليم. الخطوة التالية: أنشئ مستخدم المدير وشغّل supabase/create-admin.sql' : 'النتيجة: توجد مشاكل أعلاه — عالجها ثم أعد الفحص.'}\n`
)

process.exit(ok ? 0 : 1)
