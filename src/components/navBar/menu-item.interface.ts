export interface IMenuItem {
  title: string
  url: string
}

export interface ISubmenu {
  submenus?: IMenuItem[]
}

export interface IPropsMenuItems extends IMenuItem, ISubmenu {}