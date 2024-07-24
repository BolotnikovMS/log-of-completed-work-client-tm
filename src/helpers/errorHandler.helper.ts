import { AxiosError, isAxiosError } from 'axios'

export const errorHandler = (errors: Error | AxiosError<unknown>): string => {
  let errorMessage: string = ''

  if (isAxiosError(errors)) {
    if (errors.response && Array.isArray(errors.response?.data?.errors)) {
      errorMessage = errors.response.data.errors.map(({ message }: { message: string }) => message).join('; ')
    } else if (errors.response?.status === 422 && Array.isArray(errors.response.data)) {
      errorMessage = errors.response.data.map(({ message }: { message: string }) => message).join('; ')
    } else if (errors.response?.data.message) {
      errorMessage = errors.response?.data.message as string
    } else {
      errorMessage = errors.message
    }
  } else {
    errorMessage = errors.message
  }

  return errorMessage
}
