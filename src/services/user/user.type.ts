import { IMeta, IUser } from '../../interfaces'

export type TUserData = Omit<IUser, 'id' | 'fullName' | 'shortName' | 'role'>

export type TRespUsers = { meta: IMeta, data: IUser[] }