import * as yup from 'yup'
import { numberCheck, text50 } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
	districtId: numberCheck,
	typeKpId: numberCheck,
	headControllerId: numberCheck,
	name: text50,
	voltageClassesId: numberCheck,
	objectTypeId: numberCheck,
	rdu: yup
		.boolean()
		.default(false),
	active: yup
		.boolean()
		.default(true)
})
