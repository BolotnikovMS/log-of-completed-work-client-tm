export const url = 'http://127.0.0.1:3333/api/v1.0'
export const menuItemData = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Справочники',
    url: '/reference-books',
    submenu: [
      {
        title: 'Районы и ГП',
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
      
    ]
  },
  {
    title: 'Пользователи',
    url: '/users',
  },
  {
    title: 'Вход',
    url: '/login',
  },
  {
    title: 'Выход',
    url: '/logout',
  },
]