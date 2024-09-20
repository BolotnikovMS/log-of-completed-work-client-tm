import { IUser } from "../../../../../interfaces"

export interface IPropsChangeUserRole {
  user?: IUser
  toggleModal: () => void
}

export interface IChangeUserRoleFields {
  roleId: number
}
