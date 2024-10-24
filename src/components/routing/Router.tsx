import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, Layout, Page, ProtectedRoute } from '..'
import { ERoles } from '../../enums/roles.enum'
import { checkRole } from '../../helpers/checkRole.helper'
import { useAuthStore } from '../../store/auth'
import { Profile, ProfileControl, SignIn } from '../../views/auth'
import { ChannelCards, ChannelControl } from '../../views/channel/components'
import { ChannelCategoriesCards, ChannelCategoryControl } from '../../views/channelCategory/components'
import { ChannelEquipmentCards, ChannelEquipmentControl } from '../../views/channelEquipment/components'
import { ChannelTypeCards, ChannelTypeControl } from '../../views/channelType/components'
import { CompletedWorkControl, CompletedWorksCards } from '../../views/completedWork/components'
import Dashboard from '../../views/dashboard/Dashboard'
import { DistrictControl, DistrictSubstationCards, DistrictsCards } from '../../views/district/components'
import { GsmOperatorControl, GsmOperatorsCards } from '../../views/gsmOperator/components'
import { HeadControllerControl, HeadControllersCards } from '../../views/headControllers/components'
import { SubstationControl, SubstationInfo, SubstationsCards } from '../../views/substations/components'
import { TypeKpControl, TypesKpCards } from '../../views/typesKp/components'
import { UserControl, UsersTable } from '../../views/user/components'
import { VoltageClassesCards, VoltageControl } from '../../views/voltageClasses/components'
import { TypeWorkControl, TypesWorkCards } from '../../views/typeWork/components'

export const Router: React.FC = () => {
  const { authUser } = useAuthStore()

  return (
    <Routes>
      <Route path='/' element={authUser ? <Layout /> : <AuthLayout />}>
        <Route index element={
          <ProtectedRoute isAllowed={!!authUser}>
            <Page
              title='Статистика'
              children={
                <Dashboard />
              }
            />
          </ProtectedRoute>
        } />
        <Route path='/districts'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Районы, ГП, УС'
                children={
                  <>
                    <DistrictControl />
                    <DistrictsCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/districts/:id/substations'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Список ПС'
                children={
                  <>
                    {/* !!Использование компонента с карточками ПС */}
                    <SubstationControl />
                    <DistrictSubstationCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/substations'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Список ПС'
                children={
                  <>
                    <SubstationControl />
                    <SubstationsCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/substations/:id'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                children={
                  <>
                    <SubstationInfo />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/voltage-classes'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Классы напряжения'
                children={
                  <>
                    <VoltageControl />
                    <VoltageClassesCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/types-kp'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Типы КП'
                children={
                  <>
                    <TypeKpControl />
                    <TypesKpCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/head-controllers'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Головные контроллеры'
                children={
                  <>
                    <HeadControllerControl />
                    <HeadControllersCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/channel-categories'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Категории каналов'
                children={
                  <>
                    <ChannelCategoryControl />
                    <ChannelCategoriesCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/channel-types'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Типы каналов'
                children={
                  <>
                    <ChannelTypeControl />
                    <ChannelTypeCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/channeling-equipments'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Каналообразующее оборудование'
                children={
                  <>
                    <ChannelEquipmentControl />
                    <ChannelEquipmentCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/channels'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Каналы'
                children={
                  <>
                    <ChannelControl />
                    <ChannelCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/gsm-operators'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='GSM операторы'
                children={
                  <>
                    <GsmOperatorControl />
                    <GsmOperatorsCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/types-work'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Категории работ'
                children={
                  <>
                    <TypeWorkControl />
                    <TypesWorkCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/completed-works'
          element={
            <ProtectedRoute isAllowed={!!authUser}>
              <Page
                title='Выполненные работы'
                children={
                  <>
                    <CompletedWorkControl />
                    <CompletedWorksCards />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/users'
          element={
            <ProtectedRoute isAllowed={!!authUser && checkRole(authUser, [ERoles.Admin])}>
              <Page
                title='Пользователи'
                children={
                  <>
                    <UserControl />
                    <UsersTable />
                  </>
                }
              />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'
          element={
            <Page
              title='Профиль'
              children={
                <>
                  <ProfileControl />
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
