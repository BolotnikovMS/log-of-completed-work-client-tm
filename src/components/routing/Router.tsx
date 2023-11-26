import { DistrictControl, DistrictForm, DistrictSubstationCards, DistrictsCards } from '../../views/district/components'
import { Route, Routes } from 'react-router-dom'
import { VoltageClassForm, VoltageClassesCards } from '../../views/voltageClasses/components'

import { DistrictsPage } from '../../views/district/DistrictsPage'
import { HomePage } from '../../views/home/HomePage'
import { Layout } from '..'
import React from 'react'
import { SubstationsCards } from '../../views/substations/components/substations-cards/SubstationsCards'
import { SubstationsPage } from '../../views/substations/SubstationsPage'
import { VoltageClassesPage } from '../../views/voltageClasses/VoltageClassesPage'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/districts' 
          element={
            <DistrictsPage 
              title='Районы и ГП'
              children={
                <>
                  <DistrictForm />
                  <DistrictControl />
                  <DistrictsCards />
                </>
              } 
          />}
        />
        <Route path='/districts/:id/substations' 
          element={
            <DistrictsPage 
              title='Подстанций'
              children={
                <>
                  <DistrictSubstationCards />
                </>
              }
            />        
          }
        />
        <Route path='/substations'
          element={
            <SubstationsPage
              title='Подстанций'
              children={
                <>
                  <SubstationsCards />
                </>
              }
            />
          }
        />
        <Route path='/voltage-classes'
          element={
            <VoltageClassesPage 
              title='Классы напряжения'
              children={
                <>
                  <VoltageClassForm />
                  <VoltageClassesCards />
                </>
              }
            />
          }
        />
        <Route path='*' element={<div>Not Found</div>} />
      </Route>
    </Routes>
  )
}
