import { Suspense, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from '..'
import { LogoBe } from '../../icons'

export const AuthLayout: FC = () => {
  return (
    <div className='flex items-center h-screen'>
      <div className='!text-black w-2/5 flex flex-col items-center justify-center gap-5'>
        <LogoBe className='!text-black w-1/2' />
        <p className='text-4xl text-sky-500'>ПО "ИТиС" ООО "Башкирэнерго"</p>
      </div>
      <main className='flex-1 p-4'>
        <div className="container mx-auto max-w-3xl">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
