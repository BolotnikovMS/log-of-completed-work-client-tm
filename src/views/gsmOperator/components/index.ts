import { lazy } from 'react'

const GsmOperatorControl = lazy(() => import('./control/GsmOperatorControl'))
const GsmOperatorForm = lazy(() => import('./form/GsmOperatorForm'))
const GsmOperatorsCards = lazy(() => import('./cards/GsmOperatorsCards'))

export { GsmOperatorControl, GsmOperatorForm, GsmOperatorsCards }
