import * as yup from 'yup'
import { ipOptional, numberCheck, numberOptional, text1000Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	substationId: numberCheck,
	channelCategoryId: numberCheck,
	channelTypeId: numberCheck,
	channelEquipmentId: numberOptional,
	gsmId: numberOptional,
	ipAddress: ipOptional,
	note: text1000Optional,
})
