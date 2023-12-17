import { DistrictControl, DistrictSubstationCards, DistrictsCards } from '../../views/district/components'
import { HeadControllerControl, HeadControllersCards } from '../../views/headControllers/components'
import { Layout, Page } from '..'
import { Route, Routes } from 'react-router-dom'
import { TypeKpControl, TypesKpCards } from '../../views/typesKp/components'
import { VoltageClassesCards, VoltageControl } from '../../views/voltageClasses/components'

import { HomePage } from '../../views/home/HomePage'
import React from 'react'
import { SubstationsCards } from '../../views/substations/components/substations-cards/SubstationsCards'
import { ChannelTypeCards, ChannelTypeControl } from '../../views/channelType/components'

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
                  <VoltageControl />
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
                  <TypeKpControl />
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
                  <HeadControllerControl />
                  <HeadControllersCards />
                </>
              }
            />
          }
        />
        <Route path='/channel-types'
          element={
            <Page
              title='Типы каналов'
              children={
                <>
                  <ChannelTypeControl />
                  <ChannelTypeCards />
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
