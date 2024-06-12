import { ERoles } from '../enums/roles.enum'
import { IUser } from '../interfaces'

/**
 * Description
 * @param {IUser|null} user - Авторизованный пользователь.
 * @param {ERoles[]} allowedRoles - Массив ролей которым доступны действия.
 * @param {boolean} isAuthor - Флаг, который указывает на то, что автор записи может выполнять действие над записью.
 * @param {unknown} record - Текущая запись.
 * @returns {boolean}  Возвращает true или false
 */

export const checkRole = <T extends { userId: number}>(user: IUser | null, allowedRoles: ERoles[], isAuthor: boolean = false, record?: T): boolean => {
	if (!user) return false

	if (isAuthor && record && user.id === record.userId) return true

	if (allowedRoles.length === 0) return true
	
	return allowedRoles.some(role => role.includes(user.role.name))
}