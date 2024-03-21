import axios from 'axios'
import { url } from '../constants'
import { getTokenFromLocalStorage } from '../helpers/localstorege.helper'

export const instance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`

	return config
})