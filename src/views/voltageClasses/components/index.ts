import { lazy } from 'react'

const VoltageControl = lazy(() => import('./control/VoltageControl'))
const VoltageClassForm = lazy(() => import('./form/VoltageClassForm'))
const VoltageClassesCards = lazy(() => import('./voltage-classes-cards/VoltageClassesCards'))

export { VoltageClassForm, VoltageClassesCards, VoltageControl }
