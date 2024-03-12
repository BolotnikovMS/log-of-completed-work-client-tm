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
	shortUserName: string
	role: {
		name: string
	}
}

export interface IUserDataLogin {
	username: string
	password: string
}