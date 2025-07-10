import * as yup from 'yup'
import { numberOptional } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
	keyDefectSubstation: numberOptional
})
