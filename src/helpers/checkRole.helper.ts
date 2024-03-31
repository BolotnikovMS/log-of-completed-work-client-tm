import { IUser } from '../interfaces'

export enum ERoles {
	Admin = 'Admin',
	Moderator = 'Moderator',
	User = 'User'
}

export const checkRole = (user: IUser | null, allowedRole: ERoles[]): boolean => {
	if (!user) return false

	return !!allowedRole.find(role => role.includes(user.role.name))
}