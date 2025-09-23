import * as yup from 'yup'
import { text50 } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
	clientName: text50
})
