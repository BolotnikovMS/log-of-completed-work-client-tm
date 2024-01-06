import { lazy } from 'react'

const ChannelTypeControl = lazy(() => import('./control/ChannelTypeControl'))
const ChannelTypeForm = lazy(() => import('./form/ChannelTypeForm'))
const ChannelTypeCards = lazy(() => import('./cards/ChannelTypeCards'))

export { ChannelTypeCards, ChannelTypeControl, ChannelTypeForm }
