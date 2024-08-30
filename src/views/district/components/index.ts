import { lazy } from 'react'

const DistrictControl = lazy(() => import('./district-control/DistrictControl'))
const DistrictsCards = lazy(() => import('./districts-cards/DistrictsCards'))
const DistrictForm = lazy(() => import('./form/DistrictForm'))
const DistrictSubstationCards = lazy(() => import('./district-substations/DistrictSubstationCards'))
const DistrictFilters = lazy(() => import('./filters/DistrictFilters'))

export { DistrictControl, DistrictFilters, DistrictForm, DistrictSubstationCards, DistrictsCards }
