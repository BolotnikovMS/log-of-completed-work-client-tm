import { lazy } from 'react'

const ChannelEquipmentCards = lazy(() => import('./cards/ChannelEquipmentCards'))
const ChannelEquipmentForm = lazy(() => import('./form/ChannelEquipmentForm'))
const ChannelEquipmentControl = lazy(() => import('./control/ChannelEquipmentControl'))

export { ChannelEquipmentCards, ChannelEquipmentForm, ChannelEquipmentControl }
