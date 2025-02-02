import { lazy } from 'react'

const ObjectTypesCards = lazy(() => import('./cards/ObjectTypesCards'))
const ObjectTypeForm = lazy(() => import('./form/ObjectTypeForm'))
const ObjectTypeControl = lazy(() => import('./control/ObjectTypeControl'))

export { ObjectTypeControl, ObjectTypeForm, ObjectTypesCards }
