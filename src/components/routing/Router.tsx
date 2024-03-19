import { Route, Routes } from 'react-router-dom'
import { Layout, Page } from '..'
import { ChannelTypeCards, ChannelTypeControl } from '../../views/channelType/components'
import { CompletedWorkControl, CompletedWorksCards } from '../../views/completedWork/components'
import { DistrictControl, DistrictSubstationCards, DistrictsCards } from '../../views/district/components'
import { GsmOperatorControl, GsmOperatorsCards } from '../../views/gsmOperator/components'
import { HeadControllerControl, HeadControllersCards } from '../../views/headControllers/components'
import { SubstationControl, SubstationInfo, SubstationsCards } from '../../views/substations/components'
import { TypeKpControl, TypesKpCards } from '../../views/typesKp/components'
import { VoltageClassesCards, VoltageControl } from '../../views/voltageClasses/components'

import React from 'react'
import { Profile } from '../../views/auth'
import { SignIn } from '../../views/auth/SignIn'
import { HomePage } from '../../views/home/HomePage'

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
									{/* !!Использование компонента с карточками ПС */}
									<SubstationControl />
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
                  <SubstationControl />
                  <SubstationsCards />
                </>
              }
            />
          }
        />
				<Route path='/substations/:id' 
					element={
						<Page 
							children={
								<>
									<SubstationInfo />
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
        <Route path='/gsm-operators'
          element={
            <Page
              title='GSM операторы'
              children={
                <>
                  <GsmOperatorControl />
                  <GsmOperatorsCards />
                </>
              }
            />
          }
        />
				<Route path='/completed-works'
					element={
						<Page
							title='Выполненные работы'
							children={
								<>
									<CompletedWorkControl />
									<CompletedWorksCards />
								</>
							}
						/>
					}
				/>
				<Route path='/profile'
					element={
						<Page
							title='Профиль'
							children={
								<>
									<Profile />
								</>
							}
						/>
					}
				/>
				<Route path='/sign-in'
					element={
						<Page
							title='Вход'
							classTitle='title-center'
							children={
								<>
									<SignIn />
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
