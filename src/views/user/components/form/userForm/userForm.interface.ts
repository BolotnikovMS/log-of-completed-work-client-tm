import { IUser } from '../../../../../interfaces'

export interface IUserFields {
  roleId: number
  username: string
  name: string
  surname: string
  patronymic: string
  position: string
  email: string
  password: string
}

export interface IPropsUserForm {
  user?: IUser | null
  isEdited?: boolean | null
  toggleModal: () => void
  setIsEdited?: (val: boolean) => void
}
