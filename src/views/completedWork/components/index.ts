import { lazy } from 'react'

const CompletedWorkControl = lazy(() => import('./control/CompletedWorkControl'))
const CompletedWorksCards = lazy(() => import('./cards/CompletedWorksCards'))
const CompletedWorkForm = lazy(() => import('./form/CompletedWorkForm'))

export { CompletedWorkControl, CompletedWorkForm, CompletedWorksCards }

