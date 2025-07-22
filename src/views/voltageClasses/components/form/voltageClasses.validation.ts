import * as yup from 'yup'
import { text30 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	name: text30
})