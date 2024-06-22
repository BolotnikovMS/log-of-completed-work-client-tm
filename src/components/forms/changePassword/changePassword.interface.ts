import { IUser } from "../../../interfaces"

export interface IChangePasswordFields {
  password: string
  passwordConfirm: string
}

export interface IPropsChangePasswordForm {
  user?: IUser
  isResetPassword?: boolean
  toggleModal: () => void
}
