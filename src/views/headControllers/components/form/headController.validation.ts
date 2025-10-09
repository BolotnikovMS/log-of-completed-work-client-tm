import * as yup from 'yup'
import { text150Optional, text30 } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
	name: text30,
	actualFirmwareVersion: text150Optional
})
