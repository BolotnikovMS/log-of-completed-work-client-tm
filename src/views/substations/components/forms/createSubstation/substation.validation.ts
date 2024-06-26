import * as yup from 'yup'

import { ipOptional, numberCheck, numberOptional, text240 } from '../../../../../validations/rules'

export const validationSchema = yup.object().shape({
	districtId: numberCheck,
	typeKpId: numberCheck,
	headControllerId: numberCheck,
	mainChannelId: numberCheck,
	backupChannelId: numberOptional,
	additionalChannelId: numberOptional,
	gsmId: numberOptional,
	name: text240,
	voltageClassesId: numberCheck,
	mainChannelIp: ipOptional,
	backupChannelIp: ipOptional,
	rdu: yup
		.boolean()
		.default(false),
	active: yup
		.boolean()
		.default(true)
})