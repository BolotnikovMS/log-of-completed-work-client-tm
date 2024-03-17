export interface ISignInFields {
	username: string
	password: string
}

export interface IUserLogin {
	id: number
	username: string
	email: string
	role: {
		name: string
	}
	fullName: string
	shortName: string
	type: string
	token: string
}