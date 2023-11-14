import { Route, Routes } from 'react-router-dom'

import { DistrictPage } from '../../views/district/DistrictPage'
import { HomePage } from '../../views/home/HomePage'
import { Info } from '../../views/district/components/info/Info'
import { Layout } from '../layout/Layout'
import React from 'react'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/districts' element={<DistrictPage />} />
        <Route path='/districts/:id/substations' element={<Info />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Route>
    </Routes>
  )
}
