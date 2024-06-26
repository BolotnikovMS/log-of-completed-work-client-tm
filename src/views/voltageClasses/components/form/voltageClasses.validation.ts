import * as yup from "yup"

import { text140 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	name: text140
})