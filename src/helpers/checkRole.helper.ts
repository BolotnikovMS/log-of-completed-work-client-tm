import { IUser } from '../interfaces'

export enum ERoles {
	Admin = 'Admin',
	Moderator = 'Moderator',
	User = 'User'
}

/**
 * Description
 * @param {IUser|null} Авторизованный пользователь.
 * @param {ERoles[]} Массив ролей которым доступны действия.
 * @param {boolean=false} Флаг, который указывает на то, что автор записи может выполнять действие над записью.
 * @param {unknown} Текущая запись.
 * @returns {any} Возвращает true или false
 */

export const checkRole = (user: IUser | null, allowedRole: ERoles[], author: boolean = false, record?: unknown): boolean => {
	if (!user) return false

	if (author && record && user.id === record.userId) {
		return true
	} else {
		return !!allowedRole.find(role => role.includes(user.role.name))
	}

	// return !!allowedRole.find(role => role.includes(user.role.name))
}