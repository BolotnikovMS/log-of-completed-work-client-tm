import { lazy } from 'react'

const ChannelCategoryControl = lazy(() => import('./control/ChannelCategoryControl'))
const ChannelCategoriesCards = lazy(() => import('./cards/ChannelCategoriesCards'))
const ChannelCategoryForm = lazy(() => import('./form/ChannelCategoryForm'))

export { ChannelCategoriesCards, ChannelCategoryControl, ChannelCategoryForm }
