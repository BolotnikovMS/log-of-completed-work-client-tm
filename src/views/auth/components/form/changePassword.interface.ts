export interface IChangePasswordFields {
	password: string
	passwordConfirm: string
}

export interface IPropsChangePasswordForm {
	toggleModal: () => void
}