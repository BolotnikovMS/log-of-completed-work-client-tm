import axios from 'axios'
import { url } from '../constants'
import { getTokenFromLocalStorage } from '../helpers/localstorege.helper'

export const instance = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${getTokenFromLocalStorage()}`
	}
})