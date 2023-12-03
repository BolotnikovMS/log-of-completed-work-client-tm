import { DistrictControl, DistrictForm, DistrictSubstationCards, DistrictsCards } from '../../views/district/components'
import { HeadControllerForm, HeadControllersCards } from '../../views/headControllers/components'
import { Layout, Page } from '..'
import { Route, Routes } from 'react-router-dom'
import { TypeKpForm, TypesKpCards } from '../../views/typesKp/components'
import { VoltageClassForm, VoltageClassesCards } from '../../views/voltageClasses/components'

import { HomePage } from '../../views/home/HomePage'
import React from 'react'
import { SubstationsCards } from '../../views/substations/components/substations-cards/SubstationsCards'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/districts'
          element={
            <Page
              title='Районы и ГП'
              children={
                <>
                  <DistrictForm />
                  <DistrictControl />
                  <DistrictsCards />
                </>
              }
            />
          }
        />
        <Route path='/districts/:id/substations' 
          element={
            <Page 
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
            <Page
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
            <Page 
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
        <Route path='/types-kp'
          element={
            <Page 
              title='Типы КП'
              children={
                <>
                  <TypeKpForm />
                  <TypesKpCards />
                </>
              }
            />
          }
        />
        <Route path='/head-controllers'
          element={
            <Page 
              title='Головные контроллеры'
              children={
                <>
                  <HeadControllerForm />
                  <HeadControllersCards />
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
