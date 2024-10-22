import { IMeta, IUser } from '../interfaces'

export type TUserData = Omit<IUser, 'id' | 'active' | 'fullName' | 'shortName' | 'role'> & { password: string }

export type TRespUsers = { meta: IMeta, data: IUser[] }

export type TChangeUserRole = Pick<IUser, 'roleId'>

export type TChangeStatusAccount = Pick<IUser, 'id' | 'active'>
