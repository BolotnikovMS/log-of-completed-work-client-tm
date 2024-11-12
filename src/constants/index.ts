import { pageConfig } from '../config/pages.config'

export const url = import.meta.env.VITE_API_URL
export const urlFile = import.meta.env.VITE_FILE_URL
export const menuItemData = [
  {
    title: 'Районы, ГП, УС',
    url: pageConfig.districts,
  },
  {
    title: 'ПС',
    url: pageConfig.substations,
  },
  {
    title: 'Классы U',
    url: pageConfig.voltageClasses,
  },
  {
    title: 'Типы КП',
    url: pageConfig.typesKp,
  },
  {
    title: 'Контроллеры',
    url: pageConfig.headControllers,
  },
  {
    title: 'Каналы',
    url: '#',
    submenu: [
      {
        title: 'Категории каналов',
        url: pageConfig.channelCategories,
      },
      {
        title: 'Типы каналов',
        url: pageConfig.channelTypes,
      },
      {
        title: 'Каналообразующее оборудование',
        url: pageConfig.channelingEquipments,
      },
      {
        title: 'GSM операторы',
        url: pageConfig.gsmOperators,
      },
      {
        title: 'Каналы',
        url: pageConfig.channels,
      },
    ]
  },
  {
    title: 'Категории работ',
    url: pageConfig.typesWork,
  },
]
