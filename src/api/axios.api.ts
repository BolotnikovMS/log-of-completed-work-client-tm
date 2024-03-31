import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from '../helpers/localstorege.helper'

import axios from 'axios'
import { url } from '../constants'

export const instance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()?.token}`

	return config
})

instance.interceptors.response.use((config) => config, async (error) => {
	if (error.response.status === 401) {
		removeTokenFromLocalStorage('user_token')

		window.location.href = `${window.location.origin}/login`
	}

	throw error
})