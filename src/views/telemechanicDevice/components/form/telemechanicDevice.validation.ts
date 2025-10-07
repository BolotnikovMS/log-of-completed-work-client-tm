import * as yup from 'yup'
import { numberCheck, text1000Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	substationId: numberCheck,
	typeKpId: numberCheck,
	headControllerId: numberCheck,
	note: text1000Optional,
})
