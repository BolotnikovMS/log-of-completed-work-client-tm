import * as yup from 'yup'
import { numberCheck, text1000Optional, text150Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	substationId: numberCheck,
	typeKpId: numberCheck,
	headControllerId: numberCheck,
	controllerFirmwareVersion: text150Optional,
	note: text1000Optional,
})
