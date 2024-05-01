import { lazy } from 'react'

const CompletedWorkControl = lazy(() => import('./control/CompletedWorkControl'))
const CompletedWorksCards = lazy(() => import('./cards/CompletedWorksCards'))
const CompletedWorkForm = lazy(() => import('./form/CompletedWorkForm'))
const CompletedWorkFilters = lazy(() => import('./filters/CompletedWorkFilters'))
const CompletedWorkInfo = lazy(() => import('./info/CompletedWorkInfo'))

export { CompletedWorkControl, CompletedWorkFilters, CompletedWorkForm, CompletedWorksCards, CompletedWorkInfo }

