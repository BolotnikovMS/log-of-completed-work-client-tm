import { lazy } from 'react'

const TypeWorkControl = lazy(() => import('./control/TypeWorkControl'))
const TypesWorkCards = lazy(() => import('./cards/TypesWorkCards'))
const TypeWorkForm = lazy(() => import('./form/TypeWorkForm'))

export { TypesWorkCards, TypeWorkControl, TypeWorkForm }
