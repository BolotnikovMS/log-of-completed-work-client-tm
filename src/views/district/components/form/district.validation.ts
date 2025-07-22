import * as yup from 'yup'
import { text50 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	name: text50,
	shortName: text50,
})