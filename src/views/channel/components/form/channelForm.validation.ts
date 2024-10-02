import * as yup from 'yup'
import { ipOptional, numberCheck, text700Optional } from '../../../../validations/rules'

export const validationSchema = yup.object().shape({
  substationId: numberCheck,
  channelCategoryId: numberCheck,
  channelTypeId: numberCheck,
  ipAddress: ipOptional,
  note: text700Optional,
})
