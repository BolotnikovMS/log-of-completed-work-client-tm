import { lazy } from 'react'

const ChannelForm = lazy(() => import('./form/ChannelForm'))
const ChannelCards = lazy(() => import('./cards/ChannelCards'))
const ChannelControl = lazy(() => import('./control/ChannelControl'))
const ChannelFilter = lazy(() => import('./filters/ChannelFilter'))

export { ChannelCards, ChannelControl, ChannelFilter, ChannelForm }
