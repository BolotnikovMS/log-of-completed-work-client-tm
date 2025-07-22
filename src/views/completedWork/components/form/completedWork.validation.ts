import * as yup from 'yup'
import { date, numberCheck, text1000, text1000Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	substationId: numberCheck,
	typeWorkId: numberCheck,
	workProducerId: numberCheck,
	description: text1000,
	note: text1000Optional,
	dateCompletion: date,
	inControl: yup
		.boolean()
		.default(false),
})
