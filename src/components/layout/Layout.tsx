import React, { Suspense } from 'react'

import { Header } from '../header/Header'
import { Loader } from '../loader/Loader'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
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
