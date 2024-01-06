import { lazy } from 'react'

const TypeKpControl = lazy(() => import('./control/TypeKpControl'))
const TypeKpForm = lazy(() => import('./form/TypeKpForm'))
const TypesKpCards = lazy(() => import('./types-kp-cards/TypesKpCards'))

export { TypeKpControl, TypeKpForm, TypesKpCards }
