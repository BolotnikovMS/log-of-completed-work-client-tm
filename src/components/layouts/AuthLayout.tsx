import { Suspense, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from '..'

export const AuthLayout: FC = () => {
  return (
    <div className='flex items-center h-screen'>
      <main className='flex-1 p-4'>
        <div className="container mx-auto">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
