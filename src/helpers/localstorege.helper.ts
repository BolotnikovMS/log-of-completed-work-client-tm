import { TTheme } from '../types'

interface IToken {
	type: string
	token: string
	expiresIn: string
}

export const getTokenFromLocalStorage = (): IToken | null => {
	const data: string | null = localStorage.getItem('user_token')
	const token: IToken | null = data ? JSON.parse(data) : null

	return token
}

export const setTokenToLocalStorage = (key: string, token: { token: string, type: string, expiresIn: Date }): void => {
	localStorage.setItem(key, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = (key: string): void => {
	localStorage.removeItem(key)
}

export const getCurrentTheme = (key: string): TTheme  => {
	const currentTheme = localStorage.getItem(key) || 'light'

	return currentTheme as TTheme
}

export const setCurrentTheme = (key: string, value: TTheme): void => {
	localStorage.setItem(key, value)
}
