import { IRole } from './role.interface'

export interface IUser {
  id: number
  active: boolean
  username: string
  surname: string
  name: string
  patronymic: string
  position: string
  email: string
  fullName: string
  shortName: string
  roleId: number
  role?: Pick<IRole, 'name'>
}

export interface IUserDataLogin {
  username: string
  password: string
}
