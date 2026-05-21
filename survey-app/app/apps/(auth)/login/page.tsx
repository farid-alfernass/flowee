import { Suspense } from 'react'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Memuat...</div>}>
      <LoginForm />
    </Suspense>
  )
}
