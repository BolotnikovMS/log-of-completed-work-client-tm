import { IMeta, IUser } from '../../interfaces'

export type TUserData = Omit<IUser, 'id'>

export type TRespUsers = { meta: IMeta, data: IUser[] }