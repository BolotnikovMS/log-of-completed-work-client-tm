export const url = import.meta.env.VITE_API_URL
export const urlFile = import.meta.env.VITE_FILE_URL
export const menuItemData = [
  {
    title: 'Районы, ГП, УС',
    url: '/districts',
  },
  {
    title: 'ПС',
    url: '/substations',
  },
  {
    title: 'Классы U',
    url: '/voltage-classes',
  },
  {
    title: 'Типы КП',
    url: '/types-kp',
  },
  {
    title: 'Контроллеры',
    url: '/head-controllers',
  },
  {
    title: 'Каналы',
    url: '#',
    submenu: [
      {
        title: 'Категории каналов',
        url: '/channel-categories',
      },
      {
        title: 'Типы каналов',
        url: '/channel-types',
      },
      {
        title: 'Каналообразующее оборудование',
        url: '/channeling-equipments',
      },
      {
        title: 'GSM операторы',
        url: '/gsm-operators',
      },
      {
        title: 'Каналы',
        url: '/channels',
      },
    ]
  }
]
