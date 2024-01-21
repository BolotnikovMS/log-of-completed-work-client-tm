import { lazy } from 'react'

const CompletedWorkControl = lazy(() => import('./control/CompletedWorkControl'))
const CompletedWorksCards = lazy(() => import('./cards/CompletedWorksCards'))
const CompletedWorkForm = lazy(() => import('./form/CompletedWorkForm'))
const CompletedWorkFilters = lazy(() => import('./filters/CompletedWorkFilters'))

export { CompletedWorkControl, CompletedWorkFilters, CompletedWorkForm, CompletedWorksCards }

