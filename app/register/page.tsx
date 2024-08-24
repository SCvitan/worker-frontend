import React from 'react'
import RegisterForm from './form'

const page = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
      <div className='shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12'>
        <h1 className='font-semibold text-2xl'>Create your account</h1>
        <RegisterForm/>
      </div>
    </div>
  )
}

export default page
