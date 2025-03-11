import { IMeta, IUser } from '../interfaces'

export type TUserData = Omit<IUser, 'id' | 'active' | 'fullName' | 'shortName' | 'role'> & { password: string }

export type TRespUsers<T> = { meta: IMeta, data: T }

export type TChangeUserRole = Pick<IUser, 'roleId'>

export type TChangeStatusAccount = Pick<IUser, 'id' | 'active'>

export type TUserBase = Pick<IUser, 'id' | 'active' | 'username' | 'role' | 'email' | 'shortName' | 'fullName'>

export type TUserShort = Pick<IUser, 'id' | 'fullName'>
