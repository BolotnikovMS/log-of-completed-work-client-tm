import { Suspense, type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { Header } from '../header/Header'
import { Loader } from '../loader/Loader'

export const Layout: FC = () => {
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
