import axios from 'axios'
import { url } from '../constants'

export const instance = axios.create({
	baseURL: url,
	headers: {
		Authorization: 'Bearer oat_Nw.TS1wNlpmSUp0M25OMDQ1RUpfcW1mendsdDdjM1ZpVHhMQkJzQXVZVTMxNTExMjAzNjQ'
	}
})