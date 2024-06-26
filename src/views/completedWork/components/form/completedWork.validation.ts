import * as yup from 'yup'

import { date, numberCheck, text1000, text700Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	substationId: numberCheck,
	workProducerId: numberCheck,
	description: text1000,
	note: text700Optional,
	dateCompletion: date
})
