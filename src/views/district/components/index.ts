import { lazy } from 'react'

const DistrictControl = lazy(() => import('./district-control/DistrictControl'))
const DistrictsCards = lazy(() => import('./districts-cards/DistrictsCards'))
const DistrictForm = lazy(() => import('./form/DistrictForm'))
const DistrictSubstationCards = lazy(() => import('./district-substations/DistrictSubstationCards'))

export { DistrictControl, DistrictForm, DistrictSubstationCards, DistrictsCards }
