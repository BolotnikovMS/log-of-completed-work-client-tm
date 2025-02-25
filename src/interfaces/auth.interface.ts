import { IUser } from './user.interface'

export interface ISignInFields {
	username: string
	password: string
}

export interface IUserLogin {
	user: IUser
	token: {
		token: string
		type: string
		expiresIn: Date
	}
}

export interface IGenericResponseLogout {
	message: string
}
