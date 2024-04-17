import { IUser } from '../../../../interfaces'

export interface IUserFields {
	active: boolean
	roleId: number
	username: string
	name: string
	surname: string
	patronymic:string
	position: string
	email: string
}

export interface IPropsUserForm {
	user?: IUser | null
	isEdited?: boolean | null
	toggleModal: () => void
	setIsEdited?: (val: boolean) => void
}