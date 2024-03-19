import { Suspense, type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { Header } from '../header/Header'
import { Loader } from '../loader/Loader'

export const Layout: FC = () => {
	const userAuthStore = useAuthStore()

	if (userAuthStore.requestLoading) return <Loader />	

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  )
}
