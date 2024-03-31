import { AxiosError, isAxiosError } from 'axios'

export const errorHandler = (errors: Error | AxiosError<unknown>) => {
	let errorMessage: string = ''

	if (isAxiosError(errors)) {
		if (Array.isArray(errors.response?.data?.errors)) {
			errors.response.data.errors.map((errData: { message: string, field: string })  => errorMessage += `${errData.message} `)
		} else if (errors.response?.data.message) {
			errorMessage = errors.response?.data.message
		} else {
			errorMessage = errors.message
		}
	}

	return errorMessage
}