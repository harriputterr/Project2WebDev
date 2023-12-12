import React from 'react'
import LoginPage from '@/app/components/LoginPage'
import RegisterPage from '@/app/components/RegisterPage'
export default function page() {
  return (
    <div className='flex justify-center items-center h-screen space-x-80'>
        <RegisterPage />
        <LoginPage />
    </div>
  )
}
