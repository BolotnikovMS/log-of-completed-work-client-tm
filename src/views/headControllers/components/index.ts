import { lazy } from 'react'

const HeadControllerControl = lazy(() => import('./control/HeadControllerControl'))
const HeadControllerForm = lazy(() => import('./form/HeadControllerForm'))
const HeadControllersCards = lazy(() => import('./headControllersCards/HeadControllersCards'))

export { HeadControllerControl, HeadControllerForm, HeadControllersCards }
