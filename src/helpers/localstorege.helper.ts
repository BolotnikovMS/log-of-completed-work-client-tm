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

// export const setTokenToLocalStorage = (key: string, token: string): void => {
// 	localStorage.setItem(key, JSON.stringify(token))
// }

export const setTokenToLocalStorage = (key: string, token: { token: string, type: string, expiresIn: Date }): void => {
	localStorage.setItem(key, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = (key: string): void => {
	localStorage.removeItem(key)
}